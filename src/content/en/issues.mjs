// Issues columns (English). Editor-written. Never invent unverifiable facts or personal experiences.
export default [
  {
    key: 'chlorine',
    sources: [{ t: 'CDC, Chloramines and Pool Operation', url: 'https://www.cdc.gov/healthy-swimming/toolkit/chloramines-and-pool-operation.html' }, { t: 'CDC, Preventing Eye Irritation from Pool Chemicals', url: 'https://www.cdc.gov/healthy-swimming/prevention/preventing-eye-irritation-from-pool-chemicals.html' }],
    name: 'Is That Pool Smell Really Chlorine?',
    tag: 'Column',
    card: 'What the strong pool smell really is, and how to protect skin and hair.',
    thumb: { bg: 'pool', icon: 'drop' },
    title: 'What Causes the Strong Pool Smell? | Protecting Skin and Hair from Pool Chemicals',
    description: 'That strong pool smell usually comes from chloramines, formed when chlorine meets sweat and urine. Why showering first matters and how to care for skin and hair.',
    h1: 'Is That Pool Smell Really Chlorine?',
    intro: [
      'Walk into an indoor pool and a sharp chemical smell hits you. Most people call it chlorine and assume the pool used too much of it, but the story is a little different.',
      'This column explains what the smell really is, why pools insist on showering before you swim, and how to protect your skin and hair from pool chemicals.',
    ],
    sections: [
      {
        type: 'text', h: 'The smell is mostly chloramines',
        paras: [
          'Pool water is disinfected with chlorine-based products to kill germs. When that chlorine reacts with sweat, urine, cosmetics and skin cells, it forms chloramines, and the harsh smell most people notice comes mainly from them.',
          'So a strong smell does not mean cleaner water. It can actually signal more contaminants in the water or poor ventilation.',
        ],
      },
      {
        type: 'list', h: 'Why a pre-swim shower matters',
        items: [
          'Less sweat and cosmetics in the water means fewer chloramines form.',
          'Disinfectant spends less effort on contaminants and more on killing germs.',
          'Everyone gets to swim in water that stings and smells less.',
        ],
      },
      {
        type: 'steps', h: 'Skin care routine',
        items: [
          { t: 'Shower before', d: 'Wash briefly with soap to remove sweat and cosmetics.' },
          { t: 'Rinse right after', d: 'Rinse off pool water with lukewarm water as soon as you get out.' },
          { t: 'Moisturize', d: 'Pool water dries skin, so apply moisturizer after showering.' },
        ],
      },
      {
        type: 'list', h: 'Protecting your hair',
        items: [
          'A swim cap reduces how much pool water reaches your hair.',
          'Wetting your hair with fresh water before swimming means it absorbs less pool water.',
          'Shampoo right after swimming and finish with conditioner.',
        ],
      },
      {
        type: 'faq', h: 'Frequently asked questions',
        items: [
          { q: 'I swallowed some pool water. Is that okay?', a: 'A small amount usually causes no problems, but try not to swallow pool water. If stomach pain or diarrhea follows and continues, see a doctor.' },
          { q: 'Why are my eyes red after swimming?', a: 'Disinfectants and chloramines often irritate the eyes. Wearing goggles and rinsing around your eyes with fresh water afterward helps.' },
        ],
      },
    ],
    related: ['water-in-ear', 'goggles', 'swimwear-rules'],
  },

  {
    key: 'lesson-vs-self',
    name: 'Swim Lessons or Teach Yourself?',
    tag: 'Column',
    card: 'Cost, speed and technique feedback compared, so you can choose.',
    thumb: { bg: 'lemon', icon: 'whistle' },
    title: 'Swim Lessons vs Teaching Yourself | Pros, Cons and How to Choose',
    description: 'Should adult beginners take swim lessons or teach themselves? We compare cost, learning speed, technique feedback and flexibility, and when each option fits.',
    h1: 'Swim Lessons or Teach Yourself: Where to Start',
    intro: [
      'The first decision most new swimmers face is whether to sign up for lessons or learn from videos on their own. Both have clear upsides, and the right answer differs from person to person.',
      'This column does not claim one is always better. It lays out the criteria and the situations each option fits, so you can decide for yourself.',
    ],
    sections: [
      {
        type: 'table', h: 'At a glance',
        head: ['', 'Lessons', 'Self-taught'],
        rows: [
          ['Cost', 'Lesson fees', 'Pool entry only'],
          ['Speed', 'Fast, with a set progression', 'Varies widely'],
          ['Technique feedback', 'Instant from the coach', 'You need video or a friend to check'],
          ['Schedule', 'Fixed days and times', 'Go whenever you like'],
          ['Consistency', 'Easier with a class schedule', 'Relies on self-motivation'],
        ],
      },
      {
        type: 'text', h: 'When lessons fit best',
        paras: [
          'If the water makes you nervous or deep water feels unsafe, lessons are safer and faster at the start. A coach adjusts each step while watching you, so things that might take weeks alone often take days.',
          'Lessons are also the best place to fix movements you cannot see yourself, such as the breaststroke kick. Bad habits are hard to undo once set, so even a few months of lessons at the start is worthwhile.',
        ],
      },
      {
        type: 'text', h: 'When teaching yourself fits best',
        paras: [
          'If you can already float and breathe reasonably well, you can improve a lot on your own. Self-teaching is also the realistic option when your schedule makes fixed lesson times impossible.',
          'The key is having a plan. Weekly goals, like those in our 4-week beginner plan, stop sessions from turning into aimless kickboard laps.',
        ],
      },
      {
        type: 'list', h: 'Rules for teaching yourself',
        items: [
          'Practice only in shallow water where you can stand at first.',
          'Ask a friend to film you now and then so you can check your technique.',
          'Never push for distance alone in deep water.',
        ],
      },
      {
        type: 'faq', h: 'Frequently asked questions',
        items: [
          { q: 'How long should I take lessons?', a: 'It varies, but many people continue until they can swim freestyle and backstroke on their own. After that, mixing lap swim with occasional lessons for specific fixes works well.' },
          { q: 'Can adults learn from scratch?', a: 'Absolutely. Adult beginner classes usually start with getting comfortable in the water, so it is fine if you cannot swim at all.' },
        ],
      },
    ],
    related: ['beginner-plan', 'glossary', 'breathing'],
  },

  {
    key: 'morning-vs-evening',
    name: 'Morning or Evening Swims?',
    tag: 'Column',
    card: 'The trade-offs of each time slot and how to pick yours.',
    thumb: { bg: 'lime', icon: 'sun' },
    title: 'Morning vs Evening Swimming | Pros, Cons and How to Choose Your Time',
    description: 'Morning or evening swimming? We compare crowds, how your body feels and daily routine, and list what to prepare before and after each time slot so you can stay consistent.',
    h1: 'Morning or Evening Swims: Which Is Better?',
    intro: [
      'Pools are usually busiest early in the morning and in the evening. That is when most people fit exercise around work.',
      'There is no single right answer. What matters is the time you can stick to, so use the comparison below to match your routine.',
    ],
    sections: [
      {
        type: 'table', h: 'Comparing the two',
        head: ['', 'Morning', 'Evening'],
        rows: [
          ['Upside', 'Starts the day feeling fresh', 'Body is warmed up and moves freely'],
          ['Downside', 'Stiff and heavy at first', 'Easy to skip when the day runs late'],
          ['Crowds', 'Busy around lesson times', 'Busiest right after work'],
          ['Suits', 'Early risers, people with evening plans', 'People who struggle with early mornings'],
        ],
      },
      {
        type: 'list', h: 'Morning swim tips',
        items: [
          'If an empty stomach feels rough, eat something light such as a banana.',
          'Your body is stiff, so make the warm-up longer than usual.',
          'Pack your swim bag the night before so you are less likely to skip.',
        ],
      },
      {
        type: 'list', h: 'Evening swim tips',
        items: [
          'If the pool is packed right after work, try a slightly later slot.',
          'Hard exercise right before bed can disturb sleep, so ease off late at night.',
          'Hunger often hits after swimming, so plan a light dinner in advance.',
        ],
      },
      {
        type: 'text', h: 'Consistency wins',
        paras: [
          'Whichever you choose, the best time is the one you can keep two or three times a week. Trying both for the first month and keeping the one that feels lighter is a good approach.',
          'Lap swim schedules differ by pool and can change with the seasons. Always check your pool’s timetable before you commit.',
        ],
      },
      {
        type: 'faq', h: 'Frequently asked questions',
        items: [
          { q: 'I feel sleepy after morning swims.', a: 'You can feel more tired while your body adapts. Ease the intensity a little and make sure you are sleeping enough the night before.' },
          { q: 'Can I swim right after dinner?', a: 'After a big meal it can feel uncomfortable, so an hour’s gap is easier. After a light meal it matters much less.' },
        ],
      },
    ],
    related: ['beginner-plan', 'calories', 'lane-etiquette'],
  },

  {
    key: 'swimwear-rules',
    name: 'Indoor Pool Dress Codes Explained',
    tag: 'Column',
    card: 'Are swim caps required, and are rash guards or leggings allowed?',
    thumb: { bg: 'rose', icon: 'shirt' },
    title: 'Indoor Pool Dress Codes | Swim Caps, Rash Guards and What Is Allowed',
    description: 'Why indoor pools have strict dress codes, why many require swim caps, how rules on rash guards and leggings vary by facility, and how to check before you go.',
    h1: 'Indoor Pool Dress Codes: What Is Usually Allowed',
    intro: [
      'What to wear is one of the most common first-visit questions. People are often unsure whether a rash guard is allowed or whether a swim cap is really required.',
      'Rules differ between pools, so this column covers the common principles and the reasons behind them. Always confirm the details with the pool you plan to use.',
    ],
    sections: [
      {
        type: 'text', h: 'Why dress codes exist',
        paras: [
          'Many people share the same indoor pool water for long periods. Fibers shed from clothing, sweat and hair clog filters and use up disinfectant, which makes water harder to manage.',
          'That is why many indoor pools ask swimmers to wear swim-specific fabrics that shed little and, in many places, a cap to keep hair out of the water.',
        ],
      },
      {
        type: 'table', h: 'What to check',
        head: ['Item', 'Common rule', 'What to ask'],
        rows: [
          ['Swim cap', 'Required at many indoor pools', 'Whether silicone or mesh is specified'],
          ['Swimsuit', 'Allowed almost everywhere', 'Some limit beachwear with long ties'],
          ['Rash guard', 'Varies by pool', 'Whether only swim fabrics are allowed'],
          ['Leggings or cotton shorts', 'Often restricted', 'Whether swim leggings are accepted'],
          ['Jewelry', 'Best removed', 'Risk of loss and injury'],
        ],
      },
      {
        type: 'list', h: 'How to check before you go',
        items: [
          'Look for the pool’s rules page or notices on its website first.',
          'If nothing is posted, call ahead and ask about the dress code.',
          'For a first visit, a standard swimsuit and a cap will work almost anywhere.',
        ],
      },
      {
        type: 'faq', h: 'Frequently asked questions',
        items: [
          { q: 'Will I be turned away without a swim cap?', a: 'Pools that require caps may not let you in without one. Some sell caps at the desk, but many do not, so bring your own.' },
          { q: 'Can I swim with makeup on?', a: 'Cosmetics pollute the water and add to the smell, so the norm is to remove them. Wash your face in the pre-swim shower.' },
        ],
      },
    ],
    related: ['swimsuit-guide', 'chlorine', 'lane-etiquette'],
  },
  {
    key: 'pool-registration',
    name: 'Why Swim Lessons Are So Hard to Book',
    tag: 'Column',
    card: 'Popular classes fill up in minutes. What to know before signup day.',
    thumb: { bg: 'lemon', icon: 'ticket' },
    title: 'Booking Swim Lessons | Why Classes Fill Fast and What to Do Instead',
    description: 'Why popular swim lessons sell out so quickly, what to check before registration opens, how re-enrollment priority works, and alternatives if you miss the class you wanted.',
    h1: 'Why Swim Lessons Are So Hard to Book',
    intro: [
      'For many new swimmers, the first obstacle is not the water but registration. Lessons at popular times, such as weekday evenings and weekends, often fill up the moment booking opens.',
      'This column explains why lessons are hard to get into, what registration systems to expect, and what you can do if you miss out. Details vary by pool, so always read your pool’s notices.',
    ],
    sections: [
      {
        type: 'text', h: 'Why it is so competitive',
        paras: [
          'Each class is limited by the number of lanes and instructors, so only a few people fit. Demand, meanwhile, piles up at the same times before and after work.',
          'Many pools also give current students first chance to re-enroll, which leaves even fewer spots for newcomers. Once people get a spot, they tend to keep it.',
        ],
      },
      {
        type: 'list', h: 'What to check before signup',
        items: [
          'Find out when new registration opens and whether it is online or in person.',
          'Check whether it is first come, first served or a lottery, and whether there is a separate re-enrollment period.',
          'Finish anything you can in advance, such as creating an account or verifying your identity.',
        ],
      },
      {
        type: 'table', h: 'If you miss the class you wanted',
        head: ['Alternative', 'Upside', 'Downside'],
        rows: [
          ['Less popular time slots', 'More likely to have space', 'You may need to adjust your routine'],
          ['Weekend or short courses', 'Focused learning in a short time', 'Fewer chances to practice'],
          ['Private pools or lessons', 'More schedule options', 'Can cost more'],
          ['Lap swim and self-teaching', 'Start right away', 'No technique feedback'],
        ],
      },
      {
        type: 'faq', h: 'Frequently asked questions',
        items: [
          { q: 'Do spots open up mid-session?', a: 'Sometimes, when students drop out. If the pool keeps a waiting list, sign up for it.' },
          { q: 'What should I do while I wait?', a: 'Practice bubble breathing, floating and kickboard kicking during lap swim, and you will keep up much faster once lessons start. Our 4-week beginner plan can guide you.' },
        ],
      },
    ],
    related: ['lesson-vs-self', 'beginner-plan', 'beginner-checklist'],
  },

  {
    key: 'adult-beginner',
    name: 'Is It Too Late to Learn to Swim as an Adult?',
    tag: 'Column',
    card: 'The worries adult beginners have, and realistic advice for starting.',
    thumb: { bg: 'lime', icon: 'sprout' },
    title: 'Learning to Swim as an Adult | Why It Is Never Too Late',
    description: 'Common worries of adults learning to swim for the first time, such as fear of water, fitness and feeling watched, plus how adult beginners can start and keep going.',
    h1: 'Is It Too Late to Learn to Swim as an Adult?',
    intro: [
      'Plenty of people never had the chance to learn to swim as children. Starting as an adult brings its own worries, from whether you can still learn to how it will look floundering in front of others.',
      'The short answer is that it is not too late. The fact that so many pools run adult beginner classes shows just how many people start as grown-ups.',
    ],
    sections: [
      {
        type: 'table', h: 'Common adult beginner worries',
        head: ['Worry', 'Another way to see it'],
        rows: [
          ['I am afraid of water', 'Fear of water is common, and you can start slowly with bubbles in shallow water'],
          ['I am not fit enough', 'Beginner classes work in short bursts with plenty of rest'],
          ['People will watch me', 'Almost everyone at the pool is focused on their own swim'],
          ['I am not flexible', 'Learning to relax matters far more than flexibility'],
        ],
      },
      {
        type: 'text', h: 'What adults have going for them',
        paras: [
          'Adults are good at understanding explanations and principles. Once you understand why lowering your head lifts your legs, your body follows much faster.',
          'Choosing to start on your own is a big advantage too. Setting goals, tracking times and enjoying each milestone is exactly what keeps people coming back.',
        ],
      },
      {
        type: 'list', h: 'How to keep it going',
        items: [
          'Make your first goal small and clear, such as finishing 25 m.',
          'Build a habit with a manageable two or three sessions a week.',
          'Time yourself once a month so you can see your progress.',
        ],
      },
      {
        type: 'faq', h: 'Frequently asked questions',
        items: [
          { q: 'Is there an age limit?', a: 'There is no set age limit. If you have health concerns, talk to a doctor first and start at a gentle intensity.' },
          { q: 'How long until an adult beginner can swim 25 m?', a: 'It varies a lot, but with regular practice many people get there within a few weeks to a few months. Compare yourself to last week, not to others, and you will keep going.' },
        ],
      },
    ],
    related: ['breathing', 'lesson-vs-self', 'beginner-plan'],
  },

  {
    key: 'smartwatch',
    name: 'Tracking Swims with a Smartwatch',
    tag: 'Column',
    card: 'Lap counts, SWOLF and how to get accurate swim data.',
    thumb: { bg: 'pool-deep', icon: 'watch' },
    title: 'Smartwatch Swim Tracking | Lap Counting, SWOLF and Better Accuracy',
    description: 'What lap count, stroke count and SWOLF mean on a smartwatch, why swim data goes wrong, and how settings like pool length make your tracking more accurate.',
    h1: 'Tracking Your Swims with a Smartwatch',
    intro: [
      'Many swimmers now use a smartwatch to log how many lengths they swam and even how many strokes they took. Watching the numbers build up is a great way to see progress and stay motivated.',
      'Watches miscount more often than you might think, though. This column explains the key metrics, why errors happen and how to improve accuracy, without reference to any specific product.',
    ],
    sections: [
      {
        type: 'table', h: 'Common swim metrics',
        head: ['Metric', 'Meaning'],
        rows: [
          ['Lengths', 'How many times you swam from one end of the pool to the other'],
          ['Stroke count', 'How many arm strokes you took in one length'],
          ['SWOLF', 'Seconds per length plus strokes per length, where lower means more efficient'],
          ['Pace', 'Usually the time it takes to swim 100 m'],
        ],
      },
      {
        type: 'list', h: 'Why the data goes wrong',
        items: [
          'Watches count lengths mostly from wrist movement and turns, so unclear turns can be missed.',
          'Kickboard sets with no arm movement are often not counted properly.',
          'Long rests at the wall or stopping mid-lane can split one length into two.',
          'A wrong pool length setting throws off every distance.',
        ],
      },
      {
        type: 'steps', h: 'How to improve accuracy',
        items: [
          { t: 'Set the pool length', d: 'Enter exactly whether the pool is 25 m or 50 m before you start.' },
          { t: 'Pause when resting', d: 'Pause the workout or use the rest function while you stop at the wall.' },
          { t: 'Make clear turns', d: 'A firm push-off from the wall helps the watch separate lengths.' },
          { t: 'Log drills manually', d: 'Note kick and drill sets separately and correct the data afterward.' },
        ],
      },
      {
        type: 'note',
        text: 'Whether a watch is suitable for swimming varies by product. Check its water resistance rating and the manufacturer’s swimming guidance before wearing it in the pool.',
      },
      {
        type: 'faq', h: 'Frequently asked questions',
        items: [
          { q: 'What is a good SWOLF score?', a: 'It depends heavily on height, stroke and pool length, so there is no universal benchmark. Use it to see whether your own SWOLF drops under the same conditions rather than to compare with others.' },
          { q: 'Does it work in open water?', a: 'Open water tracking usually relies on GPS, and the signal drops while your arm is underwater, so errors creep in. Treat it as a rough guide.' },
        ],
      },
    ],
    related: ['pace', 'interval-training', 'plateau'],
  },

  {
    key: 'masters',
    sources: [{ t: 'World Aquatics, Competition Regulations', url: 'https://www.worldaquatics.com/rules/competition-regulations' }],
    name: 'Should You Try a Masters Swim Meet?',
    tag: 'Column',
    card: 'Swim meets for adults. What to know before your first one.',
    thumb: { bg: 'rose', icon: 'medal' },
    title: 'Masters Swimming Meets | Preparing for Your First Adult Swim Meet',
    description: 'What masters swimming is, how age groups work, how to choose events for your first meet, and the rules to check so you avoid a disqualification.',
    h1: 'Should You Try a Masters Swim Meet?',
    intro: [
      'Masters swimming is organized swimming and competition for adults. You do not need a racing background, and you compete against people your own age, so it is less intimidating than it sounds.',
      'A meet on the calendar sharpens your training and often brings noticeable improvement. This column covers the basics for first-timers, and entry rules vary, so always read the meet information.',
    ],
    sections: [
      {
        type: 'text', h: 'You compete within age groups',
        paras: [
          'Masters meets usually split swimmers into age groups spanning a few years and rank each group separately. Even if you started swimming late, you are compared fairly with people your age.',
          'Minimum age, how age groups are defined and any time standards differ between meets. Read the meet information carefully before you enter.',
        ],
      },
      {
        type: 'list', h: 'Choosing events for your first meet',
        items: [
          'A 50 m race in your strongest stroke is a safe start.',
          'Time yourself in practice so you can fill in a realistic entry time.',
          'Focus on one or two events rather than entering many.',
        ],
      },
      {
        type: 'table', h: 'Rules to check to avoid a DQ',
        head: ['Stroke', 'Common rule mistakes'],
        rows: [
          ['Breaststroke and butterfly', 'Touch the wall with both hands at the same time at turns and the finish'],
          ['Backstroke', 'Stay on your back until you touch at the finish'],
          ['Freestyle, backstroke, butterfly', 'Surface within 15 m of the start and each turn'],
          ['All strokes', 'Moving before the start signal can be a false start'],
        ],
      },
      {
        type: 'faq', h: 'Frequently asked questions',
        items: [
          { q: 'Can I enter if I cannot dive?', a: 'Many meets allow in-water starts. Check the meet information or ask the organizers.' },
          { q: 'Will I be embarrassed if I am slow?', a: 'Masters meets have plenty of first-timers, and crowds often cheer loudest for swimmers who simply finish. Go in aiming for your own best time.' },
        ],
      },
    ],
    related: ['im', 'start', 'turns'],
  },

  {
    key: 'plateau',
    name: 'When Your Swimming Stops Improving',
    tag: 'Column',
    card: 'Times stuck for months? Five things to check.',
    thumb: { bg: 'sage', icon: 'chart' },
    title: 'Breaking a Swimming Plateau | 5 Things to Check When You Stop Improving',
    description: 'What to check when your swim times or technique stall for months: repetitive training, technique limits and too little rest, plus fixes such as video, drills and intervals.',
    h1: 'Five Things to Check When Your Swimming Stops Improving',
    intro: [
      'After months of weekly progress, there often comes a point where improvement seems to stop. When your times stay flat despite showing up, motivation takes a hit.',
      'Plateaus are a normal part of every swimmer’s journey. Work through the five checks below and you will likely find what moves you to the next level.',
    ],
    sections: [
      {
        type: 'steps', h: 'Five things to check',
        items: [
          { t: 'Same workout every time?', d: 'If you always swim the same distance at the same speed, your body may already be used to it.' },
          { t: 'Technique limit?', d: 'Breathing or sinking legs often hold you back more than fitness does.' },
          { t: 'Enough rest days?', d: 'Pushing hard every day without recovery can actually slow you down.' },
          { t: 'Clear goal?', d: 'A specific target, such as taking five seconds off your 50 m, gives your training direction.' },
          { t: 'Tracking times?', d: 'Without records, it is easy to feel stuck even while you are improving.' },
        ],
      },
      {
        type: 'list', h: 'Ways to break through',
        items: [
          'Ask a friend to film you so you can spot technique issues you never noticed.',
          'Pick one movement to fix and add its drill consistently for a few weeks.',
          'Use interval sets to vary speed and rest.',
          'Every few months, get objective feedback from a lesson or one-off coaching session.',
        ],
      },
      {
        type: 'text', h: 'Do not rush it',
        paras: [
          'Progress often comes in steps. It is common to stay flat for a while and then suddenly feel a jump up a level.',
          'While times are flat, your body may still be adapting to new technique. Staying consistent is the surest fix.',
        ],
      },
      {
        type: 'faq', h: 'Frequently asked questions',
        items: [
          { q: 'Should I take a break during a plateau?', a: 'If you feel drained, a light week or lower intensity can help. Many swimmers come back feeling lighter.' },
          { q: 'Does learning another stroke help?', a: 'Practicing other strokes uses new muscles and sensations and keeps things fresh. Skills such as the butterfly wave can even improve your main stroke.' },
        ],
      },
    ],
    related: ['interval-training', 'smartwatch', 'lesson-vs-self'],
  },
];
