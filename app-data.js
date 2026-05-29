/* Grasp it! — mock content. Plain JS, assigns to window.GRASP. */
(function () {
  const yt = (q) => 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q);

  const goals = [
    {
      id: 'strength', name: 'Strength', tagline: 'Build raw power',
      desc: 'Barbell-driven sessions on % of your 1RM.',
      accent: '#FF453A', soft: '#FFEDEC', softDark: 'rgba(255,69,58,0.16)', icon: 'barbell',
    },
    {
      id: 'aerobic', name: 'Aerobic endurance', tagline: 'An engine for days',
      desc: 'Zone 2 base into threshold into intervals.',
      accent: '#0A84FF', soft: '#E6F1FF', softDark: 'rgba(10,132,255,0.18)', icon: 'pulse',
    },
    {
      id: 'gymnastics', name: 'Gymnastics', tagline: 'Own your bodyweight',
      desc: 'Skill progressions, control and positions.',
      accent: '#7C5CFC', soft: '#EEEAFF', softDark: 'rgba(124,92,252,0.18)', icon: 'rings',
    },
  ];

  const prefChips = ['Running', 'Rowing', 'Echo bike', 'Swimming', 'Kettlebell', 'Barbell', 'Dumbbell', 'Pull-ups', 'Double-unders', 'Wall balls', 'Box jumps'];
  const dislikeChips = ['No running', 'No heavy squats', 'No pull-ups', 'No double-unders', 'No overhead', 'No barbell', 'No rowing', 'No box jumps'];

  /* Famous benchmark WODs — tiers rendered as ranked medal chips (no emoji). */
  const wods = {
    cindy: {
      name: 'Cindy', tag: 'The Girls', format: 'AMRAP 20 min', cap: '20:00',
      structure: ['5 pull-ups', '10 push-ups', '15 air squats', '— as many rounds as possible —'],
      rx: 'Bodyweight only',
      desc: 'A 20-minute bodyweight grind. The trap is going out too hot in the first five minutes — settle into a rhythm you can hold for the full clock.',
      tiers: [
        { rank: 1, tier: 'Elite', who: 'Top athletes', score: '25+ rounds' },
        { rank: 2, tier: 'Intermediate', who: 'Solid amateur', score: '18 – 22 rounds' },
        { rank: 3, tier: 'Amateur', who: 'Getting started', score: '10 – 15 rounds' },
      ],
      video: yt('cindy crossfit workout'),
    },
    helen: {
      name: 'Helen', tag: 'The Girls', format: '3 rounds for time', cap: '12:00',
      structure: ['400 m run', '21 kettlebell swings · 24/16 kg', '12 pull-ups'],
      rx: '24/16 kg KB · strict-to-kipping pull-ups',
      desc: 'A fast classic triplet that punishes pacing mistakes. Hold the swings unbroken and run the 400s with intent — three rounds is over before it begins.',
      tiers: [
        { rank: 1, tier: 'Elite', who: 'Top athletes', score: '< 8:00' },
        { rank: 2, tier: 'Intermediate', who: 'Solid amateur', score: '10:00 – 12:00' },
        { rank: 3, tier: 'Amateur', who: 'Getting started', score: '14:00 – 16:00' },
      ],
      video: yt('helen crossfit workout'),
    },
    fgb: {
      name: 'Fight Gone Bad', tag: 'Benchmark', format: '3 rounds · 1 min stations', cap: '17:00',
      structure: ['Wall ball · 9/6 kg', 'Sumo deadlift high-pull · 35/25 kg', 'Box jump · 50 cm', 'Push press · 35/25 kg', 'Row (calories)', '— 1 min each, 1 min rest between rounds —'],
      rx: 'Score = total reps + calories',
      desc: 'Five stations, one minute each, three rounds. The whole game is transitions — every second you stand still is a rep you lose. Count every rep out loud.',
      tiers: [
        { rank: 1, tier: 'Elite', who: 'Top athletes', score: '400+ reps' },
        { rank: 2, tier: 'Intermediate', who: 'Solid amateur', score: '300 – 360 reps' },
        { rank: 3, tier: 'Amateur', who: 'Getting started', score: '220 – 280 reps' },
      ],
      video: yt('fight gone bad crossfit'),
    },
    jackie: {
      name: 'Jackie', tag: 'Benchmark', format: 'For time', cap: '12:00',
      structure: ['1000 m row', '50 thrusters · 20/15 kg', '30 pull-ups'],
      rx: '20/15 kg barbell',
      desc: 'A sprint that lives and dies on the row split. Come off the rower with something left, break the thrusters smart, and keep the pull-ups moving.',
      tiers: [
        { rank: 1, tier: 'Elite', who: 'Top athletes', score: '< 6:00' },
        { rank: 2, tier: 'Intermediate', who: 'Solid amateur', score: '8:00 – 10:00' },
        { rank: 3, tier: 'Amateur', who: 'Getting started', score: '11:00 – 14:00' },
      ],
      video: yt('jackie crossfit workout'),
    },
    kelly: {
      name: 'Kelly', tag: 'Benchmark', format: '5 rounds for time', cap: '38:00',
      structure: ['400 m run', '30 box jumps · 60 cm', '30 wall balls · 9/6 kg'],
      rx: '60 cm box · 9/6 kg ball',
      desc: 'A long, grinding aerobic test. There is no sprinting Kelly — pick a pace on round one you would be willing to repeat five times, then hold it.',
      tiers: [
        { rank: 1, tier: 'Elite', who: 'Top athletes', score: '< 24:00' },
        { rank: 2, tier: 'Intermediate', who: 'Solid amateur', score: '30:00 – 34:00' },
        { rank: 3, tier: 'Amateur', who: 'Getting started', score: '36:00 – 42:00' },
      ],
      video: yt('kelly crossfit workout'),
    },
    fifty: {
      name: 'Filthy Fifty', tag: 'Benchmark', format: 'For time', cap: '35:00',
      structure: ['50 box jumps · 60 cm', '50 jumping pull-ups', '50 kettlebell swings · 16/12 kg', '50 walking lunges', '50 knees-to-elbows', '50 push press · 20/15 kg', '50 back extensions', '50 wall balls · 9/6 kg', '50 burpees', '50 double-unders'],
      rx: 'Ten movements, fifty reps each',
      desc: 'A peak-week monster — ten stations, fifty reps each, in order. Pure mental endurance. Break everything into manageable sets from rep one and never stop moving.',
      tiers: [
        { rank: 1, tier: 'Elite', who: 'Top athletes', score: '< 18:00' },
        { rank: 2, tier: 'Intermediate', who: 'Solid amateur', score: '24:00 – 28:00' },
        { rank: 3, tier: 'Amateur', who: 'Getting started', score: '32:00 – 38:00' },
      ],
      video: yt('filthy fifty crossfit'),
    },
  };

  /* 16-session Aerobic Endurance block. Four phases, logical progression. */
  const phases = {
    base: { name: 'Aerobic base', color: '#0A84FF' },
    thr: { name: 'Threshold', color: '#30B0C7' },
    int: { name: 'Intervals', color: '#FF9F0A' },
    peak: { name: 'Peak & test', color: '#FF453A' },
  };

  const plan = {
    goalId: 'aerobic',
    title: 'Aerobic Endurance',
    subtitle: '16 sessions · 4-phase build',
    weeks: 'Roughly 5–6 weeks at 3 sessions / week',
    prefs: ['Rowing', 'Kettlebell', 'Running'],
    dislikes: ['No heavy squats'],
    sessions: [
      {
        n: 1, phase: 'base', title: 'Long aerobic base', focus: 'Conversational pace, all-day engine',
        durationMin: 55, intensity: 2,
        warmup: ['5 min easy bike, gradually building', "World's greatest stretch — 5 reps/side", 'Leg swings & ankle rocks — 1 min'],
        primer: { label: 'Efficiency primer', note: 'Lock in mechanics before the volume', items: [
          { move: 'Row stroke drill', detail: '3 × 1 min — legs-only → arms-only → full stroke', link: yt('rowing technique stroke drill') },
          { move: 'Running drills', detail: 'A-skips + 4 × 20 m strides' },
        ]},
        wod: { format: 'Steady state', cap: '40:00', structure: ['40 min continuous at Zone 2', 'Alternate 5 min row / 5 min easy run', 'Nasal breathing the entire time'], notes: 'If you can’t hold a conversation, slow down. This is base mileage, not a workout.' },
        cooldown: ['5 min easy walk', 'Couch stretch — 2 min/side', 'Box breathing — 2 min'],
      },
      {
        n: 2, phase: 'base', title: 'Aerobic intervals', focus: 'Long intervals, short rest',
        durationMin: 50, intensity: 2,
        warmup: ['400 m easy row', 'Hip openers & T-spine rotations — 2 min', '3 × 30 s build on the bike'],
        primer: { label: 'Efficiency primer', note: 'Find a repeatable pace', items: [
          { move: 'Pace finder', detail: '4 × 250 m row @ goal pace, 1 min easy between' },
        ]},
        wod: { format: 'Intervals', cap: '32:00', structure: ['4 × (5 min row / 2 min easy spin)', 'Hold each 5 min split within 3 sec', 'Last interval should feel the same as the first'], notes: 'Consistency beats heroics. Negative-split only if it stays controlled.' },
        cooldown: ['400 m easy spin', 'Pigeon stretch — 90 s/side', 'Diaphragm breathing — 2 min'],
      },
      {
        n: 3, phase: 'base', title: 'Cindy — bodyweight engine', focus: 'Aerobic capacity, bodyweight',
        durationMin: 45, intensity: 3, famous: 'cindy',
        warmup: ['3 min jump rope, easy', 'Scap pull-ups & ring rows — 2 × 8', 'Air squats & push-up to down-dog — 2 rounds'],
        primer: { label: 'Skill primer', note: 'Grease the patterns you’ll repeat for 20 min', items: [
          { move: 'Pull-up efficiency', detail: 'Kip swing → 3 × 3 unbroken, smooth', link: yt('kipping pull up technique') },
        ]},
        wod: { format: 'AMRAP 20 min', name: 'Cindy', famous: 'cindy', cap: '20:00', structure: ['5 pull-ups', '10 push-ups', '15 air squats'], rx: 'Bodyweight', notes: 'Pace the first 5 min like it’s a warm-up. Score = rounds + reps.' },
        cooldown: ['400 m walk', 'Doorway pec stretch — 1 min/side', 'Child’s pose — 2 min'],
      },
      {
        n: 4, phase: 'base', title: 'Tempo run + carries', focus: 'Sustained tempo, posture under load',
        durationMin: 50, intensity: 3,
        warmup: ['5 min easy jog', 'Ankle & calf prep — 2 min', '4 × 20 m strides'],
        primer: { label: 'Strength primer', note: 'Posture for the engine', items: [
          { move: 'Suitcase carry', detail: '4 × 30 m/side, heavy KB, tall spine', link: yt('suitcase carry kettlebell') },
        ]},
        wod: { format: 'Tempo intervals', cap: '28:00', structure: ['5 × 800 m run @ tempo (comfortably hard)', '90 s walk between reps', 'Target even or descending splits'], notes: 'Tempo = you could speak in short sentences, not full ones.' },
        cooldown: ['5 min walk', 'Calf & hamstring stretch — 3 min', 'Legs up the wall — 2 min'],
      },
      {
        n: 5, phase: 'thr', title: 'Threshold row', focus: 'Lactate threshold, sustained',
        durationMin: 50, intensity: 4,
        warmup: ['750 m progressive row', 'Hip flexor mobilisation — 2 min', '3 × 20 s hard strokes'],
        primer: { label: 'Efficiency primer', note: 'Stroke rate discipline', items: [
          { move: 'Rate ladder', detail: 'Row 4 min at r20 → r24 → r28, 1 min each' },
        ]},
        wod: { format: 'Intervals', cap: '30:00', structure: ['3 × 2000 m row @ threshold', '3 min easy spin between', 'Hold splits within 2 sec across all three'], notes: 'Threshold pace is roughly your fastest sustainable-for-30-min effort.' },
        cooldown: ['500 m easy row', 'Seated forward fold — 2 min', 'Nasal-only breathing — 2 min'],
      },
      {
        n: 6, phase: 'thr', title: 'Kettlebell aerobic flow', focus: 'Muscular endurance under aerobic load',
        durationMin: 45, intensity: 3,
        warmup: ['3 min jump rope', 'KB halos & hip hinges — 2 min', 'Goblet squat to stand — 10 reps'],
        primer: { label: 'Skill primer', note: 'Hinge mechanics', items: [
          { move: 'KB swing tune-up', detail: '3 × 10 — snap the hips, float the bell', link: yt('kettlebell swing technique') },
        ]},
        wod: { format: 'EMOM 30 min', cap: '30:00', structure: ['Min 1 — 15 KB swings · 24/16 kg', 'Min 2 — 12 cal row', 'Min 3 — 40 s easy jog / walk', '— repeat ×10 —'], notes: 'Each minute should finish with 15–20 sec rest. If not, scale reps.' },
        cooldown: ['400 m walk', 'Thoracic extension over foam roller — 2 min', 'Forearm & grip stretch — 1 min'],
      },
      {
        n: 7, phase: 'thr', title: 'Fight Gone Bad', focus: 'Mixed-modal threshold',
        durationMin: 50, intensity: 4, famous: 'fgb',
        warmup: ['5 min bike, easy → moderate', 'Wall-ball squat + push press primer — 2 min', 'Box step-ups & hip openers — 2 min'],
        primer: { label: 'Skill primer', note: 'Rehearse the transitions', items: [
          { move: 'Station walk-through', detail: '30 s easy at each of the 5 stations', link: yt('wall ball technique crossfit') },
        ]},
        wod: { format: '3 rounds · 1 min stations', name: 'Fight Gone Bad', famous: 'fgb', cap: '17:00', structure: ['Wall ball · SDHP · box jump · push press · row', '1 min each, 1 min rest between rounds'], rx: 'Score = total reps + cals', notes: 'Pick a number you can hit every station and chase it. Transitions are free reps.' },
        cooldown: ['5 min easy spin', 'Quad & hip-flexor stretch — 3 min', 'Box breathing — 2 min'],
      },
      {
        n: 8, phase: 'thr', title: 'Long threshold run', focus: 'Sustained tempo, single piece',
        durationMin: 55, intensity: 4,
        warmup: ['8 min easy jog', 'Dynamic leg swings — 2 min', '4 × strides building to tempo'],
        primer: { label: 'Efficiency primer', note: 'Cadence check', items: [
          { move: 'Cadence run', detail: '3 × 1 min at 175–180 spm, easy effort' },
        ]},
        wod: { format: 'Tempo', cap: '30:00', structure: ['30 min continuous run at threshold', 'Settle in by minute 5 and hold', 'Even effort, not even pace, on hills'], notes: 'One unbroken piece — the discipline is not speeding up.' },
        cooldown: ['5 min walk', 'Calf, hamstring & glute stretch — 4 min', 'Legs up the wall — 3 min'],
      },
      {
        n: 9, phase: 'thr', title: 'Threshold mix & match', focus: 'Two modalities at threshold',
        durationMin: 48, intensity: 4,
        warmup: ['500 m row + 400 m jog easy', 'Full-body dynamic flow — 3 min'],
        primer: { label: 'Efficiency primer', note: 'Transition speed', items: [
          { move: 'Row-to-run', detail: '2 × (250 m row → 200 m run), brisk transition' },
        ]},
        wod: { format: 'For time', cap: '26:00', structure: ['3 rounds:', '1000 m row', '800 m run', 'hold threshold, walk 60 s between rounds'], notes: 'A controlled grind. The clock matters, but even splits matter more.' },
        cooldown: ['400 m walk', 'Pigeon & couch stretch — 3 min', 'Diaphragm breathing — 2 min'],
      },
      {
        n: 10, phase: 'int', title: 'Jackie — sprint engine', focus: 'High-end aerobic power',
        durationMin: 40, intensity: 5, famous: 'jackie',
        warmup: ['750 m progressive row', 'Empty-bar thruster primer — 2 × 10', 'Pull-up kip swings — 2 × 8'],
        primer: { label: 'Skill primer', note: 'Cycle the barbell smoothly', items: [
          { move: 'Thruster rhythm', detail: '3 × 8 light, breathe at the top', link: yt('thruster technique crossfit') },
        ]},
        wod: { format: 'For time', name: 'Jackie', famous: 'jackie', cap: '12:00', structure: ['1000 m row', '50 thrusters · 20/15 kg', '30 pull-ups'], rx: '20/15 kg', notes: 'Row at 90% — leave a little for the barbell. Break thrusters before you fail.' },
        cooldown: ['400 m easy spin', 'Lat & shoulder stretch — 3 min', 'Box breathing — 2 min'],
      },
      {
        n: 11, phase: 'int', title: 'VO2 intervals', focus: 'Top-end aerobic capacity',
        durationMin: 45, intensity: 5,
        warmup: ['5 min bike build', '3 × 20 s hard / 40 s easy on bike', 'Dynamic mobility — 2 min'],
        primer: { label: 'Efficiency primer', note: 'Open the top gear', items: [
          { move: 'Sprint primer', detail: '4 × 15 s near-max row, full recovery' },
        ]},
        wod: { format: 'Intervals', cap: '32:00', structure: ['6 × 3 min hard / 3 min easy', 'Hard = 90–95% effort, repeatable', 'Easy = truly easy, fully recover'], notes: 'These hurt. The win is keeping interval six as strong as interval one.' },
        cooldown: ['5 min easy spin', 'Full lower-body stretch — 4 min', 'Long exhales — 3 min'],
      },
      {
        n: 12, phase: 'int', title: 'Kelly — long intervals', focus: 'Aerobic durability',
        durationMin: 50, intensity: 4, famous: 'kelly',
        warmup: ['5 min easy jog', 'Box jump & wall-ball primer — 2 min', 'Ankle & calf prep — 2 min'],
        primer: { label: 'Skill primer', note: 'Land soft, breathe at the wall', items: [
          { move: 'Box jump rebound', detail: '3 × 5 controlled, step down every rep', link: yt('box jump technique safe') },
        ]},
        wod: { format: '5 rounds for time', name: 'Kelly', famous: 'kelly', cap: '38:00', structure: ['400 m run', '30 box jumps · 60 cm', '30 wall balls · 9/6 kg'], rx: '60 cm · 9/6 kg', notes: 'No sprinting Kelly. Pick a round-one pace you’d repeat five times.' },
        cooldown: ['5 min walk', 'Quad, calf & hip stretch — 4 min', 'Legs up the wall — 3 min'],
      },
      {
        n: 13, phase: 'int', title: 'Short sprint repeats', focus: 'Anaerobic power on aerobic base',
        durationMin: 38, intensity: 5,
        warmup: ['600 m easy row', 'Sprint mechanics drills — 3 min', '3 × 10 s build-up sprints'],
        primer: { label: 'Efficiency primer', note: 'Recruit fast, recover full', items: [
          { move: 'Acceleration', detail: '4 × 20 m flying sprints, walk back' },
        ]},
        wod: { format: 'Intervals', cap: '24:00', structure: ['10 × 40 s max effort / 80 s easy', 'Alternate row / bike / run each round', 'Hold output above 90% every rep'], notes: 'Quality over survival — if output drops below 85%, take extra rest.' },
        cooldown: ['400 m walk', 'Hip & hamstring stretch — 3 min', 'Box breathing — 3 min'],
      },
      {
        n: 14, phase: 'peak', title: 'Pre-peak primer', focus: 'Sharpen, don’t fatigue',
        durationMin: 40, intensity: 3,
        warmup: ['5 min easy bike', 'Full dynamic flow — 3 min', '3 × 20 s build efforts'],
        primer: { label: 'Efficiency primer', note: 'Feel fast, stay fresh', items: [
          { move: 'Pace rehearsal', detail: '3 × 500 m row at goal-test pace, long rest' },
        ]},
        wod: { format: 'For quality', cap: '20:00', structure: ['3 light rounds, not for time:', '10 cal row · 10 KB swings · 200 m jog', 'Move crisply, stop while it feels easy'], notes: 'This is a primer, not a test. Leave the session feeling sharp.' },
        cooldown: ['5 min walk', 'Gentle full-body stretch — 4 min', 'Box breathing — 2 min'],
      },
      {
        n: 15, phase: 'peak', title: 'Filthy Fifty — peak test', focus: 'Aerobic & mental endurance',
        durationMin: 55, intensity: 5, famous: 'fifty',
        warmup: ['5 min jump rope, easy', 'Movement walk-through of all 10 stations', 'Hip, shoulder & ankle prep — 3 min'],
        primer: { label: 'Skill primer', note: 'Pre-set every station', items: [
          { move: 'Double-under tune-up', detail: '3 × 20 unbroken, relaxed shoulders', link: yt('double under technique') },
        ]},
        wod: { format: 'For time', name: 'Filthy Fifty', famous: 'fifty', cap: '35:00', structure: ['50 reps each, in order:', 'box jumps · pull-ups · KB swings · lunges · K2E', 'push press · back ext · wall balls · burpees · DU'], rx: 'Ten stations', notes: 'Break everything from rep one. Never stop moving — just slow down.' },
        cooldown: ['400 m walk', 'Full-body stretch — 5 min', 'Long diaphragm breathing — 3 min'],
      },
      {
        n: 16, phase: 'peak', title: 'Helen — benchmark retest', focus: 'Measure the engine you built',
        durationMin: 35, intensity: 5, famous: 'helen',
        warmup: ['800 m easy run', 'KB swing & pull-up primer — 3 min', '3 × 20 s build runs'],
        primer: { label: 'Skill primer', note: 'Dial in unbroken swings', items: [
          { move: 'Swing + pull-up', detail: '2 × (10 swings + 5 pull-ups) at race effort', link: yt('kettlebell swing technique') },
        ]},
        wod: { format: '3 rounds for time', name: 'Helen', famous: 'helen', cap: '12:00', structure: ['400 m run', '21 KB swings · 24/16 kg', '12 pull-ups'], rx: '24/16 kg', notes: 'Retest. Compare to session 3 baseline — this is where 16 sessions show up.' },
        cooldown: ['5 min walk', 'Full lower & upper stretch — 4 min', 'Box breathing — 3 min', 'Log your time and celebrate the build'],
      },
    ],
  };

  window.GRASP = { goals, prefChips, dislikeChips, wods, phases, plan };
})();
