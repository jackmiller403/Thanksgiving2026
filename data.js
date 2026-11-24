/* ==========================================================================
   THE THANKSGIVING CHRONICLE — Structured Culinary Execution Data
   Verified recipes, portion modifications, Wednesday & Thursday choreography
   ========================================================================== */

window.THANKSGIVING_DATA = {
  meta: {
    targetMealTime: '4:00 PM',
    wednesdayDate: 'Wednesday, Nov. 25, 2026',
    thursdayDate: 'Thursday, Nov. 26, 2026',
    servingsNote: 'Calibrated for a 3-lb half turkey breast (4–6 generous servings)'
  },

  /**
   * Build the full timeline dynamically so user preferences
   * (turkeyTemp, turkeyBone, stuffingScale, crumbleScale) stay synced everywhere.
   */
  getTimeline(cfg) {
    const isBoneIn = cfg.turkeyBone === 'bone-in';
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

    return [
      /* =================== WEDNESDAY EVENING PREP =================== */
      {
        id: 'wed-1',
        day: 'wed',
        act: 'Wednesday Evening · The 75-Minute Head Start (Zero Quality Loss)',
        time: '5:30 PM',
        duration: '15 min',
        title: 'Cube & Dry the Challah Bread',
        appliance: 'Main Oven (300°F) · Optional',
        role: 'partner',
        dishId: 'stuffing',
        summary: `Cut ${cfg.stuffingScale === 'two-thirds' ? '1 lb (one whole store-bought loaf)' : '1.5 lbs'} challah into generous 1-inch cubes. If not already air-dried overnight, spread on a sheet pan and dry at 300°F for 15 minutes until firm to the touch (not browned).`,
        tip: 'If you cubed the challah Tuesday night and left it uncovered on the counter, skip the oven dry entirely.',
        timer: { label: 'Dry Challah Cubes', minutes: 15 }
      },
      {
        id: 'wed-2',
        day: 'wed',
        act: 'Wednesday Evening · The 75-Minute Head Start (Zero Quality Loss)',
        time: '5:45 PM',
        duration: '15 min',
        title: 'Butcher, Dry-Brine & Bag the 3-lb Half Turkey Breast',
        appliance: 'Prep / Fridge',
        role: 'lead',
        dishId: 'turkey',
        summary: isBoneIn
          ? 'Peel the skin off in one intact sheet and set aside on parchment. Use a sharp knife to free the single breast lobe from the breastbone (save the bone for stock!). Season meat generously on all sides with kosher salt and freshly ground black pepper. Fold the thin tail slightly under itself and tie loosely with 2–3 pieces of kitchen twine for an even cylinder. Slide into a heavy-duty gallon zip-top bag (optionally tuck 1 sprig rosemary/thyme from the stuffing herbs inside) and refrigerate overnight to dry-brine.'
          : 'Peel the skin off in one intact sheet (if skin-on) and set aside on parchment. Season the boneless half breast generously on all sides with kosher salt and black pepper. Fold the tapered tail slightly under itself and tie lightly with 2–3 pieces of twine for even thickness. Place in a heavy-duty gallon zip-top bag with an optional sprig of rosemary or thyme, and refrigerate overnight to dry-brine.',
        tip: 'Kenji notes bagged seasoned turkey can dry-brine in the fridge up to 3–5 days—overnight Wednesday gives deeper seasoning right to the center.'
      },
      {
        id: 'wed-3',
        day: 'wed',
        act: 'Wednesday Evening · The 75-Minute Head Start (Zero Quality Loss)',
        time: '6:00 PM',
        duration: '30 min',
        title: 'Roast the Crispy Turkey Skin Flat',
        appliance: 'Main Oven (400°F)',
        role: 'lead',
        dishId: 'turkey',
        summary: 'Preheat oven to 400°F. Lay turkey skin completely flat on a parchment-lined rimmed baking sheet, season generously with salt and pepper, cover with a second sheet of parchment, squeeze out air bubbles, and weight it down with a second rimmed baking sheet on top. Roast 25–35 minutes until deep golden brown and shattering crisp.',
        tip: 'Because a half-breast skin is smaller than a whole breast skin, start checking at 25 minutes. Cool completely and store in an OPEN container at room temp—it stays crisp and refreshes in 3 minutes in the toaster oven Thursday! Save any rendered schmaltz in the pan to drizzle on your stuffing.',
        timer: { label: 'Roast Turkey Skin', minutes: 30 }
      },
      {
        id: 'wed-4',
        day: 'wed',
        act: 'Wednesday Evening · The 75-Minute Head Start (Zero Quality Loss)',
        time: '6:05 PM',
        duration: isBoneIn ? '40 min' : '5 min',
        title: isBoneIn
          ? 'Make Fortified Turkey Stock (Instant Pot Shortcut)'
          : 'Skip Bone Stock (Boneless Mode — Quick Gravy Thursday)',
        appliance: isBoneIn ? 'Instant Pot (or Stovetop)' : 'Pantry Check',
        role: 'lead',
        dishId: 'turkey',
        summary: isBoneIn
          ? 'Halved gravy batch: Chop the half breastbone into 2–3 chunks. On Instant Pot Sauté (or a medium saucepan), brown bone in 2 tsp oil with ½ chopped onion, ½ carrot, and 1 rib celery for 6–8 minutes. Add 3 cups low-sodium chicken stock, 1 bay leaf, and ½ tsp soy sauce. Pressure cook on HIGH for 25 minutes + 10 min natural release (or simmer 50 min on stovetop). Strain and refrigerate overnight.'
          : 'Without a breastbone, skip stock-simmering tonight! Simply verify you have 2 cups low-sodium chicken stock, soy sauce, butter, flour, and a sprig of thyme ready for a 10-minute velvety Thursday gravy enriched with the strained sous vide bag juices.',
        tip: isBoneIn
          ? 'Using the Instant Pot tonight keeps your stovetop calm and produces deep, gelatin-rich stock ready for a 10-minute Thursday roux.'
          : 'Strained sous vide turkey bag juices + ½ tsp soy sauce + chicken stock deliver deeply savory gravy in 10 minutes flat.',
        timer: isBoneIn ? { label: 'Instant Pot Stock', minutes: 25 } : null
      },
      {
        id: 'wed-5',
        day: 'wed',
        act: 'Wednesday Evening · The 75-Minute Head Start (Zero Quality Loss)',
        time: '6:15 PM',
        duration: '20 min',
        title: 'Mix Crumble Topping, Halve Brussels & Chill Drinks',
        appliance: 'Microwave · Fridge',
        role: 'partner',
        dishId: 'crumble',
        summary: 'Three effortless wins while the skin roasts: (1) Melt crumble butter in microwave and stir into flour, brown sugar, oats, chopped pecans, and salt—refrigerate covered (chilled streusel clumps better!). (2) Halve your 1 lb trimmed Brussels sprouts through the stems (quarter large ones); bag with a dry paper towel. Thinly slice 2 garlic cloves and wrap tightly. (3) Put ginger beer, cranberry juice, and canned cranberry sauce in the fridge.',
        tip: 'Do NOT slice the apples tonight—they hold better texture sliced fresh Thursday at 1:00 PM.'
      },
      {
        id: 'wed-6',
        day: 'wed',
        act: 'Wednesday Evening · The 75-Minute Head Start (Zero Quality Loss)',
        time: '6:35 PM',
        duration: '35 min',
        title: 'Assemble & Stage-1 Bake the Challah Stuffing',
        appliance: 'Stovetop + Main Oven (350°F)',
        role: 'lead',
        dishId: 'stuffing',
        summary: `Once turkey skin comes out, drop oven to 350°F. Generously butter your ${stuffingPan} (Deb’s #1 rule!). Sauté diced celery and leeks (or yellow onion) in butter with half the salt and pepper until tender (~10 min), then stir in minced sage, rosemary, and thyme for 1 minute. Toss gently with dried challah cubes and chopped parsley. Pour seasoned broth gradually until saturated (hold back a splash if store-bought challah feels very wet). Cover tightly with foil and bake 20 minutes. Cool 20 min, then refrigerate covered.`,
        tip: 'Per Smitten Kitchen’s make-ahead method, stopping after the covered bake locks in flavor with zero quality loss—Thursday only needs a butter drizzle and a 20-minute crisp at 425°F!',
        timer: { label: 'Stuffing Stage-1 Bake', minutes: 20 }
      },

      /* =================== THURSDAY — ACT I =================== */
      {
        id: 'thu-1',
        day: 'thu',
        act: 'Act I · The Afternoon Launch (12:30 PM – 2:00 PM)',
        time: '12:30 PM',
        duration: '15 min setup',
        title: `Preheat Sous Vide Bath to ${temp}°F & Drop Turkey`,
        appliance: `Sous Vide (${temp}°F)`,
        role: 'lead',
        dishId: 'turkey',
        critical: true,
        summary: `Fill sous vide vessel and preheat to ${tempLabel}. Slowly lower the bagged dry-brined turkey breast into the water so water pressure forces out air, seal just above the waterline, and clip to the side by 12:45 PM.`,
        tip: 'Minimum cook is 2.5 hours (ready at 3:15 PM), and it holds happily up to 4 hours (4:45 PM) with zero overcooking—complete timing freedom!',
        timer: { label: `Sous Vide Turkey (${temp}°F)`, minutes: 150 }
      },
      {
        id: 'thu-2',
        day: 'thu',
        act: 'Act I · The Afternoon Launch (12:30 PM – 2:00 PM)',
        time: '1:00 PM',
        duration: '25 min',
        title: 'Temper Cheese Board & Prep the 6 Apples for Crumble',
        appliance: 'Prep · Preheat Oven 350°F',
        role: 'partner',
        dishId: 'crumble',
        summary: `Preheat main oven to 350°F. Pull cheeses for the snack board out of the fridge so they reach ideal room temperature by 2:00 PM. Butter a ${crumblePan}. Peel, core, and cut your 2 Granny Smith, 2 Golden Delicious, and 2 Pink Lady apples into ½-inch wedges. Toss in the dish with ${crumbleAppleSugar}, cinnamon, and fresh lemon juice. Press chilled crumble topping into varied clumps and scatter evenly on top.`,
        tip: 'Dialing back the apple sugar slightly balances your homemade caramel and vanilla ice cream without muddying the Granny Smith tartness.'
      },
      {
        id: 'thu-3',
        day: 'thu',
        act: 'Act I · The Afternoon Launch (12:30 PM – 2:00 PM)',
        time: '1:30 PM',
        duration: '50–55 min',
        title: 'Bake the Apple Crumble Early',
        appliance: 'Main Oven (350°F)',
        role: 'lead',
        dishId: 'crumble',
        summary: 'Slide the Apple Crumble onto the center rack at 350°F. Bake 50–55 minutes until the fruit juices bubble at the edges, apples yield easily to a paring knife, and the oat-pecan topping is crisp and deep golden brown.',
        tip: 'Baking dessert early clears the oven completely for the 3:30 PM dinner push AND lets the apple juices thicken cleanly while resting.',
        timer: { label: 'Apple Crumble Bake', minutes: 50 }
      },
      {
        id: 'thu-4',
        day: 'thu',
        act: 'Act I · The Afternoon Launch (12:30 PM – 2:00 PM)',
        time: '1:40 PM',
        duration: '15 min',
        title: 'Arrange Snack Board & Self-Serve Mocktail Bar',
        appliance: 'Counter / Bar',
        role: 'partner',
        dishId: 'supporting',
        summary: 'Arrange cured meats, room-temp cheeses, and crackers on a board. Slice fresh limes into wedges (set aside 2–3 wedges for the Brussels sprouts later!). Set up a self-serve mocktail station: ice bucket, chilled ginger beer, chilled cranberry juice, sliced limes, glasses, and optional extra rosemary sprigs for garnish.',
        tip: 'Mocktail build: 3 oz cranberry juice + 4 oz ginger beer + squeeze of fresh lime over ice. Self-serve keeps the chef free during the final hour.'
      },

      /* =================== THURSDAY — ACT II =================== */
      {
        id: 'thu-5',
        day: 'thu',
        act: 'Act II · Snacks, Breather & The Pull (2:00 PM – 3:00 PM)',
        time: '2:00 PM',
        duration: '1 hr',
        title: 'Serve Snacks & Mocktails — Step Out of the Kitchen',
        appliance: 'Living Room / Dining',
        role: 'partner',
        dishId: 'supporting',
        summary: 'Put out the meat, cheese, and crackers board and pour the first Cranberry-Ginger Lime mocktails. The turkey is cruising unattended in the sous vide and the crumble is baking. Relax!',
        tip: 'Quick check: verify the sous vide water level hasn’t dropped below the min line.'
      },
      {
        id: 'thu-6',
        day: 'thu',
        act: 'Act II · Snacks, Breather & The Pull (2:00 PM – 3:00 PM)',
        time: '2:25 PM',
        duration: '5 min',
        title: 'Pull Apple Crumble & Cool on Wire Rack',
        appliance: 'Main Oven -> OFF',
        role: 'lead',
        dishId: 'crumble',
        summary: 'Remove golden Apple Crumble from the oven and set on a cooling rack on the counter (leave uncovered so the oat topping stays crisp). Turn the oven off briefly until 3:00 PM.',
        tip: 'If the topping browns early at 40 minutes while apples are still firm, tent loosely with a sheet of foil for the final 10 minutes.'
      },

      /* =================== THURSDAY — ACT III =================== */
      {
        id: 'thu-7',
        day: 'thu',
        act: 'Act III · The Final Hour Push (3:00 PM – 3:48 PM)',
        time: '3:00 PM',
        duration: '15 min',
        title: 'Final-Hour Mise en Place & Preheat Oven to 425°F',
        appliance: 'Main Oven (425°F) · Microwave',
        role: 'partner',
        dishId: 'stuffing',
        summary: `Pull the Stage-1 Challah Stuffing from the fridge and remove its foil so it loses its refrigerator chill. Preheat Main Oven to 425°F. Melt ${stuffingDrizzleButter} unsalted butter in the microwave (35 sec) for drizzling on the stuffing. Spoon chilled canned whole-berry cranberry sauce into a serving bowl (optional pinch of lime zest to brighten), soften butter for rolls, and set the table.`,
        tip: 'Also pull a clean cutting board, sharp chef’s knife, paper towels, and a turkey serving platter to the counter.'
      },
      {
        id: 'thu-8',
        day: 'thu',
        act: 'Act III · The Final Hour Push (3:00 PM – 3:48 PM)',
        time: '3:15 PM',
        duration: '15 min',
        title: 'Simmer Gravy & Air-Fry Brussels Sprouts — Batch 1',
        appliance: 'Stovetop (Burner 1) + Small Air Fryer (400°F)',
        role: 'lead',
        dishId: 'brussels',
        summary: 'Two quick parallel tracks: (1) Stovetop: Melt 2 tbsp butter over medium heat, whisk in 2.5 tbsp flour for 3 min until golden blond, then slowly whisk in 2–2.5 cups fortified stock (or chicken stock + ½ tsp soy sauce + thyme). Simmer 8–10 min until velvety; hold on lowest flame (or Slow Cooker on WARM). (2) Small Air Fryer at 400°F: Toss your 1 lb halved sprouts with 1 tbsp olive oil + ½ tsp kosher salt. Air-fry HALF the sprouts (Batch 1) for 13 minutes, shaking at 6 min.',
        tip: 'Splitting 1 lb into two uncrowded batches prevents steaming in a small circular basket—we’ll flash both batches together with the garlic at 3:48 PM so every single sprout is scorching hot!',
        timer: { label: 'Brussels Batch 1', minutes: 13 }
      },
      {
        id: 'thu-9',
        day: 'thu',
        act: 'Act III · The Final Hour Push (3:00 PM – 3:48 PM)',
        time: '3:30 PM',
        duration: '20 min',
        title: 'Blast Challah Stuffing Uncovered at 425°F',
        appliance: 'Main Oven (425°F)',
        role: 'lead',
        dishId: 'stuffing',
        critical: true,
        summary: `Drizzle the ${stuffingDrizzleButter} melted butter (plus any saved turkey skin schmaltz!) evenly over the Challah Stuffing—don’t skimp. Bake uncovered at 425°F for 20 minutes until heated through with deeply browned, crispy corners.`,
        tip: 'Because it started cool from the fridge, Deb recommends 20 minutes instead of 15. Check at 17 minutes if your oven runs hot.',
        timer: { label: 'Stuffing Crisp (425°F)', minutes: 20 }
      },
      {
        id: 'thu-10',
        day: 'thu',
        act: 'Act III · The Final Hour Push (3:00 PM – 3:48 PM)',
        time: '3:32 PM',
        duration: '13 min',
        title: 'Air-Fry Brussels Batch 2 & Reduce Balsamic Glaze',
        appliance: 'Small Air Fryer (400°F) + Stovetop (Burner 2)',
        role: 'lead',
        dishId: 'brussels',
        summary: 'Dump Batch 1 sprouts into a bowl; add Batch 2 to the 400°F air fryer for 13 minutes (shake halfway). Meanwhile, in a small saucepan on Burner 2, simmer ¼ cup balsamic vinegar for 2–3 minutes until syrupy—watch constantly so it doesn’t scorch! Pull off heat and whisk in 2 tbsp extra-virgin olive oil, 1 tsp fresh lime juice, and ½ tsp soy sauce.',
        tip: 'Quarter-cup vinegar reduces fast! Tilt the small saucepan to pool the vinegar and pull it the instant it coats the back of a spoon.',
        timer: { label: 'Brussels Batch 2', minutes: 13 }
      },

      /* =================== THURSDAY — ACT IV =================== */
      {
        id: 'thu-11',
        day: 'thu',
        act: 'Act IV · The 12-Minute Grand Finale & Dessert (3:48 PM – 5:00 PM)',
        time: '3:48 PM',
        duration: '3–4 min',
        title: 'Reunite Brussels Sprouts & Flash-Crisp with Sliced Garlic',
        appliance: 'Small Air Fryer (400°F)',
        role: 'partner',
        dishId: 'brussels',
        summary: 'Toss Batch 1 back into the air-fryer basket alongside Batch 2. Scatter the 2 thinly sliced garlic cloves over top and air-fry 3–4 minutes until the garlic turns crisp golden brown and all sprouts are piping hot.',
        tip: 'Watch garlic closely at the 3-minute mark—golden is sweet and nutty, dark brown turns bitter.',
        timer: { label: 'Brussels + Garlic Finish', minutes: 3 }
      },
      {
        id: 'thu-12',
        day: 'thu',
        act: 'Act IV · The 12-Minute Grand Finale & Dessert (3:48 PM – 5:00 PM)',
        time: '3:50 PM',
        duration: '4 min',
        title: 'Pull Stuffing · Warm Rolls in Residual Oven · Re-Crisp Turkey Skin',
        appliance: 'Main Oven (OFF) + Toaster Oven (350°F)',
        role: 'partner',
        dishId: 'supporting',
        critical: true,
        summary: 'Pull golden Challah Stuffing from the main oven and turn the main oven OFF. Immediately slide your Dinner Rolls (loosely foil-tented or on a sheet) into the hot residual oven for 4–5 minutes to warm gently without burning. At the same time, slide the roasted Turkey Skin into the Toaster Oven at 350°F for 2–3 minutes to bring back its shattering crunch.',
        tip: 'Zero appliance conflict: main oven residual heat handles the rolls while the toaster oven revives the crispy turkey skin!',
        timer: { label: 'Warm Rolls & Crisp Skin', minutes: 4 }
      },
      {
        id: 'thu-13',
        day: 'thu',
        act: 'Act IV · The 12-Minute Grand Finale & Dessert (3:48 PM – 5:00 PM)',
        time: '3:51 PM',
        duration: '7 min',
        title: 'Unbag, Pat Dry & Carve the Sous Vide Turkey Breast',
        appliance: 'Sous Vide -> Cutting Board',
        role: 'lead',
        dishId: 'turkey',
        critical: true,
        summary: 'Lift turkey from sous vide bath and cut open bag (optional: strain 2–3 tbsp flavorful bag juices into the simmering gravy!). Snip off twine, pat surface dry with paper towels, and carve smooth, even ½-inch medallions with a sharp chef’s knife. Fan slices onto a warmed platter and crown with shattered pieces of hot crispy turkey skin.',
        tip: 'Run hot tap water over your serving platter for 20 seconds and wipe dry before plating so sous vide turkey stays warm at the table.'
      },
      {
        id: 'thu-14',
        day: 'thu',
        act: 'Act IV · The 12-Minute Grand Finale & Dessert (3:48 PM – 5:00 PM)',
        time: '3:57 PM',
        duration: '3 min',
        title: 'Glaze Sprouts, Ladle Gravy & Call Dinner at 4:00 PM!',
        appliance: 'Dining Table',
        role: 'lead',
        dishId: 'brussels',
        summary: 'Transfer sizzling Brussels sprouts and crispy garlic to a serving platter, drizzle with the balsamic-soy-lime dressing, and squeeze fresh lime juice over top. Pour piping hot gravy into a gravy boat, tuck warm rolls into a napkin-lined basket, refresh mocktails, and sit down to dinner at 4:00 PM sharp!',
        tip: 'Dress the Brussels sprouts at the very last second so the charred outer leaves stay crisp.'
      },
      {
        id: 'thu-15',
        day: 'thu',
        act: 'Act IV · The 12-Minute Grand Finale & Dessert (3:48 PM – 5:00 PM)',
        time: '4:45 PM',
        duration: '10 min',
        title: 'Dessert Service: Warm Crumble, Homemade Caramel & Vanilla Ice Cream',
        appliance: 'Main Oven (300°F) + Microwave',
        role: 'partner',
        dishId: 'crumble',
        summary: 'While clearing dinner plates, warm the Apple Crumble in a 300°F oven for 10 minutes (or microwave individual bowls 25 seconds). Microwave your homemade caramel sauce for 20–30 seconds until glossy and pourable. Scoop generous bowls of warm crumble, crown with cold vanilla ice cream, and finish with a ribbon of warm caramel.',
        tip: 'A tiny pinch of flaky sea salt over the warm caramel and vanilla ice cream elevates the whole bowl.',
        timer: { label: 'Rewarm Apple Crumble', minutes: 10 }
      }
    ];
  },

  /**
   * Complete recipes with exact verified quantities, interactive scaling,
   * and explicit modification callouts.
   */
  getRecipes(cfg) {
    const isBoneIn = cfg.turkeyBone === 'bone-in';
    const temp = cfg.turkeyTemp;
    const isScaledStuffing = cfg.stuffingScale === 'two-thirds';
    const isScaledCrumble = cfg.crumbleScale === 'three-quarters';

    return [
      {
        id: 'turkey',
        kicker: 'The Centerpiece · Serious Eats',
        title: 'Sous Vide Turkey Breast With Crispy Skin',
        byline: 'Adapted from J. Kenji López-Alt · Calibrated for a 3-lb Half Turkey Breast',
        sourceUrl: 'https://www.seriouseats.com/sous-vide-turkey-breast-crispy-skin-recipe-thanksgiving',
        sourceName: 'Serious Eats',
        specs: [
          { label: 'Yield', value: '4–6 servings (3-lb half breast)' },
          { label: 'Water Bath', value: `${temp}°F · 2.5–4 hrs` },
          { label: 'Skin Roast', value: '400°F · 25–35 min' }
        ],
        controls: [
          {
            key: 'turkeyTemp',
            label: 'Doneness Temp',
            options: [
              { value: '145', label: '145°F Juicy (Kenji)' },
              { value: '150', label: '150°F Classic White' }
            ]
          },
          {
            key: 'turkeyBone',
            label: 'Cut & Gravy',
            options: [
              { value: 'bone-in', label: 'Bone-In (Fortified Gravy)' },
              { value: 'boneless', label: 'Boneless (Quick Gravy)' }
            ]
          }
        ],
        modifications: [
          '<strong>Single Half Breast (3 lbs vs. 5-lb Whole):</strong> Original ties two breast halves jigsaw-style into a cylinder. With a single half breast, simply peel the skin in one sheet, debone, fold the thin tapered tail slightly underneath, and secure loosely with 2–3 pieces of twine for uniform slicing.',
          '<strong>Crispy Skin Timing & Make-Ahead:</strong> Half a breast yields a smaller skin sheet—start checking at <strong>25 minutes</strong> at 400°F instead of 45. Roast Wednesday evening and re-crisp 3 minutes in the <strong>toaster oven</strong> Thursday at 3:50 PM (zero oven traffic jam!).',
          '<strong>Halved Gravy + Instant Pot Shortcut:</strong> Original gravy makes 3+ cups for a 5-lb breast. Scaled here to ~2 cups. Use your <strong>Instant Pot</strong> Wednesday evening (25 min High Pressure) instead of a 1-hour stovetop simmer.'
        ],
        ingredientGroups: [
          {
            title: 'For the Turkey & Crispy Skin',
            items: [
              '1 half turkey breast (about 3 lbs, skin-on)',
              'Kosher salt and freshly ground black pepper, generously',
              'Optional: 1 sprig fresh rosemary or thyme (leftover from stuffing herbs) for the sous vide bag'
            ]
          },
          {
            title: isBoneIn ? 'For the Fortified Gravy (Halved · ~2 Cups)' : 'For the 10-Minute Pantry Gravy (~1.5 Cups)',
            items: isBoneIn
              ? [
                  'Reserved turkey breastbone, chopped into 2–3 chunks',
                  '2 tsp vegetable oil',
                  '½ large yellow onion, roughly chopped',
                  '½ large carrot, peeled and roughly chopped',
                  '1 rib celery, roughly chopped',
                  '3 cups low-sodium chicken stock',
                  '1 bay leaf',
                  '½ tsp soy sauce (deep umami boost)',
                  '2 tbsp unsalted butter',
                  '2½ tbsp all-purpose flour'
                ]
              : [
                  '2 cups low-sodium chicken stock',
                  '2–3 tbsp strained sous vide turkey bag juices (optional)',
                  '½ tsp soy sauce + 1 small sprig thyme',
                  '2 tbsp unsalted butter',
                  '2½ tbsp all-purpose flour',
                  'Kosher salt and black pepper to taste'
                ]
          }
        ],
        steps: [
          {
            title: 'Wednesday · Skin, Debone & Dry-Brine',
            text: isBoneIn
              ? 'Carefully peel the turkey skin off in one large intact piece and set aside. Using a sharp knife, cut the breast meat cleanly off the breastbone (save the bone for stock). Season the meat generously on every side with kosher salt and black pepper. Fold the thin tapered tail slightly under itself and tie loosely at 2–3 intervals with kitchen twine. Slide into a gallon freezer zip-top bag (with optional herb sprig) and refrigerate overnight.'
              : 'If skin-on, peel the skin off in one intact piece and set aside. Season the boneless half breast generously on all sides with kosher salt and black pepper. Fold the thin tail under slightly and secure with 2–3 pieces of twine for even thickness. Place in a gallon freezer zip-top bag (with optional herb sprig) and refrigerate overnight.'
          },
          {
            title: 'Wednesday · Roast Crispy Skin (400°F)',
            text: 'Heat oven to 400°F. Spread turkey skin flat in a single layer on a parchment-lined rimmed baking sheet. Season generously with salt and pepper. Cover with a second sheet of parchment, press out air bubbles, and place a second rimmed baking sheet directly on top to keep it flat. Roast 25–35 minutes until deep golden brown and very crisp. Cool completely and store in an OPEN container at room temperature overnight.',
            timer: { label: 'Roast Turkey Skin', minutes: 30 }
          },
          {
            title: isBoneIn ? 'Wednesday · Fortified Stock (Instant Pot or Stovetop)' : 'Thursday 3:15 PM · Quick 10-Minute Gravy',
            text: isBoneIn
              ? 'Brown chopped breastbone, onion, carrot, and celery in 2 tsp oil on Instant Pot Sauté (or medium saucepan) for 6–8 minutes until deeply browned. Add 3 cups chicken stock, bay leaf, and ½ tsp soy sauce. Instant Pot: High Pressure 25 min + 10 min natural release (Stovetop: simmer 50 min). Strain through a fine-mesh strainer (you want ~2¼ cups stock; top up with water/stock if needed) and refrigerate overnight.'
              : 'Melt 2 tbsp butter in a medium saucepan over medium heat. Whisk in 2½ tbsp flour and cook, stirring constantly, until golden blond (~3 min). Slowly whisk in 2 cups chicken stock, ½ tsp soy sauce, and a thyme sprig. Simmer 8–10 minutes until glossy and thick; stir in 2–3 tbsp strained bag juices once the turkey is unbagged. Season to taste.',
            timer: isBoneIn ? { label: 'Instant Pot Stock', minutes: 25 } : null
          },
          {
            title: `Thursday 12:30 PM · Sous Vide Bath (${temp}°F)`,
            text: `Preheat sous vide water bath to ${temp}°F (${temp === '145' ? '63°C — ultra-moist, tender, faint pink hue' : '65.5°C — pure white, tender, still vastly juicier than roasted'}). Slowly lower the open bag into the water to push out air, seal above the waterline, and cook at least 2.5 hours (safe to hold up to 4 hours until dinner).`,
            timer: { label: `Sous Vide Turkey (${temp}°F)`, minutes: 150 }
          },
          {
            title: isBoneIn ? 'Thursday 3:15 PM · Finish Roux & Gravy' : 'Thursday 3:50 PM · Re-Crisp Skin & Slice',
            text: isBoneIn
              ? 'Melt 2 tbsp butter in a medium saucepan over medium heat. Add 2½ tbsp flour and stir constantly for 3 minutes until golden. Whisking steadily, pour in your fortified stock in a thin stream. Bring to a boil, reduce to a simmer, and cook 8–10 minutes until thick enough to coat a spoon (~1.75–2 cups). Season with salt and pepper and keep warm.'
              : 'Slide the cooled roasted turkey skin into the Toaster Oven at 350°F for 2–3 minutes to re-crisp. Remove turkey from sous vide bag, snip twine, pat surface dry with paper towels, slice into smooth ½-inch medallions, fan on a warmed platter, and top with shattered crispy skin.',
            timer: isBoneIn ? null : { label: 'Re-Crisp Skin', minutes: 3 }
          },
          ...(isBoneIn ? [{
            title: 'Thursday 3:50 PM · Re-Crisp Skin, Carve & Serve',
            text: 'Re-crisp the turkey skin in the Toaster Oven at 350°F for 2–3 minutes. Remove turkey from sous vide bag (optionally strain 2 tbsp bag juices into gravy), remove twine, pat dry, and slice into smooth ½-inch medallions on a cutting board. Fan onto a warmed platter with broken shards of crispy skin alongside the hot gravy boat.',
            timer: { label: 'Re-Crisp Skin', minutes: 3 }
          }] : [])
        ]
      },

      {
        id: 'stuffing',
        kicker: 'The Essential Side · Smitten Kitchen',
        title: 'Challah Stuffing With Leeks and Celery',
        byline: 'Adapted from Deb Perelman · Zero-Waste Store-Bought Loaf Option',
        sourceUrl: 'https://smittenkitchen.com/2019/11/challah-stuffing/',
        sourceName: 'Smitten Kitchen',
        specs: [
          { label: 'Yield', value: isScaledStuffing ? '6–8 servings (8×8 / 2-qt dish)' : '12 servings (9×13 dish)' },
          { label: 'Stage 1 (Wed)', value: '350°F covered · 20 min' },
          { label: 'Crisp (Thu)', value: '425°F uncovered · 20 min' }
        ],
        controls: [
          {
            key: 'stuffingScale',
            label: 'Batch Size',
            options: [
              { value: 'two-thirds', label: '1-lb Loaf (2/3x · Recommended)' },
              { value: 'full', label: '1.5-lb Loaf (Full 1x)' }
            ]
          }
        ],
        modifications: [
          '<strong>1-lb Store-Bought Loaf Scaling (2/3 Batch):</strong> Grocery challah almost always comes in <strong>1-lb loaves</strong>, and the original 9×13 batch serves 12—huge next to a 3-lb half turkey breast! Scaling to 2/3 uses one entire 1-lb loaf with zero leftover bread scraps and fits an 8×8 or 2-quart dish.',
          '<strong>Broth Caution for Store-Bought Challah:</strong> Bakery challah is often airier than homemade. Pour broth gradually and hold back the last ¼ cup if the cubes already feel soaked through.',
          '<strong>Simplicity Swaps:</strong> Yellow onion works 1:1 in place of leeks (skips washing gritty leek layers). Baking Stage 1 (foil-on) Wednesday evening keeps Thursday’s stovetop clean with zero loss in crispness.'
        ],
        ingredientGroups: [
          {
            title: isScaledStuffing ? '2/3 Batch Ingredients (1-lb Loaf · 8×8 Pan)' : 'Full Original Batch (1.5-lb Loaf · 9×13 Pan)',
            items: isScaledStuffing
              ? [
                  '1 lb challah bread (1 standard store-bought loaf), cut into generous 1-inch cubes and dried',
                  '5½ tbsp unsalted butter (divided: 1½ tbsp for sautéing + 4 tbsp melted for final drizzle), plus extra for greasing pan',
                  '1⅓ cups small-diced celery (about 2 large ribs)',
                  '1⅓ cups small-diced leeks (1–2 medium) OR ⅔ large yellow onion',
                  '2 tsp EACH minced fresh rosemary, sage, and thyme',
                  '⅓ cup packed chopped flat-leaf parsley',
                  '1¼ tsp kosher salt (divided)',
                  '¾ tsp coarsely ground black pepper (divided)',
                  '1¾ to 2 cups vegetable, chicken, or turkey broth (pour gradually!)'
                ]
              : [
                  '1.5 lbs challah bread, cut into generous 1-inch cubes and dried',
                  '½ cup (8 tbsp) unsalted butter (divided: 2 tbsp for sautéing + 6 tbsp melted for final drizzle), plus extra for greasing pan',
                  '2 cups small-diced celery (about 3 large ribs)',
                  '2 cups small-diced leeks (about 2 large) OR 1 large yellow onion',
                  '1 tbsp EACH minced fresh rosemary, sage, and thyme',
                  '½ cup packed chopped flat-leaf parsley',
                  '2 tsp kosher salt (divided)',
                  '1 tsp coarsely ground black pepper (divided)',
                  '2½ to 3 cups vegetable, chicken, or turkey broth (pour gradually!)'
                ]
          }
        ],
        steps: [
          {
            title: 'Dry the Bread Cubes (Tuesday Night or Wednesday 5:30 PM)',
            text: 'Cut challah into generous 1-inch cubes (cubes hold better texture than torn pieces). Air-dry loosely piled on a sheet pan or baking dish overnight, OR spread on a baking sheet and dry in a 300°F oven for 15 minutes until firm to the touch but not browned.'
          },
          {
            title: 'Wednesday 6:35 PM · Sauté Aromatics & Butter the Dish',
            text: `Heat oven to 350°F. Generously butter a ${isScaledStuffing ? '8×8-inch or 2-quart' : '9×13-inch'} baking dish (don’t forget—challah sticks without it!) and add the dried bread cubes. In a large skillet over medium heat, melt ${isScaledStuffing ? '1½ tbsp' : '2 tbsp'} butter. Add celery, leeks/onion, and half the salt and pepper. Cook, stirring occasionally, until tender and sweet (~10 minutes). Add rosemary, sage, and thyme; cook 1 minute more.`
          },
          {
            title: 'Wednesday · Toss & Stage-1 Bake (Foil-On)',
            text: `Scatter sautéed vegetables and fresh parsley over the challah cubes and toss gently with your hands so aromatics distribute evenly without all sinking to the bottom. Stir remaining salt and pepper into the broth (less salt if broth is salty) and pour gradually over the challah—challah absorbs fast so no soaking is needed. Cover tightly with foil and bake at 350°F for 20 minutes. Cool 20 min and refrigerate covered.`,
            timer: { label: 'Stuffing Stage-1 Bake', minutes: 20 }
          },
          {
            title: 'Thursday 3:30 PM · Butter Drizzle & 425°F Crisp',
            text: `Pull stuffing from fridge at 3:00 PM and remove foil. Preheat oven to 425°F. Drizzle the remaining ${isScaledStuffing ? '4 tbsp' : '6 tbsp'} melted butter (plus any saved turkey skin schmaltz!) evenly across the top. Bake uncovered for 20 minutes until piping hot throughout and deeply browned and crisp on the top edges.`,
            timer: { label: 'Stuffing Final Crisp', minutes: 20 }
          }
        ]
      },

      {
        id: 'brussels',
        kicker: 'The Crisp Green Side · NYT Cooking',
        title: 'Air-Fryer Brussels Sprouts With Garlic, Balsamic and Soy',
        byline: 'Adapted from Melissa Clark · Small Circular Air-Fryer Two-Batch Method',
        sourceUrl: 'https://cooking.nytimes.com/recipes/1020126-air-fryer-brussels-sprouts-with-garlic-balsamic-and-soy',
        sourceName: 'NYT Cooking',
        specs: [
          { label: 'Yield', value: '3–4 servings (your 1 lb trimmed)' },
          { label: 'Air Fryer', value: '400°F · 2 batches + 3m finish' },
          { label: 'Glaze', value: 'Stovetop · 2–3 min' }
        ],
        controls: [],
        modifications: [
          '<strong>Small Circular Air Fryer Crowding Fix:</strong> Packing 1 full pound into a small circular basket causes steaming instead of charring. Cook in <strong>two ½-lb batches (13 min each)</strong>, then combine BOTH batches back in the basket with the thinly sliced garlic for a <strong>3-minute final blast</strong> so everything hits the platter blazing hot and crisp.',
          '<strong>Ingredient Synergy:</strong> Uses the same fresh <strong>limes</strong> you already have for the mocktails and the same <strong>soy sauce</strong> from the turkey gravy—zero extra specialty items.',
          '<strong>Seasoning Note:</strong> Original calls for ¼ tsp kosher salt for 1 lb sprouts, which leans mild; bump to <strong>½ tsp kosher salt</strong> (or finish with flaky salt) for sharper restaurant-style seasoning.'
        ],
        ingredientGroups: [
          {
            title: 'Exact 1-lb Ingredients',
            items: [
              '1 lb trimmed Brussels sprouts, halved through stems (quarter any extra-large sprouts)',
              '3 tbsp extra-virgin olive oil (divided: 1 tbsp for sprouts + 2 tbsp for dressing)',
              '¼ to ½ tsp kosher salt',
              '2 garlic cloves, thinly sliced',
              '¼ cup balsamic vinegar',
              '1 tsp fresh lime juice, plus extra lime wedges for serving',
              '½ tsp soy sauce'
            ]
          }
        ],
        steps: [
          {
            title: 'Wednesday Night Prep (5 Minutes)',
            text: 'Since your sprouts are already trimmed, simply halve them lengthwise through the stem (quarter large ones for uniform sizing). Pat completely dry and store in a zip-top bag with a dry paper towel. Thinly slice the 2 garlic cloves and wrap tightly.'
          },
          {
            title: 'Thursday 3:15 PM · Air-Fry Batch 1 (400°F)',
            text: 'Preheat your small circular air fryer to 400°F (if required). In a bowl, toss all 1 lb Brussels sprouts with 1 tbsp olive oil and ¼–½ tsp kosher salt. Add HALF the sprouts to the basket in an uncrowded layer and air-fry 13 minutes, shaking the basket halfway through.',
            timer: { label: 'Brussels Batch 1', minutes: 13 }
          },
          {
            title: 'Thursday 3:32 PM · Air-Fry Batch 2 & Simmer Balsamic Glaze',
            text: 'Transfer Batch 1 to a bowl. Add the second half of the sprouts to the 400°F air fryer for 13 minutes, shaking halfway. Meanwhile, bring ¼ cup balsamic vinegar to a simmer in a small saucepan over medium-low heat. Simmer 2–3 minutes until thickened and syrupy—watch constantly so it doesn’t burn! Remove from heat and whisk in remaining 2 tbsp olive oil, 1 tsp lime juice, and ½ tsp soy sauce.',
            timer: { label: 'Brussels Batch 2', minutes: 13 }
          },
          {
            title: 'Thursday 3:48 PM · Joint Garlic Flash-Crisp & Dress',
            text: 'Return Batch 1 into the air fryer basket with Batch 2. Scatter the thinly sliced garlic evenly on top and air-fry 3–4 minutes until garlic chips are golden brown and all sprouts are sizzling hot. Transfer to a serving platter, drizzle with balsamic-soy-lime dressing, and squeeze fresh lime over top right before serving.',
            timer: { label: 'Garlic Finish', minutes: 3 }
          }
        ]
      },

      {
        id: 'crumble',
        kicker: 'The Grand Finale · NYT Cooking',
        title: 'Mixed-Apple Oat & Pecan Crumble',
        byline: 'Adapted from Samantha Seneviratne · Scaled to Your 6 Apples + Caramel Pairing',
        sourceUrl: 'https://cooking.nytimes.com/recipes/1018638-apple-crumble',
        sourceName: 'NYT Cooking',
        specs: [
          { label: 'Yield', value: isScaledCrumble ? '6–8 servings (9×9 or 10" skillet)' : '8–10 servings (9×13 pan)' },
          { label: 'Bake', value: '350°F · 50–55 min (at 1:30 PM)' },
          { label: 'Service', value: 'Warm w/ Caramel & Vanilla Ice Cream' }
        ],
        controls: [
          {
            key: 'crumbleScale',
            label: 'Apple Batch',
            options: [
              { value: 'three-quarters', label: '6 Apples (3/4x · Recommended)' },
              { value: 'full', label: '8 Apples (Original 1x)' }
            ]
          }
        ],
        modifications: [
          '<strong>Scaled to Your Exact 6 Apples (75% Batch):</strong> Your blend—<strong>2 Granny Smith</strong> (tart/firm), <strong>2 Golden Delicious</strong> (sweet/saucy), and <strong>2 Pink Lady</strong> (crisp/aromatic)—is an ideal ~2.5 lb trio. Original uses 3.5 lbs (~8 apples) in a 9×13 pan. Scaling to 3/4 in a <strong>9×9 dish or 10-inch cast-iron skillet</strong> preserves the deep, juicy apple-to-crumble ratio (and leaves your 9×13 pan free if needed!).',
          '<strong>Sugar Adjusted for Homemade Caramel & Ice Cream:</strong> Because Golden Delicious and Pink Lady are naturally sweet—and you’re topping bowls with <strong>homemade caramel + vanilla ice cream</strong>—we trimmed the apple-filling brown sugar from 6 tbsp down to <strong>¼ cup</strong> while keeping the full topping sugar so the clumps stay crisp.',
          '<strong>Wednesday Topping + Early Thursday Bake:</strong> Mix and chill the streusel Wednesday night (cold clumps bake crisper!). Bake Thursday at <strong>1:30 PM</strong> so it finishes before the dinner rush, thickens as it rests, and simply rewarms for 10 min after dinner.'
        ],
        ingredientGroups: [
          {
            title: isScaledCrumble ? 'For the Crumble Topping (3/4 Batch · Make Wed)' : 'For the Crumble Topping (Full Original)',
            items: isScaledCrumble
              ? [
                  '9 tbsp (128g) unsalted butter, melted, plus extra for buttering dish',
                  '1 cup + 2 tbsp (135g) all-purpose flour',
                  '¾ cup (150g) packed dark brown sugar',
                  '¾ cup (60g) old-fashioned rolled oats',
                  '¾ cup (85g) pecans (or walnuts), coarsely chopped (optional)',
                  '¾ tsp kosher salt'
                ]
              : [
                  '12 tbsp (170g) unsalted butter, melted, plus extra for buttering dish',
                  '1½ cups (180g) all-purpose flour',
                  '1 cup (200g) packed dark brown sugar',
                  '1 cup (80g) old-fashioned rolled oats',
                  '1 cup (113g) pecans, coarsely chopped (optional)',
                  '1 tsp kosher salt'
                ]
          },
          {
            title: isScaledCrumble ? 'For Your 6-Apple Filling + Serving' : 'For the 8-Apple Filling + Serving',
            items: isScaledCrumble
              ? [
                  '6 apples (~2.5 lbs): 2 Granny Smith, 2 Golden Delicious, 2 Pink Lady — peeled, cored, cut into ½-inch wedges',
                  '¼ cup (50g) packed dark brown sugar (dialed back for caramel!)',
                  '2¼ tsp ground cinnamon',
                  '1½ tbsp fresh lemon juice',
                  'For serving: Homemade caramel sauce (warmed 25 sec) + vanilla ice cream'
                ]
              : [
                  '3½ lbs mixed apples (~8 medium), peeled, cored, cut into ½-inch wedges',
                  '½ cup (100g) packed dark brown sugar',
                  '1 tbsp ground cinnamon',
                  '2 tbsp fresh lemon juice',
                  'For serving: Homemade caramel sauce (warmed 25 sec) + vanilla ice cream'
                ]
          }
        ],
        steps: [
          {
            title: 'Wednesday 6:15 PM · Make & Chill the Crumble Topping',
            text: `In a medium bowl, stir together the flour, topping dark brown sugar (${isScaledCrumble ? '¾ cup' : '1 cup'}), rolled oats, chopped pecans, and kosher salt. Pour in the melted butter and stir with a fork until evenly moistened. Cover and refrigerate overnight—chilling firms the butter into bakery-style clumps.`
          },
          {
            title: 'Thursday 1:00 PM · Slice & Season the 6 Apples',
            text: `Preheat oven to 350°F and butter a ${isScaledCrumble ? '9×9-inch baking dish or 10-inch skillet' : '9×13-inch baking dish'}. Peel, core, and cut the Granny Smith, Golden Delicious, and Pink Lady apples into ½-inch wedges. Toss directly in the buttered dish with the filling brown sugar (${isScaledCrumble ? '¼ cup' : '½ cup'}), ground cinnamon, and lemon juice; spread into an even layer.`
          },
          {
            title: 'Thursday 1:30 PM · Top & Bake Until Bubbling',
            text: 'Press handfuls of the chilled crumble mixture together to form clumps of varying sizes and scatter evenly over the apples. Bake at 350°F for 50–55 minutes until apples are knife-tender, juices bubble thickly, and the topping is deep golden brown. Cool uncovered on a wire rack so the juices set and the topping stays crisp.',
            timer: { label: 'Apple Crumble Bake', minutes: 50 }
          },
          {
            title: 'Thursday 4:45 PM · Rewarm & Crown With Caramel + Ice Cream',
            text: 'Warm the crumble in a 300°F oven for 10 minutes (or microwave individual servings for 25 seconds). Gently warm your homemade caramel sauce in the microwave in 15-second bursts (20–30 sec total) until spoonable. Top warm crumble with a scoop of cold vanilla ice cream and a generous drizzle of caramel.',
            timer: { label: 'Rewarm Crumble', minutes: 10 }
          }
        ]
      }
    ];
  },

  supportingCast: [
    {
      id: 'mocktail',
      title: 'Cranberry-Ginger Lime Mocktail',
      timing: 'Chill Wed · Self-Serve Bar at 1:40 PM',
      copy: 'Per glass over plenty of ice: <strong>3 oz chilled cranberry juice</strong> + <strong>4 oz chilled ginger beer</strong> + <strong>½ oz fresh lime juice</strong> (1–2 squeezed wedges). Garnish with a lime wheel and an extra sprig of fresh rosemary from the stuffing herbs. Set up a self-serve station so guests pour their own while you cook.'
    },
    {
      id: 'snack-board',
      title: 'Meat, Cheese & Crackers Board',
      timing: 'Pull Cheese 1:00 PM · Serve 2:00 PM',
      copy: 'Pull cheeses out of the fridge <strong>1 hour before serving</strong>—cold cheese mutes flavor and texture. Let your partner (or take 10 calm minutes at 1:40 PM while the crumble bakes) arrange meats, cheeses, and crackers to keep everyone happily grazing until 4:00 PM.'
    },
    {
      id: 'cranberry-sauce',
      title: 'Whole-Berry Canned Cranberry Sauce',
      timing: 'Chill Wed · Bowl at 3:00 PM',
      copy: 'Chill the can overnight. At 3:00 PM, spoon into a serving bowl and give it a gentle fork stir to loosen (or leave classic!). <em>Optional 5-second chef upgrade:</em> grate a tiny whisper of fresh lime zest (or lemon zest from the crumble) over the top to echo the mocktail and Brussels sprouts.'
    },
    {
      id: 'rolls',
      title: 'Warm Dinner Rolls',
      timing: '3:50 PM · Residual Oven (4–5 Min)',
      copy: 'Set butter out at 3:00 PM to soften. At 3:50 PM—right when the stuffing leaves the 425°F oven and you turn the oven <strong>OFF</strong>—slide rolls loosely tented in foil onto the middle rack for 4–5 minutes. Residual heat warms them pillowy-soft with zero risk of scorching and zero appliance conflict.'
    }
  ],

  appliances: [
    {
      name: 'Sous Vide Circulator',
      status: 'Primary Protein · Hands-Off',
      standby: false,
      slots: [
        { time: 'Thu 12:30 PM', title: 'Preheat Bath', detail: '145°F (or 150°F) water bath' },
        { time: 'Thu 12:45–3:51', title: '3-lb Half Turkey Breast', detail: '2.5 hr min cook, holds safely through 4:00 PM' }
      ],
      note: 'Completely liberates your oven on Thanksgiving Day and eliminates dry turkey breast.'
    },
    {
      name: 'Main Oven (w/ Air Fry)',
      status: 'Zero Conflicts · Staggered',
      standby: false,
      slots: [
        { time: 'Wed 5:30 PM', title: 'Dry Challah (Optional)', detail: '300°F · 15 min if not air-dried' },
        { time: 'Wed 6:00 PM', title: 'Crispy Turkey Skin', detail: '400°F · 25–35 min between sheet pans' },
        { time: 'Wed 6:35 PM', title: 'Stuffing Stage 1 (Foil-On)', detail: '350°F · 20 min, then chill overnight' },
        { time: 'Thu 1:30–2:25', title: 'Apple Crumble', detail: '350°F · 50–55 min (early bake!)' },
        { time: 'Thu 3:30–3:50', title: 'Stuffing Final Crisp', detail: '425°F uncovered · 20 min w/ melted butter' },
        { time: 'Thu 3:50–3:55', title: 'Dinner Rolls (Oven OFF)', detail: 'Residual heat warms rolls softly in 4–5 min' },
        { time: 'Thu 4:45 PM', title: 'Rewarm Apple Crumble', detail: '300°F · 10 min before dessert' }
      ],
      note: 'Notice every oven temperature transitions cleanly—never two dishes fighting for different temps at once!'
    },
    {
      name: 'Small Circular Air Fryer',
      status: 'Final 45-Min Star',
      standby: false,
      slots: [
        { time: 'Thu 3:15–3:28', title: 'Brussels Sprouts Batch 1', detail: '400°F · ½ lb, shake at 6 min' },
        { time: 'Thu 3:32–3:45', title: 'Brussels Sprouts Batch 2', detail: '400°F · ½ lb, shake at 6 min' },
        { time: 'Thu 3:48–3:52', title: 'Joint Batch + Sliced Garlic', detail: '400°F · Reunite both batches + garlic 3–4 min' }
      ],
      note: 'Two uncrowded batches prevent soggy steamed sprouts in a compact circular basket; the 3-min joint finish makes all 1 lb scorching hot together.'
    },
    {
      name: '4-Burner Stovetop',
      status: 'Light Duty · Max 2 Burners',
      standby: false,
      slots: [
        { time: 'Wed 6:35 PM', title: 'Burner 1: Stuffing Veg', detail: 'Sauté celery, leeks/onion & herbs (~11 min)' },
        { time: 'Thu 3:15–3:55', title: 'Burner 1: Turkey Gravy', detail: 'Roux + fortified stock simmer, hold on low' },
        { time: 'Thu 3:35–3:40', title: 'Burner 2: Balsamic Glaze', detail: 'Simmer ¼ cup balsamic 2–3 min until syrupy' }
      ],
      note: 'At peak crunch time (3:35 PM), you only ever need 2 of your 4 burners!'
    },
    {
      name: 'Toaster Oven',
      status: '3:50 PM Secret Weapon',
      standby: false,
      slots: [
        { time: 'Thu 3:50–3:53', title: 'Re-Crisp Turkey Skin', detail: '350°F · 2–3 min to restore shattering crunch' }
      ],
      note: 'Keeps the skin out of the busy main oven so rolls and skin finish simultaneously.'
    },
    {
      name: 'Microwave',
      status: 'Quick Utility',
      standby: false,
      slots: [
        { time: 'Wed 6:15 PM', title: 'Melt Crumble Butter', detail: '9 tbsp unsalted butter (~40 sec)' },
        { time: 'Thu 3:05 PM', title: 'Melt Stuffing Drizzle Butter', detail: '4 tbsp unsalted butter (~35 sec)' },
        { time: 'Thu 4:50 PM', title: 'Warm Homemade Caramel', detail: '20–30 sec until glossy & pourable' }
      ],
      note: 'Saves 3 extra dirty butter-melting saucepans.'
    },
    {
      name: 'Instant Pot & Slow Cooker',
      status: 'Smart Helpers / Standby',
      standby: true,
      slots: [
        { time: 'Wed 6:05 PM', title: 'Instant Pot: Fortified Stock', detail: 'Sauté bone + veg, then 25 min High Pressure (if bone-in)' },
        { time: 'Thu 3:30–4:00', title: 'Slow Cooker (Optional)', detail: 'Set to WARM to hold finished gravy if you want Burner 1 clear' }
      ],
      note: 'Optional boosters—keeping them in reserve means zero kitchen clutter if you don’t need them.'
    }
  ],

  editorialNotes: [
    {
      kicker: 'Portion Calibration · Turkey',
      title: 'Tailored for Your 3-lb Half Turkey Breast',
      body: 'Kenji’s Serious Eats recipe assumes a whole 5-lb double breast tied jigsaw-style. With one 3-lb half breast, simply peel the skin in one sheet, debone, fold the thin tail slightly under, and tie loosely with 2–3 strings. Cook at 145°F (ultra-juicy) or 150°F (classic white) for 2.5–3.5 hours, and check the smaller skin sheet early at 25 minutes.'
    },
    {
      kicker: 'Zero-Waste Scaling · Stuffing',
      title: 'Why a 2/3 Stuffing Batch Beats a Full 9×13',
      body: 'Smitten Kitchen’s full recipe uses 1.5 lbs challah and serves 12—overkill next to a 3-lb half breast, and store-bought challah almost always weighs 1 lb. Scaling to 2/3 uses one entire 1-lb loaf cleanly in an 8×8 or 2-quart pan (6–8 generous servings). Want huge leftovers? Flip the scale toggle in Recipes back to Full 1x.'
    },
    {
      kicker: 'Appliance Strategy · Brussels Sprouts',
      title: 'Beating Small Circular Air-Fryer Crowding',
      body: 'A full pound of halved Brussels sprouts piled deep in a small circular basket steams instead of crisping. Cooking two uncrowded ½-lb batches (13 min each) and then tossing both back together with the sliced garlic for a 3-minute blast guarantees charred edges and scorching-hot sprouts right at 3:55 PM.'
    },
    {
      kicker: 'Flavor Balance · Apple Crumble',
      title: '6-Apple 3/4 Scaling + Caramel Sugar Trim',
      body: 'Your 2 Granny Smith, 2 Golden Delicious, and 2 Pink Lady apples (~2.5 lbs) are an ideal baking trio, fitting a 9×9 dish or 10-inch skillet at 75% of NYT’s 8-apple recipe. Because you’re finishing with homemade caramel and vanilla ice cream, we trimmed the apple-filling brown sugar to ¼ cup so the tart apples stay bright.'
    },
    {
      kicker: 'Stress Reduction · Wednesday Night',
      title: 'The 75-Minute Wednesday Head Start',
      body: 'Four high-impact tasks lose zero quality when done Wednesday night: (1) dry-brining & bagging the turkey, (2) roasting the flat crispy skin (re-crisps in 3 min in your toaster oven!), (3) making Instant Pot fortified stock, and (4) baking Stage 1 of the stuffing + chilling the crumble streusel.'
    },
    {
      kicker: 'Crew Flexibility · Solo or +Partner',
      title: 'Built to Run Solo—Or Split Instantly',
      body: 'Toggle “+ Partner” in the top bar if your partner jumps in. Delegatable prep (challah cubing, crumble topping, apple peeling, snack board, mocktail bar, rolls, and table setting) lights up with an ochre PARTNER stamp—so a helper can open this page on their own phone and help immediately without asking.'
    }
  ],

  pantryChecklist: [
    {
      group: 'Turkey & Gravy',
      items: [
        '3-lb half turkey breast (thawed!)',
        'Kitchen twine & gallon heavy-duty zip-top bag',
        'Parchment paper + 2 rimmed baking sheets',
        'Low-sodium chicken stock (3 cups for gravy + 2–3 cups for stuffing = 2 cartons)',
        '1 onion, 1 carrot, 1 bay leaf (if bone-in gravy)',
        'Soy sauce (used in BOTH gravy & Brussels sprouts)',
        'All-purpose flour & unsalted butter'
      ]
    },
    {
      group: 'Challah Stuffing',
      items: [
        '1 lb store-bought challah loaf (or 1.5 lb for full batch)',
        'Celery (2–3 large ribs + 1 rib for gravy)',
        'Leeks (2) OR 1 large yellow onion',
        'Fresh rosemary, sage, thyme & flat-leaf parsley',
        'Unsalted butter (at least 3 sticks total across stuffing, crumble, gravy & rolls)',
        'Heavy-duty aluminum foil'
      ]
    },
    {
      group: 'Brussels Sprouts & Mocktails',
      items: [
        '1 lb trimmed Brussels sprouts',
        '2 cloves garlic',
        'Balsamic vinegar (¼ cup) & extra-virgin olive oil',
        'Fresh limes (3–4 limes covers BOTH Brussels sprouts & mocktails!)',
        'Ginger beer & cranberry juice (chill Wed night!)',
        'Plenty of ice'
      ]
    },
    {
      group: 'Apple Crumble, Dessert & Supporting Cast',
      items: [
        '6 apples: 2 Granny Smith, 2 Golden Delicious, 2 Pink Lady',
        '1 lemon (1½ tbsp juice for apples)',
        'Dark brown sugar, old-fashioned rolled oats, ground cinnamon',
        'Pecans (¾ cup, optional)',
        'Homemade caramel sauce & vanilla ice cream',
        'Dinner rolls & store-bought whole berry canned cranberry sauce',
        'Meat, cheese & crackers for 2:00 PM snack board'
      ]
    }
  ]
};
