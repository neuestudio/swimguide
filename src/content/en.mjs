// English content. Every sentence must end with a period so the build's minimum-sentence check passes.
// Inline <b>, <a>, <em>, <br> are output as HTML. {{EMAIL}} is replaced at build time.
import knowledge from './en/knowledge.mjs';
import issues from './en/issues.mjs';
import store from './en/store.mjs';
import moreStrokes from './en/strokes-more.mjs';

export default {
  lang: 'en',
  locale: 'en_US',
  langName: 'English',
  siteName: 'Swim Stroke Guide',

  ui: {
    home: 'Home',
    findStroke: 'Find my stroke',
    related: 'Keep reading',
    level: 'Difficulty',
    skip: 'Skip to content',
    langSwitch: '한국어',
    langSwitchLong: '한국어',
    updated: 'Last updated',
    readMore: 'Read',
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    disclaimer: 'The content on this site is general swimming information. For precise technique correction, we recommend working with a qualified swim coach.',
    disclosure: 'This page may contain affiliate links. If you buy through them, the site may earn a small commission at no extra cost to you.',
    buy: 'View product',
    footBig: 'One more lap,<br><em>just keep swimming.</em>',
    notFoundTitle: 'Page not found',
    notFoundBody: 'This page may have moved or been removed. Pick a section below to keep going.',
    notFoundHome: 'Go to home',
    mistakeFix: 'How to fix it',
    postsCount: 'articles',
    viewAll: 'View all',
    sources: 'Sources',
  },

  cats: {
    strokes: {
      name: 'Strokes',
      title: 'Learn the Swimming Strokes | Freestyle, Backstroke, Breaststroke & Butterfly',
      description: 'Beginner lessons for the four core strokes, survival and leisure strokes like treading water and sidestroke, plus starts, turns, underwater kicking and the IM.',
      intro: [
        'Competitive swimming uses four core strokes: freestyle, backstroke, breaststroke and butterfly. We add survival and leisure strokes for staying afloat, and skills such as starts and turns that take you to the next level, in three groups. If you are brand new, start with breathing and floating, then work through freestyle and the rest in order.',
      ],
      orderTitle: 'The order to learn',
      orderLead: 'Most swim lessons follow this progression. Move on when the previous step feels easy.',
      groups: {
        basic: { name: 'Core strokes', lead: 'The four strokes used in racing. Swim lessons teach them in this order.' },
        survival: { name: 'Survival and leisure', lead: 'Strokes focused on staying afloat comfortably rather than going fast. They matter most for water play and emergencies.' },
        skills: { name: 'Skills and events', lead: 'Techniques and events that take you to the next level once the four strokes feel comfortable.' },
      },
    },
    knowledge: {
      name: 'Knowledge',
      title: 'Swimming Know-How | Gear, Lane Etiquette, Calories & Training Plans',
      description: 'What to know before you hit the pool: choosing goggles, lane etiquette, calories by stroke, a 4-week beginner plan, cramps, water in the ear and a swim glossary.',
      groups: {
        basics: { name: 'Basics and gear', lead: 'Pool know-how and gear advice worth having before your first swim.' },
        training: { name: 'Training and tools', lead: 'Training plans and tracking tools that help you improve on your own.' },
        health: { name: 'Health', lead: 'Calories, stretching and injury prevention for a swimmer’s body.' },
        safety: { name: 'Safety and etiquette', lead: 'How to stay calm in the water and the rules for sharing it with others.' },
      },
      intro: [
        'What happens outside the stroke matters just as much. Which goggles should you buy, which way do you swim in a lane, and what do you do when a cramp hits? This section answers the questions almost every new swimmer has. Try the pace calculator to see how fast you swim, too.',
      ],
    },
    issues: {
      name: 'Issues',
      title: 'Swimming Issues | Pool Chemicals, Lessons vs Self-Teaching, Dress Codes',
      description: 'Editor-written columns on what swimmers talk about most: that pool smell, lessons versus teaching yourself, morning or evening swims, and indoor pool dress codes.',
      intro: [
        'Issues is our editor-written column and news board. We pick the questions and debates that come up again and again at the pool and focus on verifiable information and clear ways to decide. New pieces are added regularly.',
      ],
    },
    store: {
      name: 'Store',
      title: 'Swim Gear Guide | What Beginners Need and How to Choose It',
      description: 'A first-lesson packing checklist, how to choose an indoor swimsuit, and when to use kickboards, pull buoys, fins and paddles, with the criteria that matter before you buy.',
      intro: [
        'There is a lot of swim gear, and it is hard to know what to buy first. This section separates what you need now from what can wait and explains the criteria to check before you buy. Product links are added only after the criteria are explained.',
      ],
    },
  },

  home: {
    title: 'Swim Stroke Guide | Learn Freestyle, Backstroke, Breaststroke & Butterfly',
    description: 'Free beginner lessons for all four swimming strokes plus goggle buying tips, lane etiquette, calories by stroke and a 4-week training plan for new swimmers.',
    kicker: 'Swim Stroke Guide',
    h1: 'The <em>easiest</em> way<br>to feel at home in water',
    sub: [
      'From your first day at the pool to swimming 100 m without stopping, we take it one step at a time. Stroke technique, breathing, pool etiquette and gear advice all live in one place. Start with the quiz to find the stroke that suits you.',
    ],
    cta1: 'Find my stroke',
    cta2: 'Start from zero',
    floats: {
      tipTag: 'Tip of the day',
      paceTag: 'My 100 m pace',
      paceBig: '2:30',
      paceNote: 'Novice level · about 25 min per km',
      oxTag: 'True or false',
      oxQ: 'You must wait 30 minutes after eating to swim?',
      stickerTitle: '25 m done!',
      stickerSub: 'Beginner roadmap, step 3',
    },
    tips: [
      'Hum out through your nose underwater so you only need to breathe in when your face comes up.',
      'If your legs sink in freestyle, look at the bottom. When the head goes down, the legs come up.',
      'In breaststroke, the one-to-two second glide after the kick is half your speed.',
      'Backstroke feels easier with your ears in the water. Tucking your chin drops your hips.',
      'Butterfly has two kicks: one as the hands enter, one as they push back.',
      'Never rub the inside of your goggle lenses. It strips the anti-fog coating.',
      'When you rest at the wall, move to the corner by the lane rope, not the middle.',
    ],
    strokesP: 'Each character swims its own stroke. Body position, breathing, kicks and common mistakes are covered stroke by stroke.',
    quizH: 'Which stroke are you?',
    quizP: 'Four questions is all it takes. You can share the result with friends.',
    quiz: {
      preview: 'Your result',
      previewText: 'Answer the questions and your stroke will appear here.',
      resultLabel: 'Your stroke',
      resultTitle: 'You are {name}!',
      done: 'Here is your result.',
      go: 'Start learning',
      share: 'Share result',
      copied: 'Link copied',
      retry: 'Try again',
      shareText: 'Find your swimming stroke',
      results: {
        freestyle: { t: 'a freestyler', d: 'You love moving forward fast. Nail the side-breathing timing and 25 m will come quickly.' },
        backstroke: { t: 'a backstroker', d: 'You like floating calmly and looking at the sky. With no breathing worries, you can swim for a long time.' },
        breaststroke: { t: 'a breaststroker', d: 'You enjoy rhythm and timing. Pull, breathe, kick, glide will feel made for you.' },
        butterfly: { t: 'a butterflyer', d: 'You are full of energy. Learn the wave rhythm before the power and fly becomes the coolest stroke you swim.' },
      },
      questions: [
        { q: 'How do you feel about putting your face in the water?', o: [['Still a bit scary', { backstroke: 2, breaststroke: 1 }], ['Fine, I even like diving', { freestyle: 2, butterfly: 1 }]] },
        { q: 'Why do you want to swim?', o: [['Fitness and weight loss', { butterfly: 1, freestyle: 1 }], ['Long, relaxed swims', { breaststroke: 2, backstroke: 1 }], ['Just finish 25 m!', { freestyle: 2 }]] },
        { q: 'Which sounds more like you?', o: [['I love keeping a beat', { breaststroke: 2 }], ['I have energy to burn', { butterfly: 2 }], ['Lying back is the best', { backstroke: 2 }]] },
        { q: 'Pick a water buddy.', o: [['Dolphin', { butterfly: 2 }], ['Frog', { breaststroke: 2 }], ['Otter', { backstroke: 2 }], ['Seal', { freestyle: 2 }]] },
      ],
    },
    roadmapH: 'From 0 m to 100 m',
    roadmapP: 'Follow the lane like a pool length, with something to read at every stop.',
    roadmap: [
      { dist: '0', key: 'breathing', t: 'Get comfortable', d: 'Bubbles and floating' },
      { dist: '12.5', key: 'beginner-plan', t: 'Kickboard kick', d: '4-week plan, weeks 1 to 2' },
      { dist: '25', key: 'freestyle', t: 'First freestyle length', d: 'Breathe every two strokes' },
      { dist: '50', key: 'breaststroke', t: 'Back and breast', d: 'Back float and timing' },
      { dist: '100', key: 'butterfly', t: 'Try butterfly', d: 'The wave and two kicks' },
    ],
    oxH: 'True or false',
    oxP: 'Tap a card to reveal the answer.',
    oxHint: 'Tap to reveal',
    oxChoices: 'T / F',
    ox: [
      { q: 'You must wait 30 minutes after eating before you swim.', a: 'F', exp: 'There is little evidence that swimming after a meal is dangerous. A big meal followed by hard swimming can feel uncomfortable, though.' },
      { q: 'You sweat while you swim.', a: 'T', exp: 'Your body still sweats when it warms up in the water. You just do not notice, so drink water.' },
      { q: 'The stronger the pool smell, the cleaner the water.', a: 'F', exp: 'A strong smell usually comes from chloramines, formed when chlorine meets sweat and urine. That is why you shower first.' },
      { q: 'You float more easily in seawater.', a: 'T', exp: 'Seawater is denser than fresh water, so it gives more buoyancy. Waves can still make it more tiring.' },
      { q: 'The more muscle you have, the better you float.', a: 'F', exp: 'Muscle is denser than fat, so it tends to sink. Relaxing and keeping air in your lungs matters more.' },
      { q: 'In a race, freestyle can be swum with any stroke.', a: 'T', exp: 'The rules put no limit on style, so swimmers choose the fastest, front crawl. In the IM, though, the freestyle leg must differ from the other three strokes.' },
    ],
    calc: { label: '05 · Mini calculator', tabPace: 'Pace', tabCal: 'Calories', h: 'What is my 100 m pace?', distance: 'Distance (m)', time: 'Time (min:sec)', link: 'Estimate a finish time for any distance', calH: 'How many calories will I burn?', weight: 'Weight (kg)', minutes: 'Minutes', stroke: 'Stroke and effort', calLink: 'Compare calories by stroke' },
    magH: 'Reading',
    magAll: 'All',
  },

  knowledge,
  issues,
  store,
  moreStrokes,

  strokes: [
    {
      key: 'freestyle',
      name: 'Freestyle',
      sub: 'Front Crawl',
      icon: 'i-free',
      level: 1,
      card: 'The fastest stroke and usually the first one taught.',
      title: 'Freestyle Breathing & Kick for Beginners | How to Swim 25 m Without Gasping',
      description: 'Why you run out of air and your legs sink in freestyle, plus body position, arm pull, flutter kick, 2 vs 3 stroke breathing, and a beginner 25 m progression.',
      h1: 'Learn Freestyle: Breathing, Arm Pull and Kick',
      intro: [
        'Freestyle, or front crawl, is swum face down with alternating arm strokes and an up-and-down kick. It is the fastest of the four strokes and the one most lessons start with.',
        'Most beginners get stuck on breathing, not on the arms. Lifting the head to breathe drops the legs, and sinking legs make you even more out of breath. That is why this page covers body position and breathing before the arms and legs.',
      ],
      sections: [
        {
          type: 'list', h: 'Body position: head down, hips up',
          items: [
            'Stretch long and flat along the surface, looking at the bottom and slightly forward.',
            'Let the back of your head sit in the water, which lets your hips and legs rise.',
            'Rotate your torso about 30 to 45 degrees on each stroke to free your shoulders and make breathing easier.',
          ],
        },
        {
          type: 'text', h: 'Breathing: rotate, don’t lift',
          paras: [
            'Take a breath by turning your head along with your body roll. Keep one goggle and one ear in the water and your head will not lift.',
            'The window for inhaling is short, so exhale steadily through your nose while your face is in the water. If you hold your breath and try to exhale and inhale all at once, you will run out of time and swallow water.',
            'When you breathe, look to the side rather than forward. Trying to look ahead or up lifts your head and drops your legs.',
          ],
        },
        {
          type: 'table', h: 'Breathing every 2 or every 3 strokes?',
          lead: 'A common approach is to learn 2-stroke breathing on your comfortable side first, then move to 3-stroke breathing to balance both sides.',
          head: ['', 'Every 2 strokes', 'Every 3 strokes'],
          rows: [
            ['Side', 'One side only', 'Alternating sides'],
            ['Frequency', 'Every second stroke', 'Every third stroke'],
            ['Benefit', 'More air', 'Better balance'],
            ['Best for', 'Beginners, long swims', 'Technique work, intermediate'],
          ],
        },
        {
          type: 'steps', figs: 'arm', h: 'The arm stroke in 4 phases',
          items: [
            { t: 'Entry', d: 'Place your hand in fingertips first, in line with your shoulder, and reach forward.' },
            { t: 'Catch', d: 'Keep your elbow high and hold the water with your palm and forearm.' },
            { t: 'Pull and push', d: 'Move the water back under your body until your hand passes your thigh.' },
            { t: 'Recovery', d: 'Lift the elbow first and bring a relaxed arm forward over the water.' },
          ],
        },
        {
          type: 'list', h: 'Flutter kick',
          items: [
            'Think of a small whip that starts at the hip, not at the knee.',
            'Keep your ankles loose and toes pointed slightly inward.',
            'Big splashes usually mean you are bending your knees too much.',
          ],
        },
        {
          type: 'mistakes', h: 'Common freestyle mistakes',
          items: [
            { t: 'Lifting the head forward to breathe', why: 'When the head goes up, the legs go down.', fix: 'Roll to the side and turn your chin toward your shoulder instead.' },
            { t: 'Crossing the center line on entry', why: 'Hands that cross over make your body snake from side to side.', fix: 'Imagine each hand entering on its own rail in front of its shoulder.' },
            { t: 'Dropping the elbow', why: 'A dropped elbow pushes the water down instead of back.', fix: 'Keep the elbow near the surface at the catch and point your fingertips at the bottom.' },
          ],
        },
        {
          type: 'drills', h: 'Freestyle drills',
          items: [
            { t: 'Side kick with a board', how: 'Hold a kickboard with your lead hand and kick while lying on your side. It teaches you to breathe by turning the head from a rotated position.' },
            { t: 'Catch-up', how: 'Start each stroke only after the recovering hand touches the extended hand. It slows down a rushed stroke and lets you check your hand entry.' },
            { t: 'Fingertip drag', how: 'Drag your fingertips lightly along the surface during recovery. It builds the habit of a high elbow without thinking about it.' },
            { t: 'One-arm breathing with a board', how: 'Hold a kickboard in one hand, stroke with the other arm and breathe to that side. If your ear and the back of your head stay against the arm holding the board, your head is not lifting.' },
          ],
        },
        {
          type: 'steps', h: 'Beginner plan: your first 25 m',
          lead: 'Do not try everything at once. Move to the next step only when the current one feels easy.',
          items: [
            { t: 'Bubbles at the wall', d: 'Hold the wall, exhale through your nose underwater, then turn your head to inhale, 20 times.' },
            { t: 'Kickboard kick', d: 'Kick 12.5 m at a time with your face in the water.' },
            { t: 'One-arm with a board', d: 'Hold the board with one hand, stroke with the other, and breathe to that side.' },
            { t: '25 m without a board', d: 'Swim slowly, breathing every two strokes.' },
          ],
        },
        {
          type: 'faq', h: 'Frequently asked questions',
          items: [
            { q: 'Why do I get so out of breath swimming freestyle?', a: 'Usually because you are holding your breath underwater. Exhale gently and continuously through your nose while your face is in, and inhaling becomes much easier.' },
            { q: 'Why do my legs sink in freestyle?', a: 'Most often the head is too high or the kick comes only from the knees. Look at the bottom and kick small from the hips.' },
            { q: 'Which side should I breathe on?', a: 'Your comfortable side is fine at first. Once you are settled, practice bilateral breathing every three strokes so your stroke does not lean to one side.' },
          ],
        },
      ],
      related: ['breathing', 'backstroke', 'pace'],
    },

    {
      key: 'backstroke',
      name: 'Backstroke',
      sub: 'Back Crawl',
      icon: 'i-back',
      level: 2,
      card: 'Your face stays out of the water, so breathing is free.',
      title: 'Backstroke Technique | Stop Sinking Hips and Swim Straight',
      description: 'How to stop your hips sinking and drifting into the next lane in backstroke: back float position, hand entry, kick, and using the ceiling and flags to steer.',
      h1: 'Learn Backstroke: From Back Float to Swimming Straight',
      intro: [
        'Backstroke is swum lying face up with alternating arm strokes. Breathing is easy because your face is out of the water, but you cannot see where you are going.',
        'The biggest hurdle is usually an unsteady back float. That is why it pays to learn floating and kicking on your back before worrying about the arms.',
      ],
      sections: [
        {
          type: 'text', h: 'Start with a solid back float',
          paras: [
            'Lay your head back until your ears are underwater and look straight up. Tucking the chin lifts the head and drops the hips, while tilting too far back sends water over your face.',
            'Engage your core as if pushing your belly button toward the ceiling and your hips will rise near the surface. Hugging a kickboard to your chest is a good way to take the fear out of the first few floats.',
          ],
        },
        {
          type: 'list', h: 'Backstroke kick',
          items: [
            'It is an upside-down flutter kick with the effort on the upward flick of the foot.',
            'If your knees break the surface, you are kicking from the knees.',
            'The right size is just enough for your toes to stir the surface.',
          ],
        },
        {
          type: 'steps', figs: 'arm', h: 'The arm stroke in 4 phases',
          items: [
            { t: 'Entry', d: 'Keep the arm straight and enter little finger first at eleven and one o’clock above your head.' },
            { t: 'Catch and pull', d: 'Bend the elbow and pull the water toward your side.' },
            { t: 'Push', d: 'Press the water down past your thigh.' },
            { t: 'Recovery', d: 'Lift the arm thumb first and swing it straight over the top.' },
          ],
        },
        {
          type: 'text', h: 'Steering and judging the wall',
          paras: [
            'Indoors, use a line of ceiling lights or beams as a guide and keep your body parallel to it. If you keep curving to one side, your hand entries are probably uneven or one arm is pulling harder.',
            'Most pools hang backstroke flags five metres from each wall. Count how many strokes it takes you from the flags to the wall, and you will never hit your head.',
          ],
        },
        {
          type: 'drills', h: 'Backstroke drills',
          items: [
            { t: 'Board on the forehead', how: 'Balance a kickboard or a cup on your forehead and kick without dropping it. It is the best drill for learning a still head.' },
            { t: 'Single-arm backstroke', how: 'Keep one arm at your side and swim with the other. It lets you check entry position and body roll one side at a time.' },
            { t: '6-kick switch', how: 'Kick six times on your side, then take one stroke to roll to the other side. It builds the shoulder-to-shoulder rotation rhythm.' },
          ],
        },
        {
          type: 'mistakes', h: 'Common backstroke mistakes',
          items: [
            { t: 'Sitting in the water', why: 'Lifting the head or relaxing the core lets the hips sag.', fix: 'Keep your ears in and push your belly button up to lift the hips.' },
            { t: 'Lifting the head to see your feet', why: 'The moment the head comes up, the whole body tilts.', fix: 'Keep your eyes on the ceiling and trust that your feet are there.' },
            { t: 'Entering behind the head', why: 'Crossed entries make you zigzag down the lane.', fix: 'Aim for eleven and one o’clock on an imaginary clock face.' },
          ],
        },
        {
          type: 'faq', h: 'Frequently asked questions',
          items: [
            { q: 'Why does water go up my nose in backstroke?', a: 'The wash from your recovering arm flows over your face. Keep a gentle exhale through your nose, or time your inhale with one arm’s recovery.' },
            { q: 'When should I breathe in backstroke?', a: 'You can breathe anytime, but a rhythm makes it less tiring. Try inhaling on one arm’s recovery and exhaling on the other.' },
            { q: 'Is backstroke easier than freestyle?', a: 'Breathing is easier, but it can feel harder if you are not comfortable floating on your back. Learning body roll in freestyle first will speed up your backstroke too.' },
          ],
        },
      ],
      related: ['freestyle', 'breathing', 'breaststroke'],
    },

    {
      key: 'breaststroke',
      name: 'Breaststroke',
      sub: 'Frog Stroke',
      icon: 'i-breast',
      level: 2,
      card: 'A timing stroke where arms and legs take turns.',
      title: 'Breaststroke Kick & Timing | Why You Are Not Moving Forward',
      description: 'Not going anywhere in breaststroke? Fix your whip kick foot position, keep the arm pull small, and learn the pull, breathe, kick, glide timing with simple drills.',
      h1: 'Learn Breaststroke: It Is All About Kick and Timing',
      intro: [
        'Breaststroke moves both arms and both legs at the same time in a symmetrical pattern. Unlike the other strokes, a large share of its propulsion comes from the kick.',
        'If you work hard in breaststroke but barely move, the cause is almost always timing. Moving arms and legs together cancels out their power, so this page starts with the timing.',
      ],
      sections: [
        {
          type: 'table', h: 'One breaststroke cycle, beat by beat',
          lead: 'Pull, breathe, kick, glide looks like this when you split it into four beats.',
          head: ['Beat', 'Arms', 'Legs', 'Head'],
          rows: [
            ['1. Pull', 'Sweep out, then in to the chest', 'Stay straight', 'Starts to rise'],
            ['2. Breathe', 'Hands together at the chest', 'Heels start to draw up', 'Inhale through the mouth'],
            ['3. Kick', 'Shoot forward', 'Kick back in a half circle', 'Returns underwater'],
            ['4. Glide', 'Stay extended', 'Together and straight', 'Between the arms'],
          ],
        },
        {
          type: 'steps', figs: 'kick', h: 'The whip kick in 3 steps',
          lead: 'This is where most of the speed comes from, so learn it before the arms.',
          items: [
            { t: 'Draw', d: 'Bring your heels toward your seat while keeping the knees about hip width apart.' },
            { t: 'Flex', d: 'Turn your feet out so the soles and inner edges face backward.' },
            { t: 'Kick and close', d: 'Kick back in a half circle and finish with the feet together.' },
          ],
        },
        {
          type: 'list', h: 'Kick feel checklist',
          items: [
            'Both feet stay underwater the whole time, and feet popping above the surface mean you drew them too high.',
            'Just before the kick you should feel the water press against the inside of your soles, which means your ankles are flexed properly.',
            'At the end of the kick your feet come together and you feel yourself slide forward.',
          ],
        },
        {
          type: 'list', h: 'Keep the arm pull small',
          items: [
            'Start by sweeping your extended hands just wider than your shoulders.',
            'Keep the elbows high and bring the hands quickly together in front of the chest.',
            'If your hands pass your shoulders, the pull is too big and your recovery will be late.',
          ],
        },
        {
          type: 'text', h: 'Do not skip the glide',
          paras: [
            'Right after the kick is when you are moving fastest. Starting the next stroke immediately throws that speed away.',
            'Squeeze your arms beside your ears, stay long, and slide for one or two seconds. Start the next pull when you feel yourself slowing.',
          ],
        },
        {
          type: 'mistakes', h: 'Common breaststroke mistakes',
          items: [
            { t: 'Moving arms and legs together', why: 'Drawing the legs up blocks the power from the arm pull.', fix: 'Finish the pull first, then draw the legs, and kick as the arms extend.' },
            { t: 'Pulling the knees to the belly', why: 'The thighs act like a wall and create huge drag.', fix: 'Think about bringing the heels to your seat rather than the knees to your chest.' },
            { t: 'Kicking with pointed toes', why: 'Kicking with the top of the foot lets the water slip past.', fix: 'Flex your feet outward just before the kick and push with the inner soles.' },
          ],
        },
        {
          type: 'drills', h: 'Breaststroke drills',
          items: [
            { t: 'Breaststroke kick on your back', how: 'Lie on your back and do breaststroke kick. You can see whether your knees break the surface.' },
            { t: 'Two kicks, one pull', how: 'Do two kicks for every arm pull. It reinforces the feeling that the kick drives the stroke.' },
            { t: 'Three-second glide', how: 'Hold a streamline for three seconds after every stroke. It cures rushing and locks in the correct order.' },
          ],
        },
        {
          type: 'faq', h: 'Frequently asked questions',
          items: [
            { q: 'Why am I not moving forward in breaststroke?', a: 'Usually the arms and legs move at the same time or the kick is done with pointed toes. Practice the flexed-foot kick on a board first, then keep to pull, breathe, kick, glide.' },
            { q: 'Breaststroke hurts my knees. What should I do?', a: 'Kicking too wide or twisting the knees strains their inner side. Keep the knees about hip width apart, and stop and see a professional if the pain continues.' },
            { q: 'Do I breathe every stroke in breaststroke?', a: 'Yes, most swimmers breathe once per cycle. Your upper body rises naturally during the pull, so take a short breath at that moment.' },
          ],
        },
      ],
      related: ['breaststroke-kick', 'butterfly', 'breathing'],
    },

    {
      key: 'butterfly',
      name: 'Butterfly',
      sub: 'Fly',
      icon: 'i-fly',
      level: 3,
      card: 'The most dynamic stroke, driven by a full-body wave.',
      title: 'Butterfly Stroke for Beginners | Body Wave, Dolphin Kick & Step-by-Step Drills',
      description: 'Butterfly feels exhausting? Learn the body wave, the two dolphin kicks per stroke, low breathing, and a step-by-step progression starting from single-arm fly.',
      h1: 'Learn Butterfly: Rhythm Beats Strength',
      intro: [
        'Butterfly moves both arms together while the legs stay joined for a dolphin kick. It is the most tiring stroke and usually the last one taught.',
        'Fly feels especially hard when you try to haul yourself up with arm strength alone. Once a wave that starts at the chest and flows to the toes is in place, the arms simply ride that rhythm.',
      ],
      sections: [
        {
          type: 'text', h: 'The wave: a see-saw between chest and hips',
          paras: [
            'Press the chest and the hips rise, let the hips drop and the chest rises, and that see-saw is the foundation of butterfly. When the motion travels through the waist to the feet like a whip, it becomes the dolphin kick.',
            'The head only leads the wave and should not lift or duck too much. There is no need to dive deep, and staying small and quick near the surface is far less tiring.',
          ],
        },
        {
          type: 'list', h: 'Two dolphin kicks per stroke',
          items: [
            'The first kick happens as the hands enter and drives you forward.',
            'The second kick happens as the arms push back and lifts the upper body.',
            'Miss the second kick and the arms will drag through the water instead of clearing it.',
          ],
        },
        {
          type: 'steps', figs: 'arm', h: 'The arm stroke in 4 phases',
          items: [
            { t: 'Entry', d: 'Enter both hands at the same time, shoulder width apart.' },
            { t: 'Catch and pull', d: 'Hold the water with high elbows and pull under the body in a keyhole shape.' },
            { t: 'Push', d: 'Push hard until the hands pass the thighs.' },
            { t: 'Recovery', d: 'Swing both arms low and relaxed over the water back to the front.' },
          ],
        },
        {
          type: 'list', h: 'Breathe low and fast',
          items: [
            'Push the chin forward during the push phase and breathe just above the surface.',
            'Your face should return to the water before the arms come over.',
            'Once settled, breathe every second stroke to keep the rhythm.',
          ],
        },
        {
          type: 'steps', h: 'A beginner butterfly roadmap',
          lead: 'Trying full-stroke fly for 25 m on day one burns you out fast. Build it up in this order.',
          items: [
            { t: 'Underwater dolphin kick', d: 'Arms extended, travel 10 m using only the wave.' },
            { t: 'Single-arm fly', d: 'Leave one arm in front and stroke with the other while timing both kicks.' },
            { t: '3-3-3 drill', d: 'Three right-arm strokes, three left, three with both, and repeat.' },
            { t: 'Full stroke for 12.5 m', d: 'Swim short distances and stop before the rhythm falls apart.' },
          ],
        },
        {
          type: 'mistakes', h: 'Common butterfly mistakes',
          items: [
            { t: 'Kicking only from the knees', why: 'Legs moving without a wave produce almost no propulsion.', fix: 'Think of the kick starting with the chest press and let the knees follow.' },
            { t: 'Lifting the head high to breathe', why: 'A high head sinks the hips deep.', fix: 'Push the chin forward and breathe just above the surface.' },
            { t: 'Muscling through', why: 'Pulling yourself up with arm strength wears you out before 25 m.', fix: 'Keep repeats short and swim only as far as the rhythm holds.' },
          ],
        },
        {
          type: 'faq', h: 'Frequently asked questions',
          items: [
            { q: 'Why is butterfly so tiring?', a: 'Mostly because swimmers try to lift themselves out of the water with their arms. Build the rhythm first so the wave and the second kick lift the upper body for you.' },
            { q: 'My lower back hurts when I swim butterfly.', a: 'Making the wave only from the lower back loads it heavily. Start the motion at the chest and make it smaller, and stop if the pain continues.' },
            { q: 'When should I start learning butterfly?', a: 'Many swimmers start once they can swim 25 m of freestyle and breaststroke comfortably. You can practice dolphin kick on a board before that.' },
          ],
        },
      ],
      related: ['butterfly-wave', 'breaststroke', 'freestyle'],
    },
  ],

  guides: [
    {
      key: 'breathing',
      name: 'Breathing & Floating Basics',
      sub: 'For absolute beginners',
      icon: 'i-breath',
      level: 1,
      card: 'Bubbles and floating, the starting point for every stroke.',
      title: 'How to Breathe While Swimming | Bubble Breathing & Floating for Beginners',
      description: 'The first skills every new swimmer needs: bubble breathing, what to do when water goes up your nose, front and back floats, and a gentle routine for water anxiety.',
      h1: 'Swimming Breathing and Floating: Where Every Stroke Begins',
      intro: [
        'You cannot swim for long unless breathing feels easy. Beginners tire quickly far more often because they hold their breath than because they lack fitness.',
        'This page covers bubble breathing, where you exhale with your face in the water, and how to float by relaxing. If you are new to the pool, learn these two before any stroke.',
      ],
      sections: [
        {
          type: 'steps', h: 'Bubble breathing practice',
          lead: 'Hum out through your nose underwater, then pop the last air out and breathe in through your mouth above the water.',
          items: [
            { t: 'Get set', d: 'Stand in chest-deep water and hold the wall or lane rope lightly.' },
            { t: 'Hum', d: 'Put your face in and hum out slowly through your nose for about three seconds.' },
            { t: 'Pop', d: 'Lift your face, puff out the rest of the air, and take a short breath in.' },
            { t: 'Repeat', d: 'Do three sets of ten, keeping the rhythm steady.' },
          ],
        },
        {
          type: 'text', h: 'When water goes up your nose',
          paras: [
            'Water gets in when you stop exhaling through your nose underwater. The key is to keep a small, steady stream of air going the whole time your face is in.',
            'A nose clip is fine for the first few weeks if it helps. Once you are comfortable, build the nose-exhale habit so the move to freestyle breathing feels natural.',
          ],
        },
        {
          type: 'list', h: 'Front float',
          items: [
            'Take a big breath, put your face in, and spread your arms and legs in a star shape.',
            'Air in your lungs keeps you up, so relaxing is the most important part.',
            'To stand, pull your knees to your chest, press the water down with both hands, and put your feet on the floor.',
          ],
        },
        {
          type: 'list', h: 'Back float',
          items: [
            'Lay your head back until your ears are in the water and look at the ceiling.',
            'Lift the hips as if pushing your belly button upward.',
            'If your legs sink, reach your arms overhead to shift your balance point.',
          ],
        },
        {
          type: 'mistakes', h: 'Common breathing mistakes',
          items: [
            { t: 'Holding your breath underwater', why: 'Trying to exhale and inhale above the water leaves too little time.', fix: 'Do most of the exhaling underwater so you only need to inhale above it.' },
            { t: 'Gulping too much air', why: 'Over-breathing makes you dizzy and even more out of breath.', fix: 'Breathe in about as much as you would during normal conversation.' },
          ],
        },
        {
          type: 'faq', h: 'Frequently asked questions',
          items: [
            { q: 'I am scared of the water. How do I start?', a: 'Begin in shallow water where you can stand, holding the wall while you practice bubble breathing. Add one second at a time to how long your face stays in, and the tension will ease.' },
            { q: 'Do I need goggles?', a: 'They are not required, but they are strongly recommended for beginners. Seeing underwater gives you a sense of direction and greatly reduces anxiety.' },
          ],
        },
      ],
      related: ['freestyle', 'backstroke', 'breaststroke'],
    },
  ],

  pace: {
    key: 'pace',
    group: 'training',
    name: 'Swim Pace Calculator',
    tag: 'Tool',
    card: 'Enter a distance and time to get your pace per 100 m and a finish-time estimate.',
    thumb: { bg: 'lemon', icon: 'timer' },
    title: 'Swim Pace Calculator | Pace per 100 m and Finish Time Estimate',
    description: 'Enter the distance you swam and your time to get your pace per 100 m, plus an estimated finish time for any target distance at the same speed. Free and instant.',
    h1: 'Swim Pace Calculator',
    intro: [
      'Swimmers usually describe speed as the time it takes to swim 100 m, known as pace per 100. Enter the distance you swam and your time to see your pace and an estimated time for any target distance.',
    ],
    form: {
      distance: 'Distance swum (m)',
      time: 'Time (min:sec)',
      target: 'Target distance (m)',
      submit: 'Calculate',
      pace: 'Pace per 100 m',
      eta: 'Estimated time for target',
      invalid: 'Please enter a valid distance and time. Use min:sec, for example 3:30.',
    },
    sections: [
      {
        type: 'table', h: 'Pace per 100 m by level',
        lead: 'Rough freestyle ranges only, and they vary by pool and swimmer.',
        head: ['Level', 'Pace per 100 m', 'What it looks like'],
        rows: [
          ['Beginner', '3:00 or slower', 'Swimming 25 m with rests'],
          ['Novice', '2:30 to 3:00', '100 m without stopping'],
          ['Intermediate', '2:00 to 2:30', 'Intermediate lesson group'],
          ['Advanced', '1:30 to 2:00', 'Masters competition level'],
        ],
      },
      {
        type: 'text', h: 'How to use your pace',
        paras: [
          'Timing the same distance regularly shows in numbers whether you are improving. Once a month, time an easy 100 m or 200 m and keep a record.',
          'Knowing your pace also makes it easier to pick the right lane during lap swim. Joining a lane faster than your pace means being chased the whole time, which tends to wreck your technique.',
        ],
      },
      {
        type: 'faq', h: 'Frequently asked questions',
        items: [
          { q: 'How many lengths is 100 m in a 25 m pool?', a: 'Four lengths of a 25 m pool make 100 m. That is two round trips down and back.' },
          { q: 'Is pace different for each stroke?', a: 'Yes, freestyle is usually the fastest and breaststroke the slowest. Time each stroke separately for a meaningful comparison.' },
        ],
      },
    ],
    related: ['freestyle', 'breathing', 'butterfly'],
  },

  about: {
    title: 'About | Swim Stroke Guide',
    description: 'Swim Stroke Guide is a free resource that explains freestyle, backstroke, breaststroke and butterfly technique and drills for people learning to swim.',
    h1: 'About Swim Stroke Guide',
    body: [
      { h: 'What this site is', paras: ['Swim Stroke Guide is a free information site for people learning to swim or refining their technique on their own. It gathers the basic movements, common mistakes and drills for freestyle, backstroke, breaststroke and butterfly in one place.'] },
      { h: 'How we write', paras: ['Every page is based on the way swim lessons commonly explain each skill and on publicly available coaching material. We split each skill into small steps so you can fix one thing at a time, and we focus on the problems beginners actually run into.', 'If something is wrong or could be explained better, please tell us through the contact page. We will review it, update the page and refresh the last updated date.'] },
      { h: 'Disclaimer', paras: ['The information here is general learning material and does not replace in-person coaching. If you have pain or a health condition, talk to a professional before you start swimming.'] },
      { h: 'Advertising and affiliates', paras: ['Google AdSense ads may appear on this site to support its operation. You can read about advertising cookies in our privacy policy.', 'Store guides may include affiliate links, and the site may earn a commission on purchases made through them. We always explain the buying criteria first, whether or not a link is included.'] },
    ],
  },

  contact: {
    title: 'Contact | Swim Stroke Guide',
    description: 'How to contact Swim Stroke Guide about corrections, content suggestions, partnerships and advertising.',
    h1: 'Contact',
    body: [
      { h: 'Email', paras: ['Please send your message to the address below. We aim to reply within three business days.', 'Email: {{EMAIL}}.'] },
      { h: 'Good reasons to write', list: ['You found an error or something hard to understand.', 'There is a stroke, drill or swimming topic you would like covered.', 'You have a partnership or advertising inquiry.'] },
      { h: 'Please note', paras: ['We cannot offer individual technique reviews or lessons by email. We use your email address only to reply, as described in our privacy policy.'] },
    ],
  },

  privacy: {
    title: 'Privacy Policy | Swim Stroke Guide',
    description: 'What personal information Swim Stroke Guide processes, why, how long it is kept, how cookies and Google AdSense ads work, and your rights.',
    h1: 'Privacy Policy',
    body: [
      { h: '1. Overview', paras: ['Swim Stroke Guide (the "Site") respects your privacy and follows applicable data protection laws. This policy explains what information the Site processes and how.'] },
      { h: '2. Information we process', list: ['The Site has no user accounts and does not ask you to enter your name or contact details.', 'If you email us, we receive your email address and the content of your message so we can reply.', 'When you visit, our hosting provider Cloudflare may automatically process logs such as IP address, browser details and access time for security and service operation.'] },
      { h: '3. Purpose and retention', paras: ['Email addresses and messages are used only to reply and are deleted one year after the conversation ends. Where the law requires longer retention, we keep them for that period.'] },
      { h: '4. Cookies and advertising', paras: ['The Site may display ads through Google AdSense. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this site or other websites.', 'You can learn more in <a href="https://policies.google.com/technologies/ads" rel="nofollow">Google’s advertising policies</a>. You can opt out of personalized advertising in <a href="https://adssettings.google.com/" rel="nofollow">Ads Settings</a>, and you can block cookies in your browser settings.', 'If you click an affiliate link in a store guide, the retailer may use cookies to attribute the purchase. The Site does not collect this information itself, and it is handled under the retailer’s privacy policy.'] },
      { h: '5. Sharing and processors', paras: ['We do not sell or share your personal information with third parties. Hosting is provided by Cloudflare and ads by Google, and each processes information under its own privacy policy.'] },
      { h: '6. Your rights', paras: ['You may ask at any time to access, correct or delete the information you sent us. Contact us at the address below and we will act on your request without delay.'] },
      { h: '7. Contact', paras: ['Send privacy questions to the site operator by email. Email: {{EMAIL}}.'] },
      { h: '8. Changes', paras: ['This policy is effective from {{POLICY_DATE}}. If it changes, we will post the update and the new effective date on this page.'] },
    ],
  },
};
