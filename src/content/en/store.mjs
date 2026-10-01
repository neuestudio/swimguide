// Store guides (English). Put an affiliate link in a pick's url to show the button. Empty url shows the criteria only.
export default [
  {
    key: 'beginner-checklist',
    name: 'Beginner Swimming Checklist',
    tag: 'Essentials',
    card: 'What you need for your first lesson and what can wait.',
    thumb: { bg: 'lime', icon: 'bag' },
    title: 'What to Bring to Your First Swim Lesson | Beginner Swimming Checklist',
    description: 'A beginner swimming checklist split into must-haves and nice-to-haves: goggles, cap, swimsuit, toiletries and bag, plus the criteria to check when choosing each one.',
    h1: 'Beginner Swimming Checklist',
    intro: [
      'Once you sign up, the next question is what to buy. There is so much gear that it is tempting to buy it all at once, but you do not need everything on day one.',
      'This checklist separates what your first session needs from what can wait a few weeks. We also note what to check when choosing each item.',
    ],
    sections: [
      {
        type: 'table', h: 'The checklist',
        head: ['Item', 'When you need it', 'What to look for'],
        rows: [
          ['Goggles', 'Day one', 'A fit that seals, clear lenses for indoors'],
          ['Swim cap', 'Day one', 'Silicone keeps hair drier, fabric is easier to put on'],
          ['Indoor swimsuit', 'Day one', 'Chlorine-resistant fabric, a snug size'],
          ['Toiletries and towel', 'Day one', 'Small bottles and a quick-dry towel'],
          ['Swim bag', 'Day one', 'Separate space for wet and dry items'],
          ['Anti-fog spray', 'After 2 to 3 weeks', 'When the goggle coating starts to fade'],
          ['Earplugs', 'If needed', 'If water often gets stuck in your ears'],
        ],
      },
      {
        type: 'text', h: 'You do not need it all at once',
        paras: [
          'Goggles, a cap and a swimsuit are enough for your first session. Training tools such as kickboards are usually provided by the pool, so there is no need to buy them.',
          'After a few weeks you will notice what bothers you. Add anti-fog spray if your goggles keep fogging, or earplugs if your ears keep blocking, and you will save money.',
        ],
      },
      {
        type: 'picks', h: 'What to look for in each item',
        lead: 'Stick to these criteria and even a first-time swimmer rarely buys the wrong thing.',
        items: [
          { t: 'Clear beginner goggles', why: 'Gasket goggles with bright lenses are the most comfortable at an indoor pool. An adjustable nose bridge makes the fit easier.', url: '' },
          { t: 'Silicone swim cap', why: 'Keeps hair drier and stops the goggle strap from slipping. Choose a larger size if you have long hair.', url: '' },
          { t: 'Mesh swim bag', why: 'Mesh lets water drain, so a wet suit smells less. A waterproof pouch inside makes it even handier.', url: '' },
          { t: 'Anti-fog spray', why: 'A thin coat inside the lenses reduces fogging. It also extends the life of goggles whose coating has worn.', url: '' },
        ],
      },
      {
        type: 'faq', h: 'Frequently asked questions',
        items: [
          { q: 'Do I need pool sandals?', a: 'They help prevent slips between the showers and the deck. Some pools restrict footwear on deck, so check the rules.' },
          { q: 'Are expensive goggles better?', a: 'Fit matters far more than price. Try them in the store without the strap and pick the pair that seals.' },
        ],
      },
    ],
    related: ['goggles', 'swimsuit-guide', 'swimwear-rules'],
  },

  {
    key: 'swimsuit-guide',
    name: 'How to Choose an Indoor Swimsuit',
    tag: 'Swimsuits',
    card: 'Know the fabric, sizing and cut differences and your suit will last longer.',
    thumb: { bg: 'pool-deep', icon: 'suit' },
    title: 'How to Choose a Swimsuit for Lap Swimming | Fabric, Sizing and Cuts',
    description: 'What to know before buying a swimsuit for indoor lap swimming: chlorine-resistant fabrics, how snug the size should be, cuts and lengths, and care tips that make it last.',
    h1: 'Choosing an Indoor Swimsuit: Fabric, Size and Cut',
    intro: [
      'An indoor swimsuit spends several hours a week in chlorinated water, so it stretches and fades much faster than normal clothing. That is why fabric and size matter more than looks.',
      'This guide covers fabric differences, how to pick a size, and what each cut offers. Add the care tips and the same suit will last much longer.',
    ],
    sections: [
      {
        type: 'table', h: 'Fabrics compared',
        head: ['Fabric', 'What it does', 'Best for'],
        rows: [
          ['Mostly polyester', 'Resists chlorine and holds its shape', 'Swimmers going three or more times a week'],
          ['Spandex blend', 'Stretchy and easy to put on', 'Occasional swimmers who value comfort'],
          ['Labeled chlorine-resistant', 'Built to survive pool chemicals longer', 'Anyone wanting a long-lasting pool suit'],
        ],
      },
      {
        type: 'text', h: 'Size it snug',
        paras: [
          'Swimsuits loosen a little in the water. A size that feels slightly tight when dry often fits just right when wet.',
          'A suit that starts out loose lets water inside, adds drag and becomes hard to wear after a few months. Sizing differs by brand, so try it on if you can.',
        ],
      },
      {
        type: 'list', h: 'Cuts and lengths',
        items: [
          'A classic women’s one-piece is the most common cut and allows free movement.',
          'Women’s kneeskin or half-leg styles cover the thighs and are popular with first-timers.',
          'Men’s briefs are light with little drag, while square-leg and jammer styles feel more covered and are popular with beginners.',
        ],
      },
      {
        type: 'mistakes', h: 'Common swimsuit care mistakes',
        items: [
          { t: 'Machine washing it', why: 'Friction and spinning quickly ruin stretch fibers.', fix: 'Hand-rinse in lukewarm water and press out the water.' },
          { t: 'Drying it in the sun', why: 'Strong sunlight fades the color and weakens the fabric.', fix: 'Lay it flat to dry in a shaded, airy spot.' },
          { t: 'Leaving it wet in the bag', why: 'It picks up odors and chemicals stay in the fabric longer.', fix: 'Rinse and dry it as soon as you get home.' },
        ],
      },
      {
        type: 'picks', h: 'What to look for',
        items: [
          { t: 'Chlorine-resistant indoor swimsuit', why: 'The first criterion if you swim often. Check the fabric label for chlorine resistance.', url: '' },
          { t: 'Kneeskin or jammer for beginners', why: 'Less self-conscious for your first few pool visits. Check that the waist fits well.', url: '' },
        ],
      },
      {
        type: 'faq', h: 'Frequently asked questions',
        items: [
          { q: 'How often should I replace my swimsuit?', a: 'It depends on how often you swim and how you care for it. Replace it when it stretches enough to let water in or becomes see-through.' },
          { q: 'Can I wear beachwear at an indoor pool?', a: 'Some pools restrict beachwear with long ties or decorations. An indoor swimsuit is the safe default.' },
        ],
      },
    ],
    related: ['swimwear-rules', 'beginner-checklist', 'chlorine'],
  },

  {
    key: 'training-gear',
    name: 'Kickboards, Pull Buoys, Fins and Paddles',
    tag: 'Training gear',
    card: 'Training gear works when you know when and why to use it.',
    thumb: { bg: 'sage', icon: 'board' },
    title: 'How to Use Swim Training Gear | Kickboard, Pull Buoy, Fins and Paddles',
    description: 'What kickboards, pull buoys, fins, paddles and center snorkels train, when to start using each one, what to watch out for, and which piece beginners should buy first.',
    h1: 'Swim Training Gear: When and Why to Use It',
    intro: [
      'At any pool you will see swimmers using all kinds of training tools. Gear helps isolate one part of the stroke, but using it without a purpose can build bad habits instead.',
      'Here is what each piece trains, when it makes sense to start, and what to watch for.',
    ],
    sections: [
      {
        type: 'table', h: 'Gear at a glance',
        head: ['Gear', 'Trains', 'Start when', 'Watch out for'],
        rows: [
          ['Kickboard', 'Kick', 'From day one', 'Holding it too high sinks the hips'],
          ['Pull buoy', 'Arm stroke', 'After 25 m of freestyle', 'Forgetting to use your legs at all'],
          ['Fins', 'Kick feel, butterfly wave', 'Once your kick is decent', 'Keep sets short to spare ankles and knees'],
          ['Paddles', 'Catch and feel for the water', 'Intermediate and up', 'Heavy shoulder load, so short distances only'],
          ['Center snorkel', 'Technique without breathing turns', 'When refining form', 'Does not replace breathing practice'],
        ],
      },
      {
        type: 'text', h: 'What should beginners buy first?',
        paras: [
          'Most pools provide kickboards and pull buoys, so beginners rarely need their own. The first personal training gear most swimmers want is fins.',
          'Fins build kick feel quickly and are especially helpful for learning the butterfly wave. Long blades strain the ankles, though, so short training fins are the safer first choice.',
        ],
      },
      {
        type: 'picks', h: 'What to look for',
        items: [
          { t: 'Short-blade training fins', why: 'Short blades are easier on the ankles and keep a realistic kick tempo. Check the width and length fit your feet.', url: '' },
          { t: 'Center snorkel', why: 'Lets you fix posture that falls apart when you turn to breathe. An adjustable head strap is more comfortable.', url: '' },
        ],
      },
      {
        type: 'faq', h: 'Frequently asked questions',
        items: [
          { q: 'Will fins make me improve faster?', a: 'They help you learn kick feel and body position. You still need plenty of swimming without fins for that to carry over.' },
          { q: 'Can beginners use paddles?', a: 'Paddles load the shoulders heavily, so wait until your stroke is stable. Start with a small size and short distances.' },
        ],
      },
    ],
    related: ['glossary', 'butterfly', 'beginner-checklist'],
  },
];
