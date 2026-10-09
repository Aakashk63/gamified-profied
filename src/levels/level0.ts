import type { StoryboardConfig } from '../engine/types';

export const level0: StoryboardConfig = {
  id: 'level_0',
  levelNumber: 0,
  title: 'Opening Day',
  subtitle: 'The Scaling Paradox',
  description: 'Launch your first corporate office and learn how systems withstand sudden traffic surges.',
  unlockedByDefault: true,
  beats: [
    // 1. Cinematic: Camera flies over island at sunrise
    {
      id: 'beat_sunrise',
      type: 'cinematic',
      caption: 'Every company starts small.',
      cameraShot: 'sunriseIntro',
      autoAdvance: true,
      duration: 3.8,
    },

    // 2. Interact: Tap glowing plot to place first building
    {
      id: 'beat_place_hq',
      type: 'interact',
      caption: 'Tap the glowing plot to build HQ.',
      cameraShot: 'wide',
      targetId: 'plot_hq',
      hintText: 'Click to build office',
      actionType: 'click',
      completionEvent: 'building_placed',
    },

    // 3. Simulate: Employees walk in, load climbs, doors jam
    {
      id: 'beat_simulate_traffic',
      type: 'simulate',
      caption: 'Traffic is surging. Capacity is reached.',
      cameraShot: 'closeupBuilding',
      simDuration: 5.5,
      trafficRate: 10,
      targetCapacity: 25,
      problemTriggerTime: 2.8,
      problemDescription: 'Monolith threshold breached. Single entrance jammed.',
    },

    // 4. Decision: Two pedestal dioramas
    {
      id: 'beat_decision_scale',
      type: 'decision',
      question: 'The office is full. What now?',
      cameraShot: 'decisionPullback',
      options: [
        {
          id: 'scale_vertical',
          title: 'Make Tower Taller',
          tag: 'Vertical Scaling (Scale Up)',
          description: 'Stack more floors onto the single monolithic building.',
          dioramaType: 'scale_up_tall',
          isCorrect: false,
          feedbackText: 'Adding floors does not fix the single congested entrance!',
        },
        {
          id: 'scale_horizontal',
          title: 'Add Second Building',
          tag: 'Horizontal Scaling (Scale Out)',
          description: 'Construct a parallel office building and distribute visitors.',
          dioramaType: 'scale_out_multi',
          isCorrect: true,
          feedbackText: 'Parallel independent offices share the load with zero bottleneck.',
        },
      ],
    },

    // 5. Outcome: Outcome Cinematic
    {
      id: 'beat_outcome',
      type: 'outcome',
      outcomeType: 'success', // Resolved dynamically by BeatRunner based on player choice
      targetChoiceId: 'scale_horizontal',
      highlightWeakPointId: 'building_hq_tower',
      caption: 'Load balanced! Traffic flows smoothly.',
      explanationText: 'Distributing traffic prevents single points of failure.',
    },

    // 6. Concept Card: Visual definition and real world system design
    {
      id: 'beat_concept',
      type: 'concept',
      cameraShot: 'wide',
      caption: 'Core Architecture Concept: Scaling.',
      concept: {
        title: 'Vertical vs. Horizontal Scaling',
        subtitle: 'Scaling Up vs. Scaling Out',
        definition: 'Vertical scaling upgrades a single server’s capacity. Horizontal scaling adds multiple parallel servers.',
        analogy: 'Vertical is building a taller tower with one door. Horizontal is building a second office next door.',
        diagramType: 'vertical_vs_horizontal',
        pros: [
          'Horizontal: No single point of failure (high availability)',
          'Horizontal: Near-infinite scaling ceiling',
          'Vertical: Simple initial setup with no distributed routing',
        ],
        cons: [
          'Vertical: Hard physical hardware limits & expensive downtime',
          'Horizontal: Requires a load balancer & stateless architecture',
        ],
        realWorldExamples: [
          { company: 'Netflix', usage: 'Scales horizontally over thousands of microservice instances across AWS availability zones.' },
          { company: 'Google', usage: 'Distributes billions of search queries across vast clusters of commodity server nodes.' },
        ],
      },
    },

    // 7. Visual Quiz: 1 quick visual question
    {
      id: 'beat_quiz',
      type: 'quiz',
      cameraShot: 'wide',
      caption: 'Quick Architecture Check.',
      question: 'Which architecture prevents a single point of failure?',
      explanation: 'Horizontal scaling runs duplicate independent nodes. If one crashes, others seamlessly keep the system online.',
      xpReward: 150,
      options: [
        {
          id: 'q_monolith',
          label: 'One Huge Mega-Server',
          diagramDescription: 'Single 128-core mainframe server',
          isCorrect: false,
        },
        {
          id: 'q_distributed',
          label: 'Distributed Server Fleet',
          diagramDescription: 'Multiple parallel nodes behind a load balancer',
          isCorrect: true,
        },
      ],
    },
  ],
};

