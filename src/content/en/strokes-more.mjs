// Strokes > survival & leisure strokes, skills & events (English)
export default [
  // ---------- Survival & leisure ----------
  {
    key: 'survival',
    group: 'survival',
    name: 'Survival Swimming',
    sub: 'Back float & staying safe',
    level: 1,
    card: 'Float on your back to save energy and wait for help.',
    title: 'Survival Swimming | How to Back Float and What to Do If You Fall In',
    description: 'The core of survival swimming: how to back float step by step, how to use bottles or a life jacket for buoyancy, and what to do if you fall in or see someone in trouble.',
    h1: 'Survival Swimming: Staying Afloat Until Help Arrives',
    intro: [
      'Survival swimming is not about swimming fast. It is about saving energy and staying afloat for a long time if you end up in the water, and in Korea it is even part of the elementary school curriculum.',
      'The key skill is the back float. This page covers how to float, how to turn everyday objects into flotation, and what to do in an emergency.',
    ],
    sections: [
      {
        type: 'steps', h: 'How to back float',
        lead: 'Practice first in shallow water with an instructor or a trusted adult nearby.',
        items: [
          { t: 'Take a big breath', d: 'Full lungs make you float better, so breathe in deeply.' },
          { t: 'Lie back slowly', d: 'Tip your head back until your ears are underwater and look at the sky.' },
          { t: 'Spread out', d: 'Stretch your arms and legs into a star to spread your weight on the water.' },
          { t: 'Push your belly up', d: 'Lift your belly button slightly so your hips do not sink.' },
          { t: 'Breathe in short bursts', d: 'Exhale quickly and refill with a big breath to keep as much air in your lungs as possible.' },
        ],
      },
      {
        type: 'text', h: 'Using everyday objects to float',
        paras: [
          'Empty bottles with the cap on, cool boxes and balls all trap air and make good flotation. Hugging a bottle to your chest while back floating takes far less effort.',
          'If you are wearing a life jacket, pull your knees to your chest and wrap your arms around them to hold in body heat. In a group, link arms in a tight circle to stay warm and easier to spot.',
        ],
      },
      {
        type: 'mistakes', h: 'Common mistakes in an emergency',
        items: [
          { t: 'Thrashing to swim out', why: 'Panicked, wild strokes burn energy fast and make you sink.', fix: 'Back float first to calm your breathing, then look for something to hold or an edge and move slowly.' },
          { t: 'Struggling out of clothes and shoes', why: 'Undressing in the water wastes energy and speeds up heat loss.', fix: 'Trapped air in clothing can even help you float, so focus on staying up instead.' },
        ],
      },
      {
        type: 'list', h: 'If you see someone in trouble',
        items: [
          'Shout for help and call emergency services immediately.',
          'Throw something that floats, such as a ring buoy, bottle or inflatable.',
          'Do not jump in yourself unless you are trained in water rescue.',
        ],
      },
      {
        type: 'note',
        text: 'This is general safety information. Always practice survival skills where a lifeguard or instructor is present.',
      },
      {
        type: 'faq', h: 'Frequently asked questions',
        items: [
          { q: 'Can I back float if I cannot swim?', a: 'Yes, back floating is about relaxing rather than swimming, so non-swimmers can learn it. Holding a kickboard or bottle at first makes it far less scary.' },
          { q: 'My legs keep sinking.', a: 'Everyone’s buoyancy is different, so slightly sinking legs are normal. Reaching your arms overhead shifts your balance and helps the legs rise.' },
        ],
      },
    ],
    related: ['treading', 'breathing', 'elementary-backstroke'],
  },

  {
    key: 'treading',
    group: 'survival',
    name: 'Treading Water',
    sub: 'Staying upright in deep water',
    level: 2,
    card: 'Stay upright in deep water as if standing still.',
    title: 'How to Tread Water | Sculling Arms and the Eggbeater Kick',
    description: 'Learn to tread water in the deep end: sculling with your hands, the eggbeater kick, tips to save energy, and a step-by-step progression from the wall to hands-free.',
    h1: 'Treading Water: Staying Put in the Deep End',
    intro: [
      'Treading water means staying upright with your head above the surface without moving anywhere. It lets you rest or look around in deep water, and it is a basic skill in water polo, artistic swimming and lifeguarding.',
      'Once you can tread water, the deep end stops feeling scary. The principle is simple: the hands sweep the water side to side while the legs circle alternately.',
    ],
    sections: [
      {
        type: 'table', h: 'Movements used for treading',
        head: ['Movement', 'How', 'Notes'],
        rows: [
          ['Sculling', 'Sweep the palms side to side in a figure eight', 'Supports you with little effort'],
          ['Eggbeater kick', 'Alternate breaststroke kicks in circles, one leg at a time', 'Most stable and sustainable'],
          ['Breaststroke kick', 'Both legs kick together', 'Easy to learn but you bob up and down'],
          ['Flutter kick', 'Freestyle kick while upright', 'Simple but tiring'],
        ],
      },
      {
        type: 'steps', h: 'Step-by-step practice',
        items: [
          { t: 'Kick at the wall', d: 'Hold the wall at the deep end with both hands and move only your legs while upright.' },
          { t: 'Kick with a board', d: 'Hug a kickboard and keep your head up using only your legs.' },
          { t: 'Scull only', d: 'Put a pull buoy between your thighs and stay up using only sculling.' },
          { t: 'Put it together', d: 'Start with 30 seconds, then build to one and two minutes.' },
        ],
      },
      {
        type: 'list', h: 'Tips to save energy',
        items: [
          'Keep your head only high enough for your chin to touch the water.',
          'Holding a full breath helps you float higher.',
          'Move your arms and legs in big, slow motions rather than fast ones.',
        ],
      },
      {
        type: 'faq', h: 'Frequently asked questions',
        items: [
          { q: 'How long should I be able to tread water?', a: 'A minute is a good first goal. Building up to five comfortable minutes gives you real confidence in deep water.' },
          { q: 'I cannot get the eggbeater kick.', a: 'Sit on a chair with knees apart and circle one foot inward at a time. Learn the rhythm on land, then try it holding the wall in the water.' },
        ],
      },
    ],
    related: ['survival', 'breaststroke', 'dog-paddle'],
  },

  {
    key: 'sidestroke',
    group: 'survival',
    name: 'Sidestroke',
    sub: 'Scissor kick on your side',
    level: 2,
    card: 'Swim on your side with a scissor kick, great for long, easy distances.',
    title: 'How to Swim Sidestroke | Scissor Kick, Arm Pull and Glide',
    description: 'Sidestroke body position, what the top and bottom arms each do, the scissor kick and timing. With easy breathing, it is used for distance swimming and lifesaving.',
    h1: 'Sidestroke: Easy Distance on Your Side',
    intro: [
      'Sidestroke is swum lying on your side with a kick that opens and closes like scissors. Your face stays out of the water, so breathing is easy and it costs little energy.',
      'It is not a racing stroke, but it is practical for long swims and for towing a person in a rescue. Once you understand that each arm has a different job, it is not hard to learn.',
    ],
    sections: [
      {
        type: 'text', h: 'Body position',
        paras: [
          'Lie on your comfortable side with the lower ear in the water and your face looking just off the direction of travel. Keep your body in a straight line from head to toe.',
          'Start with the lower arm stretched ahead of your head and the upper arm resting on your thigh. This is the glide position of sidestroke.',
        ],
      },
      {
        type: 'steps', h: 'Arm action',
        items: [
          { t: 'Pull with the lower arm', d: 'Pull the extended lower arm toward your chest to catch the water.' },
          { t: 'Bring the upper arm in', d: 'At the same time, bring the upper arm to your chest so the hands meet.' },
          { t: 'Push with the upper arm', d: 'Push the water toward your feet with the upper arm while the lower arm reaches forward again.' },
        ],
      },
      {
        type: 'steps', h: 'Scissor kick',
        items: [
          { t: 'Draw the knees', d: 'Draw both knees gently toward your chest.' },
          { t: 'Open front and back', d: 'Move the top leg forward and the bottom leg back.' },
          { t: 'Snap together', d: 'Squeeze the legs together firmly and straighten as you glide.' },
        ],
      },
      {
        type: 'mistakes', h: 'Common sidestroke mistakes',
        items: [
          { t: 'Rolling onto your front or back', why: 'If the side position collapses, the kick pushes sideways instead of forward.', fix: 'Keep the lower ear in the water and your shoulders and hips stacked vertically.' },
          { t: 'Never gliding', why: 'Most of the distance in sidestroke comes from the glide after the kick.', fix: 'Hold the streamlined position for one or two seconds after each kick.' },
        ],
      },
      {
        type: 'faq', h: 'Frequently asked questions',
        items: [
          { q: 'Which side should I lie on?', a: 'Whichever feels comfortable. Practicing only one side can unbalance you, so try the other side once you are settled.' },
          { q: 'Is sidestroke used in competitions?', a: 'It is not an official racing stroke today. It is mainly taught for leisure distance swimming and lifesaving.' },
        ],
      },
    ],
    related: ['elementary-backstroke', 'survival', 'breaststroke'],
  },

  {
    key: 'dog-paddle',
    group: 'survival',
    name: 'Dog Paddle',
    sub: 'The instinctive stroke',
    level: 1,
    card: 'The stroke everyone does naturally, and easier when done right.',
    title: 'How to Dog Paddle | Technique, Pros and Cons of the Easiest Stroke',
    description: 'Dog paddle technique: head up, arms paddling alternately underwater and a small kick, plus its pros and cons. A good stroke for kids and beginners getting used to water.',
    h1: 'Dog Paddle: Making the Easiest Stroke Easier',
    intro: [
      'Dog paddle keeps your head above water while your hands paddle alternately underwater and your feet kick. Most people do it by instinct without ever being taught.',
      'It is slow, but you can see ahead and breathe freely, which makes it useful while getting comfortable in the water. A few small changes make it much less tiring.',
    ],
    sections: [
      {
        type: 'list', h: 'Basic position',
        items: [
          'Keep your head only high enough for your chin to touch the water and lean your body forward.',
          'Reach your hands forward alternately underwater in front of your chest, then pull down.',
          'Kick small and quick, like a freestyle kick.',
        ],
      },
      {
        type: 'table', h: 'Pros and cons',
        head: ['Pros', 'Cons'],
        rows: [
          ['You can see where you are going', 'Upright body creates drag and is slow'],
          ['Breathing is free', 'Tiring over longer distances'],
          ['Easy to learn', 'May need habit changes when moving to other strokes'],
        ],
      },
      {
        type: 'text', h: 'Moving on to other strokes',
        paras: [
          'Once dog paddle feels easy, put your face in, add bubble breathing and move toward freestyle. You already know the alternating-arm feel, so you will adapt quickly.',
          'A strong head-up habit can make your legs sink in freestyle. Practicing with a kickboard and your face in the water helps.',
        ],
      },
      {
        type: 'faq', h: 'Frequently asked questions',
        items: [
          { q: 'Should kids learn dog paddle first?', a: 'It is a good first step for getting comfortable. An adult must always stay within arm’s reach.' },
          { q: 'Is dog paddle enough?', a: 'It helps you cover short distances, but it is hard to stay afloat for long. Learn the back float from survival swimming as well.' },
        ],
      },
    ],
    related: ['freestyle', 'treading', 'breathing'],
  },

  {
    key: 'elementary-backstroke',
    group: 'survival',
    name: 'Elementary Backstroke',
    sub: 'Chicken, airplane, soldier',
    level: 1,
    card: 'A restful backstroke with both arms moving together underwater.',
    title: 'Elementary Backstroke | The Restful Beginner Backstroke Explained',
    description: 'How to swim elementary backstroke: the chicken, airplane, soldier arm pattern, a breaststroke kick on your back, timing and glide. A low-effort stroke for resting.',
    h1: 'Elementary Backstroke: Resting While You Move',
    intro: [
      'Elementary backstroke is swum on your back with both arms sweeping out together underwater and a breaststroke kick. Because the arms never leave the water, it is quiet and relaxed.',
      'It is closer to resting than racing, which makes it useful for catching your breath on long swims or moving slowly in a survival situation. Swim teachers often use the cue chicken, airplane, soldier for the arms.',
    ],
    sections: [
      {
        type: 'steps', h: 'Arms: chicken, airplane, soldier',
        items: [
          { t: 'Chicken', d: 'Slide both hands up your sides to your armpits, like chicken wings.' },
          { t: 'Airplane', d: 'Reach the hands straight out to the sides at shoulder height to form a T.' },
          { t: 'Soldier', d: 'Sweep the straight arms firmly toward your feet and return to attention.' },
        ],
      },
      {
        type: 'list', h: 'Kick and timing',
        items: [
          'The kick is a breaststroke kick on your back, with knees kept under the surface.',
          'Kick at the same moment the arms push, for one big surge forward.',
          'Glide at attention for two or three seconds before starting again.',
        ],
      },
      {
        type: 'mistakes', h: 'Common mistakes',
        items: [
          { t: 'Lifting the arms out of the water', why: 'Arms above the surface splash your face and push you down.', fix: 'Keep every arm movement underwater, sliding close to the body.' },
          { t: 'Knees breaking the surface', why: 'Pulling the knees to the belly sinks the hips and adds drag.', fix: 'Drop the heels down as you draw them up so the knees stay underwater.' },
        ],
      },
      {
        type: 'faq', h: 'Frequently asked questions',
        items: [
          { q: 'How is it different from regular backstroke?', a: 'Regular backstroke alternates the arms over the water with a flutter kick. Elementary backstroke moves both arms together underwater with a breaststroke kick, which is slower but far more relaxed.' },
          { q: 'When is it useful?', a: 'It is great for catching your breath on long swims or moving slowly from a back float. It also helps beginners get comfortable on their backs before learning backstroke.' },
        ],
      },
    ],
    related: ['backstroke', 'survival', 'sidestroke'],
  },

  // ---------- Skills & events ----------
  {
    key: 'start',
    group: 'skills',
    name: 'Starts and Diving',
    sub: 'From push-off to the block',
    level: 2,
    card: 'From a wall push-off to a block dive, the safe order to learn starts.',
    title: 'How to Learn Swimming Starts | From Wall Push-Off to Diving Safely',
    description: 'Learn swimming starts in a safe order: wall push-off, sitting, kneeling and standing dives, then the block start. Entry angle, streamline and key diving safety rules.',
    h1: 'Starts: From the Wall to the Block',
    intro: [
      'The start is the first move of any race and its fastest moment. Races begin with a dive from the block, but learning starts with pushing off the wall.',
      'Diving learned the wrong way can lead to hitting the bottom, which is dangerous. Always practice in deep enough water where diving is allowed, under an instructor’s supervision.',
    ],
    sections: [
      {
        type: 'steps', h: 'The order to learn',
        items: [
          { t: 'Push off into streamline', d: 'Push off the wall underwater with both feet and glide with your arms stacked overhead.' },
          { t: 'Sitting dive', d: 'Sit on the edge with your arms extended and enter the water fingertips first.' },
          { t: 'Kneeling dive', d: 'Kneel on one knee, lean forward and enter fingertips first.' },
          { t: 'Standing dive', d: 'Stand on the edge, bend at the waist and fall forward into the water.' },
          { t: 'Block start', d: 'Finally, start from the block with one foot forward and one back in a track start.' },
        ],
      },
      {
        type: 'list', h: 'Tips for a clean entry',
        items: [
          'Imagine your fingertips, head, body and feet all going through the same hole.',
          'Tuck your chin as you enter so your head hides between your arms.',
          'Once in the water, tilt your fingertips up slightly so you do not go too deep.',
        ],
      },
      {
        type: 'note',
        text: 'Many pools ban diving during public swim. Dive only at allowed times and places, and only after checking the water is deep enough.',
      },
      {
        type: 'faq', h: 'Frequently asked questions',
        items: [
          { q: 'How do backstroke starts work?', a: 'Backstrokers start in the water, facing the wall and holding the grips. They throw themselves backward into a streamline.' },
          { q: 'I belly flop and it hurts.', a: 'This usually happens when you straighten your legs too early and fly out flat. Go back to the kneeling dive and relearn the fingertips-first angle.' },
        ],
      },
    ],
    related: ['turns', 'underwater', 'freestyle'],
  },

  {
    key: 'turns',
    group: 'skills',
    name: 'Open Turns and Flip Turns',
    sub: 'Changing direction at the wall',
    level: 2,
    card: 'Change direction at the wall without stopping, open or flip.',
    title: 'How to Do Swimming Turns | Open Turn and Flip Turn Step by Step',
    description: 'Step-by-step open turns and flip turns, the turn rules for each stroke, how to stop water going up your nose, and drills that make flip turns feel natural.',
    h1: 'Turns: Open Turns and Flip Turns',
    intro: [
      'A turn is how you change direction at the wall and push off again. In a 25 m pool you turn three times in every 100 m, so smooth turns improve your times and keep your rhythm going.',
      'Start with the open turn, touching the wall with your hand, and once freestyle feels easy, try the somersault flip turn. Each stroke also has its own rules for touching the wall.',
    ],
    sections: [
      {
        type: 'steps', h: 'Open turn',
        items: [
          { t: 'Touch', d: 'Touch the wall and pull your knees to your chest to make yourself small.' },
          { t: 'Turn', d: 'Release one hand and rotate your body sideways as you take a breath.' },
          { t: 'Push off', d: 'Push off with both feet and bring your arms overhead into a streamline.' },
        ],
      },
      {
        type: 'steps', h: 'Flip turn',
        items: [
          { t: 'Judge the distance', d: 'Take your last stroke when you see the T mark on the bottom, about 2 m from the wall.' },
          { t: 'Somersault', d: 'Tuck your chin, pull your knees to your chest and roll forward.' },
          { t: 'Plant the feet', d: 'After the roll your feet land on the wall with your body facing up.' },
          { t: 'Push and rotate', d: 'Push off and rotate onto your front as you glide away.' },
        ],
      },
      {
        type: 'table', h: 'Turn rules by stroke',
        head: ['Stroke', 'How you touch the wall'],
        rows: [
          ['Freestyle', 'Any part of the body may touch, flip turns allowed'],
          ['Backstroke', 'Touch on your back, though a flip turn that rolls onto the front and turns immediately is allowed'],
          ['Breaststroke', 'Both hands must touch at the same time'],
          ['Butterfly', 'Both hands must touch at the same time'],
        ],
      },
      {
        type: 'mistakes', h: 'Common flip turn mistakes',
        items: [
          { t: 'Water up the nose', why: 'Holding your breath while rolling lets water rush into your nose.', fix: 'Hum out steadily through your nose throughout the roll.' },
          { t: 'Too far from or too close to the wall', why: 'Misjudging the distance means your feet miss the wall or your knees jam.', fix: 'Use the T mark and count strokes so you flip from the same spot every time.' },
        ],
      },
      {
        type: 'faq', h: 'Frequently asked questions',
        items: [
          { q: 'Flip turns make me dizzy.', a: 'Almost everyone loses their sense of direction at first. Practicing somersaults in the middle of the lane without a wall helps you adjust quickly.' },
          { q: 'Can I flip turn during public lap swim?', a: 'Usually yes, but if someone is resting at the wall you could collide, so an open turn is safer then. Follow lane etiquette as well.' },
        ],
      },
    ],
    related: ['start', 'underwater', 'lane-etiquette'],
  },

  {
    key: 'underwater',
    group: 'skills',
    name: 'Underwater Swimming and Dolphin Kick',
    sub: 'The fast phase after starts and turns',
    level: 3,
    card: 'The fastest phase after starts and turns, done underwater.',
    title: 'Underwater Dolphin Kick | Streamline, the 15 m Rule and Safe Practice',
    description: 'The underwater phase after starts and turns: streamline, dolphin kick, the 15 m rule and the breaststroke pullout, plus the hidden danger of breath-holding practice.',
    h1: 'Underwater Swimming and the Dolphin Kick',
    intro: [
      'In competitive swimming, the underwater phase is the stretch after a start or turn where you dolphin kick below the surface. With no surface drag, it is one of the fastest parts of a race.',
      'Breath-holding practice carries real risks, though. This page covers position and rules while putting safe practice first.',
    ],
    sections: [
      {
        type: 'note',
        text: 'Never hyperventilate with rapid breaths before swimming underwater. It delays the urge to breathe and can cause a sudden blackout underwater. Never hold breath-holding contests, and always practice with someone watching.',
      },
      {
        type: 'list', h: 'Underwater streamline',
        items: [
          'Stack your hands overhead and squeeze your ears with your arms.',
          'Look at the bottom and keep one straight line from head to toe.',
          'Staying about 1 m below the surface avoids the drag of surface waves.',
        ],
      },
      {
        type: 'steps', h: 'Dolphin kick practice',
        items: [
          { t: 'Wave at the wall', d: 'Hold the wall face down and make a wave that moves the chest and hips in turn.' },
          { t: 'Dolphin kick on your back', d: 'Kick on your back so you can learn the rhythm without worrying about breathing.' },
          { t: 'Short underwater swims', d: 'Push off in streamline, do only three or four kicks and surface.' },
        ],
      },
      {
        type: 'table', h: 'Underwater rules in racing',
        head: ['Stroke', 'Rule'],
        rows: [
          ['Freestyle, backstroke, butterfly', 'The head must break the surface within 15 m of the start and each turn'],
          ['Breaststroke', 'After the start and each turn, one arm pull, one dolphin kick and one breaststroke kick are allowed underwater'],
        ],
      },
      {
        type: 'faq', h: 'Frequently asked questions',
        items: [
          { q: 'My ears hurt when I swim underwater.', a: 'Pressure increases with depth and can squeeze your ears. Stay near the surface, and stop and see an ENT specialist if the pain continues.' },
          { q: 'My dolphin kick does not move me forward.', a: 'Bending only at the knees produces almost no propulsion. Try fins to feel a wave that starts at the chest and flows to the toes.' },
        ],
      },
    ],
    related: ['butterfly', 'turns', 'start'],
  },

  {
    key: 'im',
    group: 'skills',
    name: 'Individual Medley (IM)',
    sub: 'All four strokes in one race',
    level: 3,
    card: 'Butterfly, backstroke, breaststroke and freestyle in a single swim.',
    title: 'Individual Medley (IM) | Stroke Order, Transition Turns and Pacing',
    description: 'The individual medley order (butterfly, backstroke, breaststroke, freestyle), how it differs from the medley relay, transition turn rules, pacing and how to start IM.',
    h1: 'Individual Medley: All Four Strokes in One Swim',
    intro: [
      'In the individual medley, one swimmer swims butterfly, backstroke, breaststroke and freestyle in a set order. Because it demands all four strokes, it is seen as a test of all-round swimming ability.',
      'It is popular at masters meets and makes a great next goal once you know all four strokes. Learn the order and the transition rules and you can try a short IM right away.',
    ],
    sections: [
      {
        type: 'table', h: 'IM and medley relay order',
        lead: 'In the medley relay, four swimmers take one stroke each, and backstroke leads off because it starts in the water.',
        head: ['Event', 'Leg 1', 'Leg 2', 'Leg 3', 'Leg 4'],
        rows: [
          ['Individual medley', 'Butterfly', 'Backstroke', 'Breaststroke', 'Freestyle'],
          ['Medley relay', 'Backstroke', 'Breaststroke', 'Butterfly', 'Freestyle'],
        ],
      },
      {
        type: 'list', h: 'Transition turn rules',
        items: [
          'Butterfly to backstroke: touch with both hands, then push off on your back.',
          'Backstroke to breaststroke: you must touch the wall while still on your back.',
          'Breaststroke to freestyle: touch with both hands at the same time.',
          'The freestyle leg must be a stroke other than the first three, so swimmers use front crawl.',
        ],
      },
      {
        type: 'text', h: 'Pacing',
        paras: [
          'Spending too much on the opening butterfly leg makes the back half fall apart. Swim the fly for rhythm, save energy, and push harder on breaststroke and freestyle for a better overall time.',
          'If you are new to IM, start with a 100 m IM in a 25 m pool, one length of each stroke. It is also the best distance for practicing transition turns.',
        ],
      },
      {
        type: 'faq', h: 'Frequently asked questions',
        items: [
          { q: 'What IM distances are there?', a: 'Meets usually feature the 200 m and 400 m IM, and short course meets also include the 100 m IM. Adult swimmers often start with 100 m.' },
          { q: 'Can I try IM if my butterfly is weak?', a: 'For short distances, absolutely. Practice holding a relaxed rhythm on the butterfly leg without forcing it.' },
        ],
      },
    ],
    related: ['butterfly', 'turns', 'backstroke'],
  },
];
