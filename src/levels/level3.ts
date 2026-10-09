import type { StoryboardConfig } from '../engine/types';

export const level3: StoryboardConfig = {
  id: 'level_3',
  levelNumber: 3,
  title: 'Memory Fast-Lane',
  subtitle: 'In-Memory Caching (Redis & Memcached)',
  description: 'Relieve database overload by introducing an ultra-fast memory clerk right next to the office door.',
  unlockedByDefault: true,
  beats: [
    // BEAT 1 [cinematic, Panel 1 "The Deep Archive"]
    {
      id: 'beat1_deep_archive',
      type: 'cinematic',
      panelNumber: 1,
      panelTitle: 'The Central Archive',
      caption: 'Every request walks all the way to the database.',
      cameraShot: 'closeupBuilding',
      autoAdvance: true,
      duration: 3.8,
      speechBubbles: [
        { speaker: 'employee', text: 'I need the product catalog again!', icon: 'question', delay: 0.8 },
      ],
    },

    // BEAT 2 [simulate, "The Database Overload"]
    {
      id: 'beat2_db_bottleneck',
      type: 'simulate',
      panelNumber: 2,
      panelTitle: 'Disk Overload',
      caption: 'Repeating the exact same disk lookup over and over.',
      cameraShot: 'wide',
      simDuration: 4.8,
      trafficRate: 12,
      targetCapacity: 25,
      problemTriggerTime: 2.0,
      problemDescription: 'Database disk I/O saturated at 100% processing redundant queries.',
      speechBubbles: [
        { speaker: 'guard', text: 'Database is sweating! Queue is backed up.', icon: 'x', delay: 2.2 },
      ],
    },

    // BEAT 3 [decision, "How do we speed up repeated reads?"]
    {
      id: 'beat3_decision_caching',
      type: 'decision',
      question: 'How do we handle repeated identical database reads?',
      cameraShot: 'decisionPullback',
      options: [
        {
          id: 'opt_bigger_disk',
          title: 'Buy Bigger Disk Drive',
          tag: 'Disk Scaling (Mechanical)',
          description: 'Keep reading from database disks, just buy slightly larger drives.',
          dioramaType: 'scale_up_tall',
          isCorrect: false,
          feedbackText: 'Mechanical disk I/O is thousands of times slower than RAM! Disk stays congested.',
        },
        {
          id: 'opt_add_redis_cache',
          title: 'Deploy In-Memory Cache (Redis)',
          tag: 'In-Memory Caching (RAM)',
          description: 'Store hot, frequently requested data in ultra-fast RAM at the entrance.',
          dioramaType: 'cache_redis',
          isCorrect: true,
          feedbackText: 'Memory caches answer requests in sub-milliseconds without touching disk!',
        },
      ],
    },

    // BEAT 4 [interact, Panel 3 "The Cache-Aside Flow"]
    {
      id: 'beat4_cache_hit_interaction',
      type: 'interact',
      panelNumber: 3,
      panelTitle: 'Cache-Aside Lookup',
      caption: 'Serve hot items directly from fast RAM.',
      cameraShot: 'deskCloseup',
      targetId: 'registration_desk',
      hintText: 'Inspect memory cache desk to serve request',
      actionType: 'click',
      completionEvent: 'cache_served',
      interactionMode: 'cache_station',
    },

    // BEAT 5 [simulate, Panel 4 "Sub-Millisecond Speed"]
    {
      id: 'beat5_cache_surge',
      type: 'simulate',
      panelNumber: 4,
      panelTitle: 'Lightning Throughput',
      caption: 'Data served from fast memory in milliseconds.',
      cameraShot: 'wide',
      simDuration: 4.5,
      trafficRate: 20,
      targetCapacity: 100,
      problemTriggerTime: 999, // Smooth flow!
      showRushHourCounter: true,
      speechBubbles: [
        { speaker: 'guard', text: 'Cache hit ratio: 98%! Latency: 2ms.', icon: 'check', delay: 1.0 },
      ],
    },

    // BEAT 6 [concept, THE CORE IDEA: Caching]
    {
      id: 'beat6_concept_cache',
      type: 'concept',
      cameraShot: 'wide',
      caption: 'Core Architecture: In-Memory Caching.',
      concept: {
        title: 'In-Memory Caching (Redis & Memcached)',
        subtitle: 'RAM vs. Persistent Disk Storage',
        definition: 'A cache is a high-speed data storage layer which stores a subset of data in RAM so that future requests are served faster.',
        analogy: 'Keeping your favorite notebook on top of your desk instead of walking to the basement archive every 2 minutes.',
        diagramType: 'cache_layer',
        coreIdeaBanner: 'Why travel to the deep database warehouse when you can keep popular answers right on your front desk in RAM?',
        yellowBanner: {
          title: 'CACHE = Fast Temporary In-Memory Storage',
          subtext: 'RAM lookups take ~100 nanoseconds. Hard drive disk reads take ~10 milliseconds (100,000x slower!).',
        },
        mappingTable: [
          { realWorld: 'Front Desk Sticky Note', tech: 'In-Memory Key-Value Store (Redis)' },
          { realWorld: 'Deep Basement Archive', tech: 'Relational Database (PostgreSQL / MySQL)' },
          { realWorld: 'Found Note on Desk', tech: 'Cache Hit (Sub-millisecond latency)' },
          { realWorld: 'Note Missing; Walk to Basement', tech: 'Cache Miss (Fetch DB, write to Cache)' },
          { realWorld: 'Throwing Out Old Notes', tech: 'Cache Expiration (TTL) & Eviction (LRU)' },
        ],
        flowSteps: [
          '1. Application receives request: GET /products/featured',
          '2. Checks cache first: redis.get("featured_products")',
          '3. If found (Cache Hit): Returns immediately in ~1ms',
          '4. If not found (Cache Miss): Queries SQL database on disk',
          '5. Writes result into cache with TTL (Time To Live), returns to client',
        ],
        commonMethods: [
          { name: 'Cache-Aside (Lazy Load)', icon: 'key' },
          { name: 'Write-Through Cache', icon: 'smartphone' },
          { name: 'TTL Expiration Timer', icon: 'fingerprint' },
          { name: 'LRU Eviction Policy', icon: 'globe' },
        ],
        pros: [
          'Dramatic reduction in database read load and server compute costs',
          'Blazing fast response times (sub-5ms) for user experiences',
          'Prevents cascading database failure during sudden traffic spikes',
        ],
        cons: [
          'Risk of serving stale data if cache is not properly invalidated upon updates',
          'Higher memory (RAM) infrastructure cost compared to disk storage',
        ],
        realWorldExamples: [
          { company: 'Twitter / X', usage: 'Caches user timelines in Redis/Twemproxy clusters to render home feeds instantaneously.' },
          { company: 'GitHub', usage: 'Caches repository metadata, pull requests, and permission trees in Redis.' },
          { company: 'Shopify', usage: 'Shields checkout databases during Black Friday traffic flash sales using multi-tier caching.' },
        ],
      },
    },

    // BEAT 7 [quiz]
    {
      id: 'beat7_quiz_cache',
      type: 'quiz',
      cameraShot: 'wide',
      caption: 'Quick Architecture Challenge.',
      question: 'What happens when an application experiences a "Cache Miss"?',
      explanation: 'A Cache Miss occurs when requested data is not currently in RAM. The system queries the database on disk, stores the result into the cache for future requests, and returns it to the user.',
      xpReward: 250,
      nextLevelTeaser: {
        levelTitle: 'Level 4: The Waiting Room',
        description: 'Heavy jobs like video rendering or batch emails are freezing the front door. Discover Message Queues and Asynchronous Workers.',
      },
      options: [
        {
          id: 'q_cache_correct',
          label: 'The system reads from the database, writes the result to cache, and returns it',
          diagramDescription: 'Cache-Aside lazy population pattern',
          isCorrect: true,
        },
        {
          id: 'q_cache_wrong_error',
          label: 'The server crashes and throws HTTP 500 error',
          diagramDescription: 'A cache miss is completely normal and handled gracefully',
          isCorrect: false,
        },
        {
          id: 'q_cache_wrong_ignore',
          label: 'The system ignores the request and does nothing',
          diagramDescription: 'Requests must always be fulfilled',
          isCorrect: false,
        },
      ],
    },
  ],
};
