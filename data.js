/* ==========================================================================
   THE THANKSGIVING CHRONICLE — Structured Culinary Execution Data
   Verified recipes, portion modifications, optional squash soup & choreography
   ========================================================================== */

window.THANKSGIVING_DATA = {
  meta: {
    targetMealTime: '4:00 PM',
    wednesdayDate: 'Wednesday, Nov. 25, 2026',
    thursdayDate: 'Thursday, Nov. 26, 2026',
    servingsNote: 'Calibrated for a 3-lb half turkey breast (4–6 generous servings)'
  },

  getTimeline(cfg) {
    const isBoneIn = cfg.turkeyBone === 'bone-in';
    const includeSoup = Boolean(cfg.includeSoup);
    const temp = cfg.turkeyTemp; // '145' or '150'
    const tempLabel = temp === '145'
      ? '145°F (Kenji’s ultra-juicy tender finish)'
      : '150°F (classic white-meat texture, still deeply juicy)';

    const stuffingPan = cfg.stuffingScale === 'two-thirds'
      ? '8×8-inch or 2-quart baking dish (1-lb challah loaf)'
      : '9×13-inch baking dish (1.5-lb challah)';
    const stuffingDrizzleButter = cfg.stuffingScale === 'two-thirds' ? '4 tbsp' : '6 tbsp';

    const crumblePan = cfg.crumbleScale === 'three-quarters'
      ? '9×9-inch baking dish or 10-inch skillet (your 6 apples)'
      : '9×13-inch baking dish (8 apples)';
    const crumbleAppleSugar = cfg.crumbleScale === 'three-quarters'
      ? '¼ cup dark brown sugar (dialed back for homemade caramel)'
      : '½ cup dark brown sugar';

    const steps = [
      /* =================== WEDNESDAY EVENING PREP =================== */
      {
        id: 'wed-1',
        day: 'wed',
        act: 'Wednesday Evening · The 75-Minute Head Start',
        time: '5:30 PM',
        duration: '15 min',
        title: includeSoup
          ? 'Thaw Frozen Squash Soup & Cube/Dry the Challah'
          : 'Cube & Dry the Challah Bread',
        appliance: 'Fridge · Main Oven 300°F (opt.)',
        role: 'partner',
        dishId: 'stuffing',
        summary: `${includeSoup ? 'Move the frozen squash soup from the freezer to the refrigerator so it thaws gently overnight. ' : ''}Cut ${cfg.stuffingScale === 'two-thirds' ? '1 lb (one whole store-bought loaf)' : '1.5 lbs'} challah into generous 1-inch cubes. If not already air-dried overnight, spread on a sheet pan and dry at 300°F for 15 minutes until firm (not browned).`,
        tip: 'If you cubed the challah Tuesday night and left it uncovered on the counter, skip the oven dry entirely.',
        timer: { label: 'Dry Challah Cubes', minutes: 15 }
      },
      {
        id: 'wed-2',
        day: 'wed',
        act: 'Wednesday Evening · The 75-Minute Head Start',
        time: '5:45 PM',
        duration: '15 min',
        title: 'Butcher, Dry-Brine & Bag the 3-lb Half Turkey Breast',
        appliance: 'Prep · Fridge',
        role: 'lead',
        dishId: 'turkey',
        summary: isBoneIn
          ? 'Peel the skin off in one intact sheet and set aside on parchment. Free the single breast lobe from the breastbone (save the bone for stock). Season meat generously all over with kosher salt and black pepper. Fold the thin tail slightly under itself and tie loosely with 2–3 pieces of twine for even thickness. Slide into a heavy-duty gallon zip-top bag (optionally tuck 1 sprig rosemary/thyme inside) and refrigerate overnight.'
          : 'Peel the skin off in one intact sheet (if skin-on) and set aside on parchment. Season the boneless half breast generously with kosher salt and black pepper. Fold the tapered tail slightly under itself and tie lightly with 2–3 pieces of twine. Place in a heavy-duty gallon zip-top bag with an optional sprig of rosemary or thyme, and refrigerate overnight.',
        tip: 'Bagged seasoned turkey dry-brines cleanly overnight in the fridge for deeper seasoning right to the center.'
      },
      {
        id: 'wed-3',
        day: 'wed',
        act: 'Wednesday Evening · The 75-Minute Head Start',
        time: '6:00 PM',
        duration: '30 min',
        title: 'Roast the Crispy Turkey Skin Flat',
        appliance: 'Main Oven 400°F',
        role: 'lead',
        dishId: 'turkey',
        summary: 'Preheat oven to 400°F. Lay turkey skin flat on a parchment-lined rimmed sheet pan, season generously with salt and pepper, cover with a second parchment sheet, squeeze out air bubbles, and weight down with a second rimmed sheet pan. Roast 25–35 minutes until deep golden brown and shattering crisp.',
        tip: 'Half-breast skin is smaller—start checking at 25 minutes. Cool and store in an OPEN container at room temp overnight; save any rendered pan fat for the stuffing.',
        timer: { label: 'Roast Turkey Skin', minutes: 30 }
      },
      {
        id: 'wed-4',
        day: 'wed',
        act: 'Wednesday Evening · The 75-Minute Head Start',
        time: '6:05 PM',
        duration: isBoneIn ? '40 min' : '5 min',
        title: isBoneIn
          ? 'Make Fortified Turkey Stock (Instant Pot Shortcut)'
          : 'Skip Bone Stock (Boneless Mode — Quick Gravy Thursday)',
        appliance: isBoneIn ? 'Instant Pot (or Stovetop)' : 'Pantry Check',
        role: 'lead',
        dishId: 'turkey',
        summary: isBoneIn
          ? 'Halved gravy batch: Chop the half breastbone into 2–3 chunks. On Instant Pot Sauté (or a medium saucepan), brown bone in 2 tsp oil with ½ chopped onion, ½ carrot, and 1 rib celery for 6–8 minutes. Add 3 cups low-sodium chicken stock, 1 bay leaf, and ½ tsp soy sauce. Pressure cook HIGH for 25 minutes + 10 min natural release (or simmer 50 min stovetop). Strain and refrigerate overnight.'
          : 'Without a breastbone, skip stock-simmering tonight. Verify you have 2 cups low-sodium chicken stock, soy sauce, butter, flour, and a thyme sprig for a 10-minute Thursday gravy enriched with strained sous vide bag juices.',
        tip: isBoneIn
          ? 'Instant Pot stock keeps your stovetop free and produces gelatin-rich stock for a 10-minute Thursday roux.'
          : 'Strained sous vide bag juices + ½ tsp soy sauce + chicken stock build rich gravy fast.',
        timer: isBoneIn ? { label: 'Instant Pot Stock', minutes: 25 } : null
      },
      {
        id: 'wed-5',
        day: 'wed',
        act: 'Wednesday Evening · The 75-Minute Head Start',
        time: '6:15 PM',
        duration: '20 min',
        title: 'Mix Crumble Topping, Halve Brussels & Chill Drinks',
        appliance: 'Microwave · Fridge',
        role: 'partner',
        dishId: 'crumble',
        summary: 'Melt crumble butter in microwave and stir into flour, brown sugar, oats, pecans, and salt; refrigerate covered (chilled streusel clumps better). Halve your 1 lb trimmed Brussels sprouts (quarter large ones) and bag with a dry paper towel; thinly slice 2 garlic cloves and wrap tightly. Chill ginger beer, cranberry juice, and canned cranberry sauce.',
        tip: 'Wait until Thursday at 1:00 PM to peel and slice the apples so they stay crisp.'
      },
      {
        id: 'wed-6',
        day: 'wed',
        act: 'Wednesday Evening · The 75-Minute Head Start',
        time: '6:35 PM',
        duration: '35 min',
        title: 'Assemble & Stage-1 Bake the Challah Stuffing',
        appliance: 'Stovetop · Main Oven 350°F',
        role: 'lead',
        dishId: 'stuffing',
        summary: `Drop oven to 350°F. Generously butter your ${stuffingPan}. Sauté diced celery and leeks (or yellow onion) in butter with half the salt and pepper until tender (~10 min), then stir in minced sage, rosemary, and thyme for 1 minute. Toss gently with dried challah cubes and parsley. Pour seasoned broth gradually until moistened (hold back a splash if store-bought challah feels very wet). Cover tightly with foil, bake 20 minutes, cool 20 min, and refrigerate covered.`,
        tip: 'Stopping after the covered bake keeps Thursday’s stovetop clean with zero loss in crispness.',
        timer: { label: 'Stuffing Stage-1 Bake', minutes: 20 }
      },

      /* =================== THURSDAY — ACT I =================== */
      {
        id: 'thu-1',
        day: 'thu',
        act: 'Act I · Afternoon Launch (12:30 – 2:00 PM)',
        time: '12:30 PM',
        duration: '15 min setup',
        title: `Preheat Sous Vide to ${temp}°F & Drop Turkey`,
        appliance: `Sous Vide ${temp}°F`,
        role: 'lead',
        dishId: 'turkey',
        critical: true,
        summary: `Preheat sous vide water bath to ${tempLabel}. Lower the bagged dry-brined turkey breast slowly to push out air, seal above the waterline, and clip to the side by 12:45 PM.`,
        tip: 'Ready anytime from 3:15 PM to 4:45 PM with zero overcooking.',
        timer: { label: `Sous Vide Turkey (${temp}°F)`, minutes: 150 }
      },
      {
        id: 'thu-2',
        day: 'thu',
        act: 'Act I · Afternoon Launch (12:30 – 2:00 PM)',
        time: '1:00 PM',
        duration: '25 min',
        title: 'Temper Cheese Board & Prep the 6 Apples for Crumble',
        appliance: 'Prep · Preheat Oven 350°F',
        role: 'partner',
        dishId: 'crumble',
        summary: `Preheat main oven to 350°F. Pull cheeses out of the fridge to come to room temperature. Butter a ${crumblePan}. Peel, core, and cut your 2 Granny Smith, 2 Golden Delicious, and 2 Pink Lady apples into ½-inch wedges. Toss in the dish with ${crumbleAppleSugar}, cinnamon, and lemon juice. Scatter chilled crumble clumps evenly on top.`,
        tip: 'Trimmed apple sugar keeps the Granny Smith tartness bright under your homemade caramel and vanilla ice cream.'
      },
      {
        id: 'thu-3',
        day: 'thu',
        act: 'Act I · Afternoon Launch (12:30 – 2:00 PM)',
        time: '1:30 PM',
        duration: '50–55 min',
        title: 'Bake the Apple Crumble Early',
        appliance: 'Main Oven 350°F',
        role: 'lead',
        dishId: 'crumble',
        summary: 'Bake on center rack at 350°F for 50–55 minutes until juices bubble at the edges, apples are knife-tender, and the oat-pecan topping is deep golden brown.',
        tip: 'Early baking leaves the oven free for the 3:30 PM push and gives the apple juices time to thicken.',
        timer: { label: 'Apple Crumble Bake', minutes: 50 }
      },
      {
        id: 'thu-4',
        day: 'thu',
        act: 'Act I · Afternoon Launch (12:30 – 2:00 PM)',
        time: '1:40 PM',
        duration: '15 min',
        title: 'Arrange Snack Board & Self-Serve Mocktail Bar',
        appliance: 'Counter / Bar',
        role: 'partner',
        dishId: 'supporting',
        summary: 'Arrange meat, room-temp cheese, and crackers on a board. Slice fresh limes into wedges (save 2–3 wedges for Brussels sprouts). Set up a self-serve mocktail station: ice bucket, chilled ginger beer, cranberry juice, limes, glasses, and optional rosemary sprigs.',
        tip: 'Mocktail ratio: 3 oz cranberry juice + 4 oz ginger beer + squeeze of fresh lime over ice.'
      },

      /* =================== THURSDAY — ACT II =================== */
      {
        id: 'thu-5',
        day: 'thu',
        act: 'Act II · Snacks, Breather & The Pull (2:00 – 3:00 PM)',
        time: '2:00 PM',
        duration: '1 hr',
        title: 'Serve Snacks & Mocktails — Step Out of the Kitchen',
        appliance: 'Living Room',
        role: 'partner',
        dishId: 'supporting',
        summary: 'Put out the snack board and pour first mocktails. Turkey is cruising hands-free in the sous vide and the crumble is baking—enjoy a breather.',
        tip: 'Glance at the sous vide water level to be sure it remains above the minimum line.'
      },
      {
        id: 'thu-6',
        day: 'thu',
        act: 'Act II · Snacks, Breather & The Pull (2:00 – 3:00 PM)',
        time: '2:25 PM',
        duration: '5 min',
        title: 'Pull Apple Crumble & Cool Uncovered',
        appliance: 'Main Oven → OFF',
        role: 'lead',
        dishId: 'crumble',
        summary: 'Transfer golden Apple Crumble to a cooling rack uncovered (keeps the oat topping crisp). Turn oven off until 3:00 PM.',
        tip: 'If the topping browns early around 40 min, tent loosely with foil for the last 10 minutes.'
      }
    ];

    if (includeSoup) {
      steps.push({
        id: 'thu-soup-warm',
        day: 'thu',
        act: 'Act II · Snacks, Breather & The Pull (2:00 – 3:00 PM)',
        time: '2:30 PM',
        duration: '5 min setup',
        title: 'Warm Frozen Squash Soup in the Slow Cooker',
        appliance: 'Slow Cooker (LOW → WARM)',
        role: 'partner',
        dishId: 'supporting',
        optional: true,
        summary: 'Pour the thawed squash soup into your Slow Cooker on LOW (add a splash of water or broth if thick). It reaches piping hot in ~60–75 minutes and holds cleanly on WARM with zero stirring or stove clutter. (Still half-frozen? It still works—just stir once at 3:15 PM.)',
        tip: 'Prefer not to wash the slow cooker crock? Skip this step and warm gently on Stovetop Burner 3 (Low) at 3:25 PM instead.'
      });
    }

    steps.push(
      /* =================== THURSDAY — ACT III =================== */
      {
        id: 'thu-7',
        day: 'thu',
        act: 'Act III · The Final Hour (3:00 – 3:45 PM)',
        time: '3:00 PM',
        duration: '15 min',
        title: 'Final-Hour Mise en Place & Preheat Oven to 425°F',
        appliance: 'Main Oven 425°F · Microwave',
        role: 'partner',
        dishId: 'stuffing',
        summary: `Pull Stage-1 Challah Stuffing from the fridge and uncover its foil. Preheat Main Oven to 425°F. Melt ${stuffingDrizzleButter} unsalted butter in the microwave (35 sec) for stuffing. Spoon chilled cranberry sauce into a serving bowl, soften butter for rolls, and set the table${includeSoup ? ' (including small starter cups or mugs for squash soup)' : ''}.`,
        tip: 'Set out a cutting board, sharp carving knife, paper towels, and turkey platter now.'
      },
      {
        id: 'thu-8',
        day: 'thu',
        act: 'Act III · The Final Hour (3:00 – 3:45 PM)',
        time: '3:15 PM',
        duration: '15 min',
        title: 'Simmer Gravy & Air-Fry Brussels Sprouts — Batch 1',
        appliance: 'Stovetop Burner 1 · Small Air Fryer 400°F',
        role: 'lead',
        dishId: 'brussels',
        summary: 'Stovetop: Melt 2 tbsp butter over medium heat, whisk in 2½ tbsp flour for 3 min until golden, then slowly whisk in 2–2½ cups fortified stock (or chicken stock + ½ tsp soy sauce + thyme). Simmer 8–10 min until velvety; hold on lowest flame. Small Air Fryer (400°F): Toss 1 lb halved sprouts with 1 tbsp olive oil + ½ tsp salt. Air-fry HALF (Batch 1) for 13 minutes, shaking at 6 min.',
        tip: 'Splitting 1 lb into two uncrowded batches stops steaming in a small circular basket; both reunite with garlic at 3:48 PM.',
        timer: { label: 'Brussels Batch 1', minutes: 13 }
      },
      {
        id: 'thu-9',
        day: 'thu',
        act: 'Act III · The Final Hour (3:00 – 3:45 PM)',
        time: '3:30 PM',
        duration: '20 min',
        title: 'Blast Challah Stuffing Uncovered at 425°F',
        appliance: 'Main Oven 425°F',
        role: 'lead',
        dishId: 'stuffing',
        critical: true,
        summary: `Drizzle ${stuffingDrizzleButter} melted butter (plus any saved turkey skin fat) evenly over the stuffing. Bake uncovered at 425°F for 20 minutes until piping hot with deeply browned, crispy corners.`,
        tip: 'Because it came from the fridge, allow 20 minutes instead of 15 (check at 17 min if your oven runs hot).',
        timer: { label: 'Stuffing Crisp (425°F)', minutes: 20 }
      },
      {
        id: 'thu-10',
        day: 'thu',
        act: 'Act III · The Final Hour (3:00 – 3:45 PM)',
        time: '3:32 PM',
        duration: '13 min',
        title: 'Air-Fry Brussels Batch 2 & Reduce Balsamic Glaze',
        appliance: 'Small Air Fryer 400°F · Stovetop Burner 2',
        role: 'lead',
        dishId: 'brussels',
        summary: 'Move Batch 1 sprouts to a bowl; air-fry Batch 2 at 400°F for 13 minutes (shake halfway). Meanwhile on Burner 2, simmer ¼ cup balsamic vinegar 2–3 minutes until syrupy—watch closely so it doesn’t scorch! Pull off heat and whisk in 2 tbsp olive oil, 1 tsp fresh lime juice, and ½ tsp soy sauce.',
        tip: 'Tilt the small saucepan so the ¼ cup vinegar pools and pull it the second it coats a spoon.',
        timer: { label: 'Brussels Batch 2', minutes: 13 }
      }
    );

    if (includeSoup) {
      steps.push({
        id: 'thu-soup-serve',
        day: 'thu',
        act: 'Act IV · The Grand Finale & Dessert (3:45 – 5:00 PM)',
        time: '3:45 PM',
        duration: '3 min',
        title: 'Serve Small Starter Cups of Squash Soup (Seated First Course)',
        appliance: 'Slow Cooker (WARM) → Table',
        role: 'partner',
        dishId: 'supporting',
        optional: true,
        summary: 'Give the hot squash soup a stir, adjust salt, and ladle small ½-cup starter portions into mugs or small bowls (optional swirl of olive oil, black pepper, or parsley). Seat guests at 3:45–3:50 PM—keeping everyone happily occupied while you finish the final 10-minute carve and glaze!',
        tip: 'Keep portions small (~½ cup) since guests had meat & cheese at 2:00 PM. Cooking solo? Simply ladle soup at 4:00 PM alongside the main plate.'
      });
    }

    steps.push(
      /* =================== THURSDAY — ACT IV =================== */
      {
        id: 'thu-11',
        day: 'thu',
        act: 'Act IV · The Grand Finale & Dessert (3:45 – 5:00 PM)',
        time: '3:48 PM',
        duration: '3–4 min',
        title: 'Reunite Brussels Sprouts & Flash-Crisp with Sliced Garlic',
        appliance: 'Small Air Fryer 400°F',
        role: 'partner',
        dishId: 'brussels',
        summary: 'Return Batch 1 into the air-fryer basket with Batch 2. Scatter thinly sliced garlic over top and air-fry 3–4 minutes until garlic is crisp golden brown and all sprouts are sizzling hot.',
        tip: 'Check garlic right at 3 minutes—golden is sweet and nutty; dark brown turns bitter.',
        timer: { label: 'Brussels + Garlic Finish', minutes: 3 }
      },
      {
        id: 'thu-12',
        day: 'thu',
        act: 'Act IV · The Grand Finale & Dessert (3:45 – 5:00 PM)',
        time: '3:50 PM',
        duration: '4 min',
        title: 'Pull Stuffing · Warm Rolls in Residual Oven · Re-Crisp Skin',
        appliance: 'Main Oven (OFF) · Toaster Oven 350°F',
        role: 'partner',
        dishId: 'supporting',
        critical: true,
        summary: 'Pull golden Challah Stuffing and turn Main Oven OFF. Slide Dinner Rolls (loosely tented in foil) into the hot residual oven for 4–5 minutes to warm gently. Simultaneously slide the roasted Turkey Skin into the Toaster Oven at 350°F for 2–3 minutes to revive its shattering crunch.',
        tip: 'Zero appliance conflict: residual main oven warms the rolls while the toaster oven revives the turkey skin.',
        timer: { label: 'Warm Rolls & Crisp Skin', minutes: 4 }
      },
      {
        id: 'thu-13',
        day: 'thu',
        act: 'Act IV · The Grand Finale & Dessert (3:45 – 5:00 PM)',
        time: '3:51 PM',
        duration: '7 min',
        title: 'Unbag, Pat Dry & Carve the Sous Vide Turkey Breast',
        appliance: 'Sous Vide → Cutting Board',
        role: 'lead',
        dishId: 'turkey',
        critical: true,
        summary: 'Lift turkey from bath and open bag (optional: strain 2–3 tbsp bag juices into the gravy). Snip twine, pat dry with paper towels, and carve smooth ½-inch medallions. Fan onto a warmed platter and crown with shattered pieces of hot crispy turkey skin.',
        tip: 'Run hot tap water over your serving platter for 20 seconds and wipe dry before plating.'
      },
      {
        id: 'thu-14',
        day: 'thu',
        act: 'Act IV · The Grand Finale & Dessert (3:45 – 5:00 PM)',
        time: '3:57 PM',
        duration: '3 min',
        title: 'Glaze Sprouts, Ladle Gravy & Serve Dinner at 4:00 PM',
        appliance: 'Dining Table',
        role: 'lead',
        dishId: 'brussels',
        summary: 'Transfer sizzling Brussels sprouts and crispy garlic to a platter, drizzle with balsamic-soy-lime glaze, and squeeze fresh lime over top. Pour hot gravy into a gravy boat, move warm rolls to a napkin-lined basket, refresh mocktails, and serve at 4:00 PM sharp.',
        tip: 'Dress sprouts at the last second so charred outer leaves stay crisp.'
      },
      {
        id: 'thu-15',
        day: 'thu',
        act: 'Act IV · The Grand Finale & Dessert (3:45 – 5:00 PM)',
        time: '4:45 PM',
        duration: '10 min',
        title: 'Dessert: Warm Crumble, Homemade Caramel & Vanilla Ice Cream',
        appliance: 'Main Oven 300°F · Microwave',
        role: 'partner',
        dishId: 'crumble',
        summary: 'Warm Apple Crumble at 300°F for 10 minutes (or microwave individual bowls 25 sec). Warm homemade caramel sauce in the microwave for 20–30 seconds until pourable. Scoop warm crumble, top with cold vanilla ice cream, and ribbon with warm caramel.',
        tip: 'A tiny pinch of flaky sea salt over the caramel and vanilla ice cream ties the bowl together.',
        timer: { label: 'Rewarm Apple Crumble', minutes: 10 }
      }
    );

    return steps;
  },

  getRecipes(cfg) {
    const isBoneIn = cfg.turkeyBone === 'bone-in';
    const temp = cfg.turkeyTemp;
    const isScaledStuffing = cfg.stuffingScale === 'two-thirds';
    const isScaledCrumble = cfg.crumbleScale === 'three-quarters';

    return [
      {
        id: 'turkey',
        kicker: 'Main Course · Serious Eats',
        title: 'Sous Vide Turkey Breast With Crispy Skin',
        byline: 'Adapted from J. Kenji López-Alt · Calibrated for a 3-lb Half Turkey Breast',
        sourceUrl: 'https://www.seriouseats.com/sous-vide-turkey-breast-crispy-skin-recipe-thanksgiving',
        sourceName: 'Serious Eats',
        specs: [
          { label: 'Yield', value: '4–6 servings (3-lb half breast)' },
          { label: 'Bath', value: `${temp}°F · 2.5–4 hrs` },
          { label: 'Skin', value: '400°F · 25–35 min' }
        ],
        controls: [
          {
            key: 'turkeyTemp',
            label: 'Doneness',
            options: [
              { value: '145', label: '145°F Juicy' },
              { value: '150', label: '150°F Classic' }
            ]
          },
          {
            key: 'turkeyBone',
            label: 'Cut & Gravy',
            options: [
              { value: 'bone-in', label: 'Bone-In (Stock)' },
              { value: 'boneless', label: 'Boneless (Quick)' }
            ]
          }
        ],
        modifications: [
          '<strong>3-lb Half Breast (vs. 5-lb Whole):</strong> Instead of tying two breast halves jigsaw-style, peel skin in one piece, debone, fold the tapered tail slightly under itself, and tie loosely with 2–3 strings for even slicing.',
          '<strong>Faster Skin + Wednesday Make-Ahead:</strong> Half-breast skin browns faster—check at <strong>25 minutes</strong> at 400°F. Roast Wednesday evening, store in an open container at room temp, and re-crisp 3 minutes in the <strong>toaster oven</strong> Thursday at 3:50 PM.',
          '<strong>Halved Gravy + Instant Pot Shortcut:</strong> Scaled to ~2 cups. Pressure-cook the breastbone stock in your <strong>Instant Pot Wednesday night</strong> (25 min High) instead of a 1-hour stovetop simmer.'
        ],
        ingredientGroups: [
          {
            title: 'Turkey & Crispy Skin',
            items: [
              '1 half turkey breast (about 3 lbs, skin-on)',
              'Kosher salt and freshly ground black pepper, generously',
              'Optional: 1 sprig fresh rosemary or thyme for the sous vide bag'
            ]
          },
          {
            title: isBoneIn ? 'Fortified Gravy (Halved · ~2 Cups)' : '10-Minute Pantry Gravy (~1.5 Cups)',
            items: isBoneIn
              ? [
                  'Reserved turkey breastbone, chopped into 2–3 chunks',
                  '2 tsp vegetable oil',
                  '½ large yellow onion, roughly chopped',
                  '½ large carrot, peeled and roughly chopped',
                  '1 rib celery, roughly chopped',
                  '3 cups low-sodium chicken stock',
                  '1 bay leaf & ½ tsp soy sauce',
                  '2 tbsp unsalted butter & 2½ tbsp all-purpose flour'
                ]
              : [
                  '2 cups low-sodium chicken stock',
                  '2–3 tbsp strained sous vide turkey bag juices (optional)',
                  '½ tsp soy sauce + 1 small sprig thyme',
                  '2 tbsp unsalted butter & 2½ tbsp all-purpose flour',
                  'Kosher salt and black pepper to taste'
                ]
          }
        ],
        steps: [
          {
            title: 'Wednesday · Skin, Debone & Dry-Brine',
            text: isBoneIn
              ? 'Peel skin off in one intact sheet; set aside. Cut breast meat cleanly off the breastbone (save bone for stock). Season generously all over with kosher salt and black pepper. Fold thin tail slightly under and tie loosely with 2–3 pieces of twine. Bag in a gallon freezer zip-top bag (with optional herb sprig) and refrigerate overnight.'
              : 'If skin-on, peel skin off in one intact sheet; set aside. Season boneless half breast generously with kosher salt and pepper. Fold thin tail slightly under and tie loosely with 2–3 strings. Place in a gallon freezer zip-top bag (with optional herb sprig) and refrigerate overnight.'
          },
          {
            title: 'Wednesday · Roast Crispy Skin (400°F)',
            text: 'Heat oven to 400°F. Spread turkey skin flat on a parchment-lined rimmed baking sheet, season with salt and pepper, cover with a second sheet of parchment, squeeze out air bubbles, and weight down with a second rimmed baking sheet. Roast 25–35 minutes until deep golden brown and very crisp. Cool and store in an OPEN container at room temp overnight.',
            timer: { label: 'Roast Turkey Skin', minutes: 30 }
          },
          {
            title: isBoneIn ? 'Wednesday · Fortified Stock (Instant Pot or Stovetop)' : 'Thursday 3:15 PM · Quick 10-Minute Gravy',
            text: isBoneIn
              ? 'Brown chopped breastbone, onion, carrot, and celery in 2 tsp oil on Instant Pot Sauté (or medium saucepan) 6–8 minutes. Add 3 cups chicken stock, bay leaf, and ½ tsp soy sauce. Instant Pot: High Pressure 25 min + 10 min natural release (Stovetop: simmer 50 min). Strain (~2¼ cups stock) and refrigerate overnight.'
              : 'Melt 2 tbsp butter over medium heat, whisk in 2½ tbsp flour 3 min until golden blond, then slowly whisk in 2 cups chicken stock, ½ tsp soy sauce, and thyme sprig. Simmer 8–10 minutes until thick; stir in 2–3 tbsp strained bag juices once turkey is unbagged.',
            timer: isBoneIn ? { label: 'Instant Pot Stock', minutes: 25 } : null
          },
          {
            title: `Thursday 12:30 PM · Sous Vide Bath (${temp}°F)`,
            text: `Preheat water bath to ${temp}°F (${temp === '145' ? 'ultra-moist, tender, faint pink hue' : 'pure white, tender, still vastly juicier than roasted'}). Lower bagged turkey to push out air, seal above waterline, and cook at least 2.5 hours (holds safely up to 4 hours).`,
            timer: { label: `Sous Vide Turkey (${temp}°F)`, minutes: 150 }
          },
          ...(isBoneIn ? [{
            title: 'Thursday 3:15 PM · Finish Roux & Gravy',
            text: 'Melt 2 tbsp butter in a medium saucepan over medium heat, add 2½ tbsp flour, and stir constantly 3 minutes until golden. Slowly whisk in fortified stock, bring to a boil, and simmer 8–10 minutes until thick enough to coat a spoon. Season to taste and keep warm.'
          }] : []),
          {
            title: 'Thursday 3:50 PM · Re-Crisp Skin, Carve & Serve',
            text: 'Re-crisp turkey skin in the Toaster Oven at 350°F for 2–3 minutes. Remove turkey from bag (optionally strain 2 tbsp juices into gravy), snip twine, pat dry, slice into smooth ½-inch medallions, fan onto a warmed platter, and top with shattered crispy skin.',
            timer: { label: 'Re-Crisp Skin', minutes: 3 }
          }
        ]
      },

      {
        id: 'stuffing',
        kicker: 'Essential Side · Smitten Kitchen',
        title: 'Challah Stuffing With Leeks and Celery',
        byline: 'Adapted from Deb Perelman · Zero-Waste 1-lb Loaf Calibration',
        sourceUrl: 'https://smittenkitchen.com/2019/11/challah-stuffing/',
        sourceName: 'Smitten Kitchen',
        specs: [
          { label: 'Yield', value: isScaledStuffing ? '6–8 servings (8×8 / 2-qt)' : '12 servings (9×13)' },
          { label: 'Wed Bake', value: '350°F covered · 20 min' },
          { label: 'Thu Crisp', value: '425°F uncovered · 20 min' }
        ],
        controls: [
          {
            key: 'stuffingScale',
            label: 'Batch Size',
            options: [
              { value: 'two-thirds', label: '1-lb Loaf (2/3x)' },
              { value: 'full', label: '1.5-lb (Full)' }
            ]
          }
        ],
        modifications: [
          '<strong>1-lb Store-Bought Loaf Scaling (2/3 Batch):</strong> Grocery challah typically comes in <strong>1-lb loaves</strong>, and the original 9×13 pan serves 12—huge next to a 3-lb half turkey breast. Scaling to 2/3 uses one whole 1-lb loaf cleanly in an 8×8 or 2-quart dish.',
          '<strong>Broth Caution:</strong> Store-bought challah is airier than homemade—pour broth gradually and hold back the last ¼ cup if cubes feel fully saturated.',
          '<strong>Simplicity Swaps:</strong> Yellow onion swaps 1:1 for leeks (skips washing gritty layers). Doing the covered bake Wednesday evening keeps Thursday calm.'
        ],
        ingredientGroups: [
          {
            title: isScaledStuffing ? '2/3 Batch (1-lb Loaf · 8×8 Pan)' : 'Full Original (1.5-lb Loaf · 9×13 Pan)',
            items: isScaledStuffing
              ? [
                  '1 lb challah bread (1 standard loaf), 1-inch cubes, dried',
                  '5½ tbsp unsalted butter (1½ tbsp sauté + 4 tbsp melted drizzle), plus pan butter',
                  '1⅓ cups small-diced celery (~2 large ribs)',
                  '1⅓ cups small-diced leeks (1–2 medium) OR ⅔ large yellow onion',
                  '2 tsp EACH minced fresh rosemary, sage, and thyme',
                  '⅓ cup packed chopped flat-leaf parsley',
                  '1¼ tsp kosher salt & ¾ tsp coarsely ground black pepper (divided)',
                  '1¾ to 2 cups vegetable, chicken, or turkey broth (pour gradually)'
                ]
              : [
                  '1.5 lbs challah bread, 1-inch cubes, dried',
                  '½ cup (8 tbsp) unsalted butter (2 tbsp sauté + 6 tbsp melted drizzle), plus pan butter',
                  '2 cups small-diced celery (~3 large ribs)',
                  '2 cups small-diced leeks (~2 large) OR 1 large yellow onion',
                  '1 tbsp EACH minced fresh rosemary, sage, and thyme',
                  '½ cup packed chopped flat-leaf parsley',
                  '2 tsp kosher salt & 1 tsp coarsely ground black pepper (divided)',
                  '2½ to 3 cups vegetable, chicken, or turkey broth (pour gradually)'
                ]
          }
        ],
        steps: [
          {
            title: 'Dry the Bread Cubes (Tuesday Night or Wednesday 5:30 PM)',
            text: 'Cut challah into generous 1-inch cubes. Air-dry overnight on a sheet pan, OR dry in a 300°F oven for 15 minutes until firm but not browned.'
          },
          {
            title: 'Wednesday 6:35 PM · Sauté Aromatics & Butter Dish',
            text: `Heat oven to 350°F. Generously butter a ${isScaledStuffing ? '8×8-inch or 2-quart' : '9×13-inch'} baking dish (challah sticks otherwise!) and add cubes. Melt ${isScaledStuffing ? '1½ tbsp' : '2 tbsp'} butter in a large skillet over medium heat; cook celery, leeks/onion, and half the salt and pepper ~10 minutes until tender. Add rosemary, sage, and thyme; cook 1 minute.`
          },
          {
            title: 'Wednesday · Toss & Stage-1 Bake (Foil-On)',
            text: 'Disperse sautéed vegetables and parsley gently through the challah with your hands. Stir remaining salt and pepper into broth and pour gradually over challah. Cover tightly with foil and bake at 350°F for 20 minutes. Cool 20 min, then refrigerate covered.',
            timer: { label: 'Stuffing Stage-1 Bake', minutes: 20 }
          },
          {
            title: 'Thursday 3:30 PM · Butter Drizzle & 425°F Crisp',
            text: `Pull from fridge at 3:00 PM and uncover. Preheat oven to 425°F. Drizzle remaining ${isScaledStuffing ? '4 tbsp' : '6 tbsp'} melted butter evenly over top and bake uncovered 20 minutes until crisp and deeply golden.`,
            timer: { label: 'Stuffing Final Crisp', minutes: 20 }
          }
        ]
      },

      {
        id: 'brussels',
        kicker: 'Crisp Green Side · NYT Cooking',
        title: 'Air-Fryer Brussels Sprouts With Garlic, Balsamic and Soy',
        byline: 'Adapted from Melissa Clark · Small Circular Air-Fryer Method',
        sourceUrl: 'https://cooking.nytimes.com/recipes/1020126-air-fryer-brussels-sprouts-with-garlic-balsamic-and-soy',
        sourceName: 'NYT Cooking',
        specs: [
          { label: 'Yield', value: '3–4 servings (1 lb trimmed)' },
          { label: 'Air Fryer', value: '400°F · 2 batches + 3m finish' },
          { label: 'Glaze', value: 'Stovetop · 2–3 min' }
        ],
        controls: [],
        modifications: [
          '<strong>Small Circular Air Fryer Fix:</strong> Packing 1 lb into a compact basket causes steaming. Air-fry in <strong>two ½-lb batches (13 min each)</strong>, then combine both batches back in the basket with sliced garlic for a <strong>3-minute joint blast</strong> so every sprout arrives scorching hot.',
          '<strong>Ingredient Synergy & Salt:</strong> Shares fresh limes with your mocktail and soy sauce with your gravy. Bump kosher salt from ¼ tsp to <strong>½ tsp</strong> for brighter seasoning.'
        ],
        ingredientGroups: [
          {
            title: 'Exact 1-lb Ingredients',
            items: [
              '1 lb trimmed Brussels sprouts, halved through stems (quarter large ones)',
              '3 tbsp extra-virgin olive oil (1 tbsp sprouts + 2 tbsp dressing)',
              '¼ to ½ tsp kosher salt',
              '2 garlic cloves, thinly sliced',
              '¼ cup balsamic vinegar',
              '1 tsp fresh lime juice, plus wedges for serving',
              '½ tsp soy sauce'
            ]
          }
        ],
        steps: [
          {
            title: 'Wednesday Prep (5 Minutes)',
            text: 'Halve trimmed sprouts lengthwise through the stems (quarter large ones), pat dry, and bag with a dry paper towel. Thinly slice 2 garlic cloves and wrap tightly.'
          },
          {
            title: 'Thursday 3:15 PM · Air-Fry Batch 1 (400°F)',
            text: 'Preheat air fryer to 400°F. Toss all 1 lb sprouts with 1 tbsp olive oil and salt. Air-fry HALF (Batch 1) for 13 minutes, shaking halfway.',
            timer: { label: 'Brussels Batch 1', minutes: 13 }
          },
          {
            title: 'Thursday 3:32 PM · Air-Fry Batch 2 & Reduce Balsamic Glaze',
            text: 'Move Batch 1 to a bowl and air-fry Batch 2 for 13 minutes (shake halfway). Meanwhile, simmer ¼ cup balsamic vinegar in a small saucepan 2–3 minutes until syrupy—watch closely! Off heat, whisk in 2 tbsp olive oil, 1 tsp lime juice, and ½ tsp soy sauce.',
            timer: { label: 'Brussels Batch 2', minutes: 13 }
          },
          {
            title: 'Thursday 3:48 PM · Joint Garlic Flash-Crisp & Dress',
            text: 'Return Batch 1 into the basket with Batch 2, scatter sliced garlic on top, and air-fry 3–4 minutes until garlic is golden. Transfer to platter, drizzle with balsamic-soy-lime glaze, and finish with fresh lime.',
            timer: { label: 'Garlic Finish', minutes: 3 }
          }
        ]
      },

      {
        id: 'crumble',
        kicker: 'Dessert · NYT Cooking',
        title: 'Mixed-Apple Oat & Pecan Crumble',
        byline: 'Adapted from Samantha Seneviratne · Calibrated to Your 6 Apples + Caramel',
        sourceUrl: 'https://cooking.nytimes.com/recipes/1018638-apple-crumble',
        sourceName: 'NYT Cooking',
        specs: [
          { label: 'Yield', value: isScaledCrumble ? '6–8 servings (9×9 / 10" skillet)' : '8–10 servings (9×13)' },
          { label: 'Bake', value: '350°F · 50–55 min (at 1:30 PM)' },
          { label: 'Finish', value: 'Warm Caramel & Vanilla Ice Cream' }
        ],
        controls: [
          {
            key: 'crumbleScale',
            label: 'Apple Batch',
            options: [
              { value: 'three-quarters', label: '6 Apples (3/4x)' },
              { value: 'full', label: '8 Apples (Full)' }
            ]
          }
        ],
        modifications: [
          '<strong>Scaled to Your Exact 6 Apples (3/4 Batch):</strong> 2 Granny Smith + 2 Golden Delicious + 2 Pink Lady (~2.5 lbs) fit a <strong>9×9 dish or 10-inch skillet</strong> cleanly at 75% of NYT’s 8-apple recipe.',
          '<strong>Sugar Trimmed for Homemade Caramel:</strong> Reduced apple-filling brown sugar to <strong>¼ cup</strong> (keeping full streusel sugar for crisp clumps) so the tart Granny Smith cuts through your homemade caramel and vanilla ice cream.',
          '<strong>Wednesday Topping + Early 1:30 PM Bake:</strong> Chilled streusel bakes crisper; baking early frees the oven and lets juices thicken before a quick 10-min rewarm at 4:45 PM.'
        ],
        ingredientGroups: [
          {
            title: isScaledCrumble ? 'Crumble Topping (3/4 Batch · Make Wed)' : 'Crumble Topping (Full Original)',
            items: isScaledCrumble
              ? [
                  '9 tbsp (128g) unsalted butter, melted, plus extra for dish',
                  '1 cup + 2 tbsp (135g) all-purpose flour',
                  '¾ cup (150g) packed dark brown sugar',
                  '¾ cup (60g) old-fashioned rolled oats',
                  '¾ cup (85g) pecans (or walnuts), coarsely chopped (optional)',
                  '¾ tsp kosher salt'
                ]
              : [
                  '12 tbsp (170g) unsalted butter, melted, plus extra for dish',
                  '1½ cups (180g) all-purpose flour',
                  '1 cup (200g) packed dark brown sugar',
                  '1 cup (80g) old-fashioned rolled oats',
                  '1 cup (113g) pecans, coarsely chopped (optional)',
                  '1 tsp kosher salt'
                ]
          },
          {
            title: isScaledCrumble ? 'Your 6-Apple Filling + Serving' : '8-Apple Filling + Serving',
            items: isScaledCrumble
              ? [
                  '6 apples (~2.5 lbs): 2 Granny Smith, 2 Golden Delicious, 2 Pink Lady — peeled, cored, ½-inch wedges',
                  '¼ cup (50g) packed dark brown sugar (dialed back for caramel)',
                  '2¼ tsp ground cinnamon & 1½ tbsp fresh lemon juice',
                  'For serving: Homemade caramel sauce (warmed 25 sec) + vanilla ice cream'
                ]
              : [
                  '3½ lbs mixed apples (~8 medium), peeled, cored, ½-inch wedges',
                  '½ cup (100g) packed dark brown sugar',
                  '1 tbsp ground cinnamon & 2 tbsp fresh lemon juice',
                  'For serving: Homemade caramel sauce (warmed 25 sec) + vanilla ice cream'
                ]
          }
        ],
        steps: [
          {
            title: 'Wednesday 6:15 PM · Mix & Chill Topping',
            text: `Stir flour, topping dark brown sugar (${isScaledCrumble ? '¾ cup' : '1 cup'}), oats, pecans, and salt. Stir in melted butter with a fork until moistened; cover and refrigerate overnight.`
          },
          {
            title: 'Thursday 1:00 PM · Prep Apples',
            text: `Heat oven to 350°F; butter a ${isScaledCrumble ? '9×9 dish or 10-inch skillet' : '9×13 dish'}. Peel, core, and cut apples into ½-inch wedges; toss in dish with filling sugar (${isScaledCrumble ? '¼ cup' : '½ cup'}), cinnamon, and lemon juice.`
          },
          {
            title: 'Thursday 1:30 PM · Top & Bake',
            text: 'Press chilled crumble into clumps of varying sizes and scatter over apples. Bake 50–55 minutes until bubbling and deep golden. Cool uncovered on a wire rack.',
            timer: { label: 'Apple Crumble Bake', minutes: 50 }
          },
          {
            title: 'Thursday 4:45 PM · Rewarm & Serve',
            text: 'Warm crumble at 300°F for 10 min (or microwave bowls 25 sec). Warm homemade caramel 20–30 sec in microwave until pourable. Serve with cold vanilla ice cream and warm caramel.',
            timer: { label: 'Rewarm Crumble', minutes: 10 }
          }
        ]
      }
    ];
  },

  getSupportingCast(cfg) {
    const items = [];

    if (cfg.includeSoup) {
      items.push({
        id: 'squash-soup',
        title: 'Freezer Squash Soup (Optional Starter)',
        timing: 'Thaw Wed Night · Slow Cooker 2:30 PM · Serve 3:45 PM',
        copy: '<strong>Verdict: Fits beautifully!</strong> Earthy, velvety squash soup bridges your 2:00 PM snack board to the herb-roasted turkey plate and puts your idle <strong>Slow Cooker</strong> to work (LOW at 2:30 PM → WARM automatically, zero stove clutter). <strong>Key portion tip:</strong> serve small ½-cup mugs/cups at 3:45 PM as a seated starter while you carve—keeps appetites intact for the main event. Swirl with olive oil and cracked black pepper.'
      });
    }

    items.push(
      {
        id: 'mocktail',
        title: 'Cranberry-Ginger Lime Mocktail',
        timing: 'Chill Wed · Self-Serve Bar 1:40 PM',
        copy: 'Over ice: <strong>3 oz chilled cranberry juice</strong> + <strong>4 oz chilled ginger beer</strong> + <strong>½ oz fresh lime juice</strong> (1–2 wedges). Garnish with a lime wheel and extra rosemary sprig from the stuffing.'
      },
      {
        id: 'snack-board',
        title: 'Meat, Cheese & Crackers Board',
        timing: 'Pull Cheese 1:00 PM · Serve 2:00 PM',
        copy: 'Pull cheeses <strong>1 hour early</strong> so they reach room temperature. Arrange at 1:40 PM while the crumble bakes—gives everyone a relaxed two-hour runway to dinner.'
      },
      {
        id: 'cranberry-sauce',
        title: 'Whole-Berry Canned Cranberry Sauce',
        timing: 'Chill Wed · Bowl at 3:00 PM',
        copy: 'Chill overnight; spoon into a serving bowl at 3:00 PM and loosen gently with a fork. <em>Quick lift:</em> add a tiny grate of fresh lime or lemon zest over top.'
      },
      {
        id: 'rolls',
        title: 'Warm Dinner Rolls',
        timing: '3:50 PM · Residual Oven (4–5 Min)',
        copy: 'Set butter out at 3:00 PM. When stuffing leaves the 425°F oven at 3:50 PM, turn the oven <strong>OFF</strong> and slide loosely foil-tented rolls inside for 4–5 minutes—pillowy warm with zero scorching.'
      }
    );

    return items;
  },

  getAppliances(cfg) {
    const includeSoup = Boolean(cfg.includeSoup);
    return [
      {
        name: 'Sous Vide Circulator',
        status: 'Primary Protein · Hands-Off',
        standby: false,
        slots: [
          { time: 'Thu 12:30 PM', title: 'Preheat Bath', detail: `${cfg.turkeyTemp}°F water bath` },
          { time: 'Thu 12:45–3:51', title: '3-lb Half Turkey Breast', detail: '2.5 hr min cook, holds safely through 4:00 PM' }
        ],
        note: 'Liberates your oven on Thanksgiving Day and eliminates dry turkey breast.'
      },
      {
        name: 'Main Oven (w/ Air Fry)',
        status: 'Zero Conflicts · Staggered',
        standby: false,
        slots: [
          { time: 'Wed 5:30 PM', title: 'Dry Challah (Optional)', detail: '300°F · 15 min if not air-dried' },
          { time: 'Wed 6:00 PM', title: 'Crispy Turkey Skin', detail: '400°F · 25–35 min weighted flat' },
          { time: 'Wed 6:35 PM', title: 'Stuffing Stage 1', detail: '350°F covered · 20 min, then chill' },
          { time: 'Thu 1:30–2:25', title: 'Apple Crumble', detail: '350°F · 50–55 min (early bake)' },
          { time: 'Thu 3:30–3:50', title: 'Stuffing Final Crisp', detail: '425°F uncovered · 20 min w/ butter' },
          { time: 'Thu 3:50–3:55', title: 'Dinner Rolls (Oven OFF)', detail: 'Residual heat warms softly in 4–5 min' },
          { time: 'Thu 4:45 PM', title: 'Rewarm Apple Crumble', detail: '300°F · 10 min before dessert' }
        ],
        note: 'Every temperature steps cleanly—never two dishes fighting for the oven at once.'
      },
      {
        name: 'Small Circular Air Fryer',
        status: 'Final 45-Min Star',
        standby: false,
        slots: [
          { time: 'Thu 3:15–3:28', title: 'Brussels Batch 1', detail: '400°F · ½ lb, shake at 6 min' },
          { time: 'Thu 3:32–3:45', title: 'Brussels Batch 2', detail: '400°F · ½ lb, shake at 6 min' },
          { time: 'Thu 3:48–3:52', title: 'Joint Batch + Garlic', detail: '400°F · Both batches + garlic 3–4 min' }
        ],
        note: 'Two uncrowded batches prevent steaming; the 3-min joint finish lands all 1 lb hot together.'
      },
      {
        name: 'Slow Cooker',
        status: includeSoup ? 'Squash Soup Station' : 'Standby / Optional',
        standby: !includeSoup,
        slots: includeSoup
          ? [
              { time: 'Thu 2:30–3:45', title: 'Warm Squash Soup', detail: 'LOW ~65 min → switches to WARM automatically' },
              { time: 'Thu 3:45 PM', title: 'Ladle Starter Cups', detail: 'Zero burner clutter during the final sprint' }
            ]
          : [
              { time: 'Thu 3:30–4:00', title: 'Optional Gravy Warmer', detail: 'Set to WARM if you want Burner 1 clear' }
            ],
        note: includeSoup
          ? 'The ideal hands-off vessel for thawed squash soup—keeps all stovetop burners clear (or use Burner 3 on Low at 3:25 PM).'
          : 'Toggle Squash Soup ON in options to assign your thawed freezer soup here.'
      },
      {
        name: '4-Burner Stovetop',
        status: 'Light Duty · Max 2 Burners',
        standby: false,
        slots: [
          { time: 'Wed 6:35 PM', title: 'Burner 1: Stuffing Veg', detail: 'Sauté celery, leeks/onion & herbs (~11 min)' },
          { time: 'Thu 3:15–3:55', title: 'Burner 1: Turkey Gravy', detail: 'Roux + stock simmer, hold on low' },
          { time: 'Thu 3:35–3:40', title: 'Burner 2: Balsamic Glaze', detail: 'Simmer ¼ cup balsamic 2–3 min' }
        ],
        note: 'Even at peak 3:35 PM crunch, Burners 3 and 4 stay wide open (Burner 3 can also warm squash soup if skipping the slow cooker).'
      },
      {
        name: 'Toaster Oven & Microwave',
        status: '3:50 PM Finishing Helpers',
        standby: false,
        slots: [
          { time: 'Wed 6:15 PM', title: 'Microwave: Crumble Butter', detail: 'Melt 9 tbsp butter (~40 sec)' },
          { time: 'Thu 3:05 PM', title: 'Microwave: Stuffing Butter', detail: 'Melt 4 tbsp butter (~35 sec)' },
          { time: 'Thu 3:50–3:53', title: 'Toaster Oven: Turkey Skin', detail: '350°F · 2–3 min to re-crisp' },
          { time: 'Thu 4:50 PM', title: 'Microwave: Caramel Sauce', detail: '20–30 sec until pourable' }
        ],
        note: 'Toaster oven revives the turkey skin while residual main oven heat warms the rolls.'
      },
      {
        name: 'Instant Pot',
        status: cfg.turkeyBone === 'bone-in' ? 'Wed Stock Shortcut' : 'Standby',
        standby: cfg.turkeyBone !== 'bone-in',
        slots: [
          { time: 'Wed 6:05 PM', title: 'Fortified Turkey Stock', detail: 'Sauté breastbone + veg, then 25 min High Pressure' }
        ],
        note: 'Cuts Kenji’s 1-hour stovetop stock simmer in half on Wednesday evening.'
      }
    ];
  },

  editorialNotes: [
    {
      kicker: 'Menu Composition · Optional Addition',
      title: 'Why Frozen Squash Soup Works So Well (Just Keep Portions Small)',
      body: 'Velvety squash soup complements sage, rosemary, and lean turkey breast beautifully—and because it’s already made in your freezer, it adds a cozy starter course with near-zero effort. Move it to the fridge Wednesday night and warm it hands-free in your idle Slow Cooker at 2:30 PM. Serving small ½-cup mugs at 3:45 PM gets guests seated during your final 10-minute carve without filling them up after the 2:00 PM meat & cheese board.'
    },
    {
      kicker: 'Portion Calibration · Turkey',
      title: 'Tailored for Your 3-lb Half Turkey Breast',
      body: 'Serious Eats assumes a 5-lb double breast tied jigsaw-style. With one 3-lb half breast, simply peel the skin in one sheet, debone, fold the thin tail slightly under, and tie with 2–3 strings. Cook at 145°F (ultra-juicy) or 150°F (classic white) for 2.5–3.5 hours, and check the smaller skin sheet early at 25 minutes.'
    },
    {
      kicker: 'Zero-Waste Scaling · Stuffing',
      title: '1-lb Challah Loaf (2/3 Batch) Matches Your Portions',
      body: 'Smitten Kitchen’s full 9×13 batch serves 12 using 1.5 lbs challah—huge next to a 3-lb half turkey breast—while store-bought challah almost always weighs 1 lb. Scaling to 2/3 uses one entire loaf cleanly in an 8×8 or 2-quart dish, with a one-tap toggle back to full 1x if you want extra leftovers.'
    },
    {
      kicker: 'Appliance Strategy · Brussels Sprouts',
      title: 'Beating Small Circular Air-Fryer Crowding',
      body: 'Piling 1 lb of halved sprouts into a compact basket steams them. Running two ½-lb batches (13 min each) and reuniting both batches with the sliced garlic for a 3-minute blast at 3:48 PM delivers charred edges and scorching-hot sprouts together.'
    },
    {
      kicker: 'Flavor Balance · Apple Crumble',
      title: '6-Apple 3/4 Scaling + Caramel Sugar Trim',
      body: 'Your 2 Granny Smith, 2 Golden Delicious, and 2 Pink Lady apples (~2.5 lbs) fit a 9×9 dish or 10-inch skillet at 75% of NYT’s 8-apple recipe. Trimming the apple-filling brown sugar to ¼ cup keeps the tart Granny Smith bright underneath your homemade caramel and vanilla ice cream.'
    },
    {
      kicker: 'Wednesday Evening · Zero Quality Loss',
      title: 'The 75-Minute Head Start That Calms Thursday',
      body: 'Dry-brining the turkey, roasting the flat skin (re-crisps in 3 min in your toaster oven), pressure-cooking the stock, chilling the crumble topping, and baking Stage 1 of the stuffing Wednesday night leave Thursday morning 100% free.'
    }
  ],

  getPantryChecklist(cfg) {
    const groups = [
      {
        group: 'Turkey & Gravy',
        items: [
          '3-lb half turkey breast (thawed)',
          'Kitchen twine & gallon heavy-duty zip-top bag',
          'Parchment paper + 2 rimmed baking sheets',
          'Low-sodium chicken stock (2 cartons covers gravy + stuffing)',
          '1 onion, 1 carrot, 1 bay leaf (if bone-in gravy)',
          'Soy sauce (used in both gravy & Brussels sprouts)',
          'All-purpose flour & unsalted butter'
        ]
      },
      {
        group: 'Challah Stuffing',
        items: [
          '1 lb store-bought challah loaf (or 1.5 lb for full batch)',
          'Celery (2–3 ribs + 1 rib for gravy)',
          'Leeks (2) OR 1 large yellow onion',
          'Fresh rosemary, sage, thyme & flat-leaf parsley',
          'Unsalted butter (at least 3 sticks total across menu)',
          'Heavy-duty aluminum foil'
        ]
      },
      {
        group: 'Brussels Sprouts & Mocktails',
        items: [
          '1 lb trimmed Brussels sprouts & 2 cloves garlic',
          'Balsamic vinegar (¼ cup) & extra-virgin olive oil',
          'Fresh limes (3–4 limes covers sprouts + mocktails)',
          'Ginger beer, cranberry juice & plenty of ice'
        ]
      },
      {
        group: 'Crumble, Dessert & Supporting Cast',
        items: [
          ...(cfg.includeSoup ? ['Frozen squash soup (move freezer → fridge Wed 5:30 PM)'] : []),
          '6 apples: 2 Granny Smith, 2 Golden Delicious, 2 Pink Lady',
          '1 lemon (1½ tbsp juice for apples)',
          'Dark brown sugar, old-fashioned rolled oats, cinnamon, pecans (opt.)',
          'Homemade caramel sauce & vanilla ice cream',
          'Dinner rolls & canned whole-berry cranberry sauce',
          'Meat, cheese & crackers for 2:00 PM snack board'
        ]
      }
    ];
    return groups;
  }
};
