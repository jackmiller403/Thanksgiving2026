/* ==========================================================================
   THE THANKSGIVING CHRONICLE — Clean Interactive Execution Engine
   Persistent checklists · Optional squash soup · Wall-clock timers · Wake Lock
   ========================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'thanksgiving_chronicle_2026_v2';
  const DATA = window.THANKSGIVING_DATA;

  const DEFAULT_STATE = {
    view: 'timeline',
    dayFilter: 'all',
    roleFilter: 'all',
    hideDone: false,
    cfg: {
      crewMode: 'solo',
      includeSoup: true,
      turkeyTemp: '145',
      turkeyBone: 'bone-in',
      stuffingScale: 'two-thirds',
      crumbleScale: 'three-quarters'
    },
    doneSteps: {},
    checkedIngredients: {},
    checkedPantry: {}
  };

  let state = loadState();
  let timers = [];
  let timerInterval = null;
  let wakeLock = null;
  let wakeWanted = false;
  let audioCtx = null;
  let toastTimeout = null;

  /* ==================== PERSISTENCE ==================== */
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredClone(DEFAULT_STATE);
      const parsed = JSON.parse(raw);
      return {
        ...structuredClone(DEFAULT_STATE),
        ...parsed,
        cfg: {
          ...DEFAULT_STATE.cfg,
          ...(parsed.cfg || {})
        },
        doneSteps: parsed.doneSteps || {},
        checkedIngredients: parsed.checkedIngredients || {},
        checkedPantry: parsed.checkedPantry || {}
      };
    } catch {
      return structuredClone(DEFAULT_STATE);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch { /* ignore */ }
  }

  /* ==================== HELPERS ==================== */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function showToast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => el.classList.remove('show'), 2100);
  }

  function formatDuration(sec) {
    const clamped = Math.max(0, Math.ceil(sec));
    const hrs = Math.floor(clamped / 3600);
    const mins = Math.floor((clamped % 3600) / 60);
    const remSec = clamped % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return hrs > 0 ? `${hrs}:${pad(mins)}:${pad(remSec)}` : `${pad(mins)}:${pad(remSec)}`;
  }

  function playChime() {
    try {
      const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextCtor) return;
      if (!audioCtx) audioCtx = new AudioContextCtor();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const now = audioCtx.currentTime;
      [587.33, 880.0, 1174.66].forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.14);
        gain.gain.setValueAtTime(0.001, now + idx * 0.14);
        gain.gain.exponentialRampToValueAtTime(0.16, now + idx * 0.14 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.14 + 0.65);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.14);
        osc.stop(now + idx * 0.14 + 0.7);
      });
    } catch { /* ignore */ }
  }

  /* ==================== WAKE LOCK ==================== */
  async function toggleWakeLock() {
    if (!('wakeLock' in navigator)) {
      showToast('Keep Awake unsupported here');
      return;
    }

    if (wakeWanted) {
      wakeWanted = false;
      if (wakeLock) {
        try { await wakeLock.release(); } catch { /* ignore */ }
        wakeLock = null;
      }
      updateWakeUI(false);
      showToast('Screen sleep restored');
      return;
    }

    try {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeWanted = true;
      updateWakeUI(true);
      showToast('Keep Awake On');
      wakeLock.addEventListener('release', () => {
        if (!wakeWanted) updateWakeUI(false);
      });
    } catch {
      updateWakeUI(false);
      showToast('Could not enable Keep Awake');
    }
  }

  function updateWakeUI(active) {
    const label = active ? 'Keep Awake: On' : 'Keep Awake: Off';
    ['btn-wake-mobile', 'btn-wake-desktop'].forEach((id) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.textContent = label;
      btn.setAttribute('aria-pressed', String(active));
      btn.classList.toggle('active', active);
    });
  }

  document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible' && wakeWanted && 'wakeLock' in navigator) {
      try {
        wakeLock = await navigator.wakeLock.request('screen');
        updateWakeUI(true);
      } catch { /* ignore */ }
    }
  });

  /* ==================== MULTI-TIMER ENGINE ==================== */
  function startTimer(label, minutes) {
    try {
      const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
      if (AudioContextCtor) {
        if (!audioCtx) audioCtx = new AudioContextCtor();
        if (audioCtx.state === 'suspended') audioCtx.resume();
      }
    } catch { /* ignore */ }

    const durationSec = Math.round(minutes * 60);
    const id = 't-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
    timers.push({
      id,
      label,
      remainingSec: durationSec,
      endTime: Date.now() + durationSec * 1000,
      paused: false,
      ringing: false
    });

    if (!timerInterval) timerInterval = setInterval(tickTimers, 500);
    renderTimers();
    showToast(`Timer: ${label} (${minutes}m)`);
  }

  function tickTimers() {
    if (timers.length === 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      return;
    }

    const now = Date.now();
    let changed = false;

    timers.forEach((t) => {
      if (t.paused || t.ringing) return;
      const secLeft = (t.endTime - now) / 1000;
      if (secLeft <= 0) {
        t.remainingSec = 0;
        t.ringing = true;
        changed = true;
        playChime();
        showToast(`Done: ${t.label}`);
      } else {
        const rounded = Math.ceil(secLeft);
        if (rounded !== t.remainingSec) {
          t.remainingSec = rounded;
          changed = true;
        }
      }
    });

    if (changed) renderTimers();
  }

  function togglePauseTimer(id) {
    const t = timers.find((x) => x.id === id);
    if (!t || t.ringing) return;
    if (t.paused) {
      t.paused = false;
      t.endTime = Date.now() + t.remainingSec * 1000;
    } else {
      t.paused = true;
      t.remainingSec = Math.max(0, Math.ceil((t.endTime - Date.now()) / 1000));
    }
    renderTimers();
  }

  function dismissTimer(id) {
    timers = timers.filter((x) => x.id !== id);
    renderTimers();
  }

  function renderTimers() {
    const wire = document.getElementById('timer-wire');
    const inner = document.getElementById('timer-wire-inner');
    if (!wire || !inner) return;

    if (timers.length === 0) {
      wire.classList.remove('visible');
      document.body.classList.remove('has-timers');
      inner.innerHTML = '';
      return;
    }

    wire.classList.add('visible');
    document.body.classList.add('has-timers');
    inner.innerHTML = timers.map((t) => `
      <div class="timer-pill ${t.ringing ? 'ringing' : ''}">
        <span class="timer-pill-name" title="${escapeHtml(t.label)}">${escapeHtml(t.label)}</span>
        <span class="timer-pill-clock">${t.ringing ? 'DONE' : formatDuration(t.remainingSec)}</span>
        ${!t.ringing ? `
          <button class="timer-ctrl-btn" type="button" data-timer-pause="${t.id}" aria-label="${t.paused ? 'Resume' : 'Pause'}">${t.paused ? '▶' : '❚❚'}</button>
        ` : ''}
        <button class="timer-ctrl-btn" type="button" data-timer-dismiss="${t.id}" aria-label="Dismiss">✕</button>
      </div>
    `).join('');
  }

  /* ==================== PROGRESS & CONTROLS SYNC ==================== */
  function updateProgress() {
    const allSteps = DATA.getTimeline(state.cfg);
    const total = allSteps.length;
    const completed = allSteps.filter((s) => state.doneSteps[s.id]).length;
    const pct = total ? Math.round((completed / total) * 100) : 0;
    const nextStep = allSteps.find((s) => !state.doneSteps[s.id]);

    const navDesk = document.getElementById('nav-progress-desktop');
    if (navDesk) navDesk.textContent = `${completed}/${total} done`;

    const mobileNext = document.getElementById('mobile-next-label');
    if (mobileNext) {
      mobileNext.textContent = nextStep
        ? `${completed}/${total} · Next: ${nextStep.day === 'wed' ? 'Wed' : 'Thu'} ${nextStep.time} ↓`
        : `${completed}/${total} · Dinner Ready`;
    }

    const deskPct = document.getElementById('desk-progress-pct');
    if (deskPct) deskPct.textContent = `${pct}%`;

    const deskNext = document.getElementById('desk-next-step');
    if (deskNext) {
      deskNext.textContent = nextStep
        ? `Next: ${nextStep.day === 'wed' ? 'Wed' : 'Thu'} ${nextStep.time} ↓`
        : 'All steps complete';
    }

    ['mobile-progress-fill', 'desk-progress-fill'].forEach((id) => {
      const fill = document.getElementById(id);
      if (fill) {
        fill.style.width = `${pct}%`;
        fill.classList.toggle('complete', pct === 100);
      }
    });

    const refTurkey = document.getElementById('ref-turkey-temp');
    if (refTurkey) refTurkey.textContent = `${state.cfg.turkeyTemp}°F`;
  }

  function syncControlButtons() {
    document.querySelectorAll('[data-crew]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.crew === state.cfg.crewMode));
    });

    document.querySelectorAll('[data-soup]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String((btn.dataset.soup === 'true') === Boolean(state.cfg.includeSoup)));
    });

    const partnerFilterWrap = document.getElementById('partner-role-filter-wrap');
    if (partnerFilterWrap) {
      partnerFilterWrap.hidden = state.cfg.crewMode !== 'partner';
    }

    document.querySelectorAll('[data-day]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.day === state.dayFilter));
    });

    document.querySelectorAll('[data-role]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.role === state.roleFilter));
    });

    const hideBtn = document.getElementById('btn-toggle-hide-done');
    if (hideBtn) {
      hideBtn.setAttribute('aria-pressed', String(state.hideDone));
      hideBtn.classList.toggle('active', state.hideDone);
    }

    document.querySelectorAll('[data-cfg-key]').forEach((btn) => {
      const key = btn.dataset.cfgKey;
      const val = btn.dataset.cfgVal;
      btn.setAttribute('aria-pressed', String(state.cfg[key] === val));
    });

    const optSummary = document.getElementById('mobile-options-summary');
    const drawer = document.getElementById('mobile-options-drawer');
    if (optSummary && drawer) {
      const open = !drawer.hidden;
      const parts = [
        state.cfg.crewMode === 'partner' ? '+Partner' : 'Solo',
        state.cfg.includeSoup ? 'Soup' : 'No Soup'
      ];
      optSummary.textContent = `${parts.join(' · ')} ${open ? '▴' : '▾'}`;
    }
  }

  /* ==================== RENDER TIMELINE ==================== */
  function renderTimeline() {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    const allSteps = DATA.getTimeline(state.cfg);
    const isPartnerMode = state.cfg.crewMode === 'partner';

    const filtered = allSteps.filter((step) => {
      if (state.dayFilter !== 'all' && step.day !== state.dayFilter) return false;
      if (isPartnerMode && state.roleFilter !== 'all' && step.role !== state.roleFilter) return false;
      if (state.hideDone && state.doneSteps[step.id]) return false;
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          No steps match the current filter. Clear “Hide done” or select “All” to view every step.
        </div>
      `;
      updateProgress();
      return;
    }

    const days = [
      { key: 'wed', title: 'Wednesday Evening · Nov. 25', sub: '75-Min Head Start' },
      { key: 'thu', title: 'Thursday · Thanksgiving Day', sub: 'Dinner at 4:00 P.M.' }
    ];

    let html = '';

    days.forEach((dayInfo) => {
      const daySteps = filtered.filter((s) => s.day === dayInfo.key);
      if (daySteps.length === 0) return;

      html += `
        <div class="day-banner" id="day-${dayInfo.key}">
          <h2 class="day-banner-title">${dayInfo.title}</h2>
          <span class="day-banner-sub">${dayInfo.sub}</span>
        </div>
      `;

      let currentAct = '';
      daySteps.forEach((step) => {
        if (dayInfo.key === 'thu' && step.act !== currentAct) {
          currentAct = step.act;
          html += `<div class="act-divider">${escapeHtml(currentAct)}</div>`;
        }

        const isDone = Boolean(state.doneSteps[step.id]);
        const highlightPartner = isPartnerMode && step.role === 'partner';

        const metaParts = [];
        metaParts.push(`<span class="step-meta-time-mobile">${escapeHtml(step.time)} · </span>`);
        metaParts.push(escapeHtml(step.appliance));
        if (step.optional) metaParts.push(' · <span class="meta-optional">Optional Soup</span>');
        if (isPartnerMode) {
          metaParts.push(step.role === 'partner'
            ? ' · <span class="meta-partner">Partner</span>'
            : ' · Lead');
        }

        html += `
          <article class="step-item ${isDone ? 'is-done' : ''} ${highlightPartner ? 'is-partner-highlight' : ''}" id="step-${step.id}">
            <button
              class="step-check-btn"
              type="button"
              role="checkbox"
              aria-checked="${isDone}"
              aria-label="Mark ${escapeHtml(step.title)} as ${isDone ? 'not done' : 'done'}"
              data-toggle-step="${step.id}"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="square" stroke-linejoin="miter" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </button>

            <div class="step-time-col">
              <span class="step-time-desktop">${escapeHtml(step.time)}</span>
              <span class="step-duration">${escapeHtml(step.duration)}</span>
            </div>

            <div class="step-body">
              <div class="step-meta-line">${metaParts.join('')}</div>
              <h3 class="step-title">${escapeHtml(step.title)}</h3>
              <p class="step-desc">${escapeHtml(step.summary)}</p>
              ${step.tip ? `<p class="step-note">Note: ${escapeHtml(step.tip)}</p>` : ''}

              ${(step.timer || step.dishId) ? `
                <div class="step-actions">
                  ${step.timer ? `
                    <button
                      class="inline-action timer-action"
                      type="button"
                      data-start-timer="${step.timer.minutes}"
                      data-timer-label="${escapeHtml(step.timer.label)}"
                    >⏱ ${step.timer.minutes >= 60 ? `${(step.timer.minutes / 60).toFixed(1).replace('.0', '')}h` : `${step.timer.minutes}m`} timer</button>
                  ` : ''}
                  ${step.dishId ? `
                    <button class="inline-action" type="button" data-open-recipe="${step.dishId}">Recipe →</button>
                  ` : ''}
                </div>
              ` : ''}
            </div>
          </article>
        `;
      });
    });

    container.innerHTML = html;
    updateProgress();
  }

  /* ==================== RENDER RECIPES ==================== */
  function renderRecipes() {
    const container = document.getElementById('recipes-container');
    if (!container) return;

    const recipes = DATA.getRecipes(state.cfg);
    const supporting = DATA.getSupportingCast(state.cfg);

    let html = recipes.map((r) => `
      <article class="recipe-article" id="recipe-${r.id}">
        <header class="recipe-header">
          <div class="recipe-kicker-row">
            <span class="recipe-kicker">${escapeHtml(r.kicker)}</span>
            <a href="${escapeHtml(r.sourceUrl)}" target="_blank" rel="noopener noreferrer">Source: ${escapeHtml(r.sourceName)} ↗</a>
          </div>
          <h2 class="recipe-title">${escapeHtml(r.title)}</h2>
          <p class="recipe-byline">${escapeHtml(r.byline)}</p>
          <div class="recipe-specs">
            ${r.specs.map((s) => `<span><strong>${escapeHtml(s.label)}:</strong> ${escapeHtml(s.value)}</span>`).join('')}
          </div>
        </header>

        ${r.controls.length ? `
          <div class="recipe-controls">
            ${r.controls.map((ctrl) => `
              <div class="recipe-control-item">
                <span class="option-label">${escapeHtml(ctrl.label)}:</span>
                <div class="choice-group" role="group" aria-label="${escapeHtml(ctrl.label)}">
                  ${ctrl.options.map((opt) => `
                    <button
                      class="choice-btn"
                      type="button"
                      data-cfg-key="${ctrl.key}"
                      data-cfg-val="${opt.value}"
                      aria-pressed="${state.cfg[ctrl.key] === opt.value}"
                    >${escapeHtml(opt.label)}</button>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <div class="mod-note">
          <h3 class="mod-note-title">Modifications for Your Portions &amp; Appliances</h3>
          <ul class="mod-list">
            ${r.modifications.map((m) => `<li>${m}</li>`).join('')}
          </ul>
        </div>

        <div class="recipe-body-grid">
          <div class="recipe-ingredients-col">
            <h3 class="recipe-subhead">Ingredients</h3>
            ${r.ingredientGroups.map((grp, gIdx) => `
              <div class="ingredient-group-title">${escapeHtml(grp.title)}</div>
              <ul class="ingredient-list">
                ${grp.items.map((item, iIdx) => {
                  const ingKey = `${r.id}-${gIdx}-${iIdx}`;
                  const checked = Boolean(state.checkedIngredients[ingKey]);
                  return `
                    <li class="ingredient-item ${checked ? 'checked' : ''}" data-toggle-ing="${ingKey}" role="checkbox" aria-checked="${checked}" tabindex="0">
                      <span class="ing-box" aria-hidden="true">✓</span>
                      <span>${escapeHtml(item)}</span>
                    </li>
                  `;
                }).join('')}
              </ul>
            `).join('')}
          </div>

          <div class="recipe-method-col">
            <h3 class="recipe-subhead">Method</h3>
            <ol class="method-list">
              ${r.steps.map((st) => `
                <li class="method-step">
                  <span class="method-step-title">${escapeHtml(st.title)}</span>
                  <p>${escapeHtml(st.text)}</p>
                  ${st.timer ? `
                    <div class="step-actions">
                      <button
                        class="inline-action timer-action"
                        type="button"
                        data-start-timer="${st.timer.minutes}"
                        data-timer-label="${escapeHtml(st.timer.label)}"
                      >⏱ ${st.timer.minutes >= 60 ? `${(st.timer.minutes / 60).toFixed(1).replace('.0', '')}h` : `${st.timer.minutes}m`} timer</button>
                    </div>
                  ` : ''}
                </li>
              `).join('')}
            </ol>
          </div>
        </div>
      </article>
    `).join('');

    html += `
      <article class="recipe-article" id="recipe-supporting">
        <header class="recipe-header">
          <div class="recipe-kicker-row">
            <span class="recipe-kicker">Supporting Cast &amp; Optional Soup</span>
          </div>
          <h2 class="recipe-title">Squash Soup, Mocktail, Snacks &amp; Sides</h2>
          <p class="recipe-byline">Low-effort accompaniments timed around your main courses</p>
        </header>

        <div class="recipe-controls">
          <div class="recipe-control-item">
            <span class="option-label">Freezer Squash Soup:</span>
            <div class="choice-group" role="group" aria-label="Include Frozen Squash Soup">
              <button class="choice-btn" type="button" data-soup="true" aria-pressed="${Boolean(state.cfg.includeSoup)}">Included (3:45 Starter)</button>
              <button class="choice-btn" type="button" data-soup="false" aria-pressed="${!state.cfg.includeSoup}">Skip</button>
            </div>
          </div>
        </div>

        <div class="supporting-grid">
          ${supporting.map((item) => `
            <div class="supporting-card">
              <div class="supporting-timing">${escapeHtml(item.timing)}</div>
              <h4>${escapeHtml(item.title)}</h4>
              <p>${item.copy}</p>
            </div>
          `).join('')}
        </div>

        <div class="print-only-temps">
          <h3>Quick Reference Temperatures</h3>
          <ul class="print-temps-grid">
            <li><span>Sous Vide Turkey</span><strong>${escapeHtml(state.cfg.turkeyTemp)}°F (2.5–4 hrs)</strong></li>
            <li><span>Crispy Turkey Skin (Wed)</span><strong>400°F (25–35 min)</strong></li>
            <li><span>Apple Crumble (Thu 1:30)</span><strong>350°F (50–55 min)</strong></li>
            <li><span>Stuffing Stage 1 (Wed)</span><strong>350°F covered (20 min)</strong></li>
            <li><span>Stuffing Final Crisp (Thu 3:30)</span><strong>425°F uncovered (20 min)</strong></li>
            <li><span>Brussels Air Fryer (Thu 3:15)</span><strong>400°F (13m × 2 + 3m garlic)</strong></li>
            <li><span>Skin Re-Crisp (Toaster Oven)</span><strong>350°F (2–3 min)</strong></li>
            <li><span>Dinner Rolls (Main Oven OFF)</span><strong>Residual heat (4–5 min)</strong></li>
          </ul>
        </div>
      </article>
    `;

    container.innerHTML = html;
  }

  /* ==================== RENDER APPLIANCES ==================== */
  function renderAppliances() {
    const container = document.getElementById('appliances-container');
    if (!container) return;

    const appliances = DATA.getAppliances(state.cfg);

    container.innerHTML = appliances.map((ap) => `
      <article class="appliance-card ${ap.standby ? 'standby' : ''}">
        <div class="appliance-card-header">
          <h3 class="appliance-name">${escapeHtml(ap.name)}</h3>
          <span class="appliance-status">${escapeHtml(ap.status)}</span>
        </div>
        <ul class="appliance-slots">
          ${ap.slots.map((sl) => `
            <li class="appliance-slot">
              <span class="slot-time">${escapeHtml(sl.time)}</span>
              <span class="slot-task">
                <strong>${escapeHtml(sl.title)}</strong>
                ${escapeHtml(sl.detail)}
              </span>
            </li>
          `).join('')}
        </ul>
        <p class="appliance-note">${escapeHtml(ap.note)}</p>
      </article>
    `).join('');
  }

  /* ==================== RENDER NOTES & PANTRY ==================== */
  function renderNotesAndPantry() {
    const notesEl = document.getElementById('notes-container');
    if (notesEl) {
      notesEl.innerHTML = DATA.editorialNotes.map((n) => `
        <article class="dispatch-card">
          <p class="dispatch-kicker">${escapeHtml(n.kicker)}</p>
          <h3>${escapeHtml(n.title)}</h3>
          <p>${escapeHtml(n.body)}</p>
        </article>
      `).join('');
    }

    const pantryEl = document.getElementById('pantry-container');
    if (!pantryEl) return;

    const pantryGroups = DATA.getPantryChecklist(state.cfg);
    let totalItems = 0;
    let checkedItems = 0;

    pantryEl.innerHTML = pantryGroups.map((grp, gIdx) => `
      <div class="pantry-group">
        <h4>${escapeHtml(grp.group)}</h4>
        <ul class="ingredient-list">
          ${grp.items.map((item, iIdx) => {
            totalItems++;
            const key = `pantry-${gIdx}-${iIdx}`;
            const checked = Boolean(state.checkedPantry[key]);
            if (checked) checkedItems++;
            return `
              <li class="ingredient-item ${checked ? 'checked' : ''}" data-toggle-pantry="${key}" role="checkbox" aria-checked="${checked}" tabindex="0">
                <span class="ing-box" aria-hidden="true">✓</span>
                <span>${escapeHtml(item)}</span>
              </li>
            `;
          }).join('')}
        </ul>
      </div>
    `).join('');

    const label = document.getElementById('pantry-progress-label');
    if (label) label.textContent = `${checkedItems} of ${totalItems} On Hand`;
  }

  /* ==================== VIEW SWITCHING ==================== */
  function switchView(viewName, scrollTop = true) {
    state.view = viewName;
    saveState();

    document.querySelectorAll('.nav-tab').forEach((tab) => {
      tab.setAttribute('aria-selected', String(tab.dataset.view === viewName));
    });

    document.querySelectorAll('.view-panel').forEach((panel) => {
      panel.classList.toggle('active', panel.id === `panel-${viewName}`);
    });

    if (scrollTop) {
      const nav = document.querySelector('.section-nav-wrap');
      const top = nav ? Math.min(window.scrollY, nav.offsetTop) : 0;
      if (window.scrollY > top) {
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }

  function jumpToNextStep() {
    if (state.view !== 'timeline') switchView('timeline', false);

    const allSteps = DATA.getTimeline(state.cfg);
    const next = allSteps.find((s) => !state.doneSteps[s.id]);
    if (!next) {
      showToast('All steps complete');
      return;
    }

    if (state.dayFilter !== 'all' && state.dayFilter !== next.day) state.dayFilter = 'all';
    if (state.cfg.crewMode === 'partner' && state.roleFilter !== 'all' && state.roleFilter !== next.role) {
      state.roleFilter = 'all';
    }
    syncControlButtons();
    renderTimeline();

    const el = document.getElementById(`step-${next.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.style.outline = '1.5px solid var(--accent)';
      el.style.outlineOffset = '6px';
      setTimeout(() => {
        el.style.outline = '';
        el.style.outlineOffset = '';
      }, 1400);
    }
  }

  /* ==================== EVENTS ==================== */
  function bindEvents() {
    document.querySelectorAll('.nav-tab').forEach((tab) => {
      tab.addEventListener('click', () => switchView(tab.dataset.view));
    });

    document.getElementById('btn-wake-mobile')?.addEventListener('click', toggleWakeLock);
    document.getElementById('btn-wake-desktop')?.addEventListener('click', toggleWakeLock);

    document.getElementById('btn-jump-next-mobile')?.addEventListener('click', jumpToNextStep);
    document.getElementById('btn-jump-next-desk')?.addEventListener('click', jumpToNextStep);

    // Collapsible mobile options drawer
    document.getElementById('btn-mobile-options')?.addEventListener('click', () => {
      const drawer = document.getElementById('mobile-options-drawer');
      const btn = document.getElementById('btn-mobile-options');
      if (!drawer || !btn) return;
      drawer.hidden = !drawer.hidden;
      btn.setAttribute('aria-expanded', String(!drawer.hidden));
      syncControlButtons();
    });

    document.getElementById('btn-toggle-hide-done')?.addEventListener('click', () => {
      state.hideDone = !state.hideDone;
      saveState();
      syncControlButtons();
      renderTimeline();
    });

    document.getElementById('btn-print')?.addEventListener('click', () => window.print());
    document.getElementById('btn-reset-progress')?.addEventListener('click', () => {
      if (!confirm('Reset all timeline, ingredient, and pantry checkmarks?')) return;
      state.doneSteps = {};
      state.checkedIngredients = {};
      state.checkedPantry = {};
      saveState();
      renderAll();
      showToast('Checklists reset');
    });

    document.addEventListener('click', (e) => {
      const target = e.target.closest('button, [data-toggle-ing], [data-toggle-pantry]');
      if (!target) return;

      if (target.dataset.crew) {
        state.cfg.crewMode = target.dataset.crew;
        if (state.cfg.crewMode === 'solo') state.roleFilter = 'all';
        saveState();
        syncControlButtons();
        renderTimeline();
        showToast(state.cfg.crewMode === 'partner' ? 'Partner mode on' : 'Solo chef mode');
        return;
      }

      if (target.dataset.soup) {
        const val = target.dataset.soup === 'true';
        if (state.cfg.includeSoup !== val) {
          state.cfg.includeSoup = val;
          saveState();
          renderAll();
          showToast(val ? 'Squash soup added to plan' : 'Squash soup removed');
        }
        return;
      }

      if (target.dataset.day) {
        state.dayFilter = target.dataset.day;
        saveState();
        syncControlButtons();
        renderTimeline();
        return;
      }

      if (target.dataset.role) {
        state.roleFilter = target.dataset.role;
        saveState();
        syncControlButtons();
        renderTimeline();
        return;
      }

      if (target.dataset.cfgKey) {
        const key = target.dataset.cfgKey;
        const val = target.dataset.cfgVal;
        if (state.cfg[key] !== val) {
          state.cfg[key] = val;
          saveState();
          renderAll();
          showToast('Updated plan & recipes');
        }
        return;
      }

      if (target.dataset.toggleStep) {
        const id = target.dataset.toggleStep;
        state.doneSteps[id] = !state.doneSteps[id];
        saveState();
        renderTimeline();
        return;
      }

      if (target.dataset.startTimer) {
        startTimer(target.dataset.timerLabel || 'Timer', parseFloat(target.dataset.startTimer));
        return;
      }

      if (target.dataset.timerPause) {
        togglePauseTimer(target.dataset.timerPause);
        return;
      }
      if (target.dataset.timerDismiss) {
        dismissTimer(target.dataset.timerDismiss);
        return;
      }

      if (target.dataset.openRecipe) {
        const dishId = target.dataset.openRecipe;
        switchView('recipes', false);
        requestAnimationFrame(() => {
          const el = document.getElementById(`recipe-${dishId}`);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          document.querySelectorAll('.recipe-jump-btn').forEach((b) => {
            b.classList.toggle('active', b.dataset.jump === `recipe-${dishId}`);
          });
        });
        return;
      }

      if (target.dataset.jump) {
        const jumpId = target.dataset.jump;
        document.querySelectorAll('.recipe-jump-btn').forEach((b) => {
          b.classList.toggle('active', b.dataset.jump === jumpId);
        });
        const el = document.getElementById(jumpId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      if (target.dataset.toggleIng) {
        const key = target.dataset.toggleIng;
        state.checkedIngredients[key] = !state.checkedIngredients[key];
        saveState();
        target.classList.toggle('checked', state.checkedIngredients[key]);
        target.setAttribute('aria-checked', String(Boolean(state.checkedIngredients[key])));
        return;
      }

      if (target.dataset.togglePantry) {
        const key = target.dataset.togglePantry;
        state.checkedPantry[key] = !state.checkedPantry[key];
        saveState();
        renderNotesAndPantry();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const item = e.target.closest('[data-toggle-ing], [data-toggle-pantry]');
      if (!item) return;
      e.preventDefault();
      item.click();
    });
  }

  function renderAll() {
    syncControlButtons();
    renderTimeline();
    renderRecipes();
    renderAppliances();
    renderNotesAndPantry();
    switchView(state.view, false);
  }

  document.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    renderAll();
  });
})();
