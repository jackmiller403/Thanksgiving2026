# The Thanksgiving Chronicle — 2026 Kitchen Execution Plan

A classic newspaper-inspired, iPhone-first (and iPad-responsive) web app for executing Thanksgiving 2026 dinner at **4:00 PM sharp**.

## Menu & Calibrated Portions
- **Sous Vide Turkey Breast With Crispy Skin** *(Serious Eats / J. Kenji López-Alt)* — calibrated for a **3-lb half turkey breast**, with 145°F / 150°F doneness toggle, bone-in Instant Pot gravy vs. boneless quick gravy toggle, and Wednesday crispy-skin prep.
- **Challah Stuffing With Leeks & Celery** *(Smitten Kitchen / Deb Perelman)* — zero-waste **1-lb store-bought challah loaf (2/3 batch)** default with full 1.5-lb toggle and Wednesday Stage-1 foil-on make-ahead method.
- **Air-Fryer Brussels Sprouts With Garlic, Balsamic & Soy** *(NYT Cooking / Melissa Clark)* — tailored for **1 lb trimmed sprouts** in a **small circular air fryer** using a two-batch + joint garlic finish.
- **Mixed-Apple Oat & Pecan Crumble** *(NYT Cooking / Samantha Seneviratne)* — calibrated to **6 apples** (2 Granny Smith, 2 Golden Delicious, 2 Pink Lady) with dialed-back apple sugar to pair cleanly with **homemade caramel & vanilla ice cream**.
- **Supporting Cast**: Meat/cheese/crackers board (2:00 PM), self-serve Cranberry-Ginger Lime mocktail bar, chilled whole-berry cranberry sauce, and residual-oven warm dinner rolls.

## Features
- **Wednesday + Thursday Run of Show**: Persistent `localStorage` checklists, progress bar, and one-tap **Next Step** jump.
- **Solo Chef / + Partner Mode**: Highlights delegatable tasks with a `PARTNER` stamp and filters by role.
- **Wall-Clock Kitchen Timers**: Concurrent multi-timer ticker with audio chime that never drifts if your phone sleeps.
- **Keep Awake Toggle**: Uses the Screen Wake Lock API so your iPhone/iPad stays lit while cooking.
- **Appliance Matrix & Pantry Audit**: Conflict-free schedule across all 7 appliances and checkable mise en place list.

## GitHub Pages Deployment
Serve directly from the `main` branch root (`/`):
1. Push this repository to GitHub (`jackmiller403/Thanksgiving2026`).
2. In **Settings → Pages**, set **Source** to **Deploy from a branch**, select `main` and `/ (root)`, and save.
3. Open `https://jackmiller403.github.io/Thanksgiving2026/` on your iPhone or iPad (tap **Share → Add to Home Screen** for a full-screen kitchen app experience).
