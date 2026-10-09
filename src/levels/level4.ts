import type { StoryboardConfig } from '../engine/types';

export const level4: StoryboardConfig = {
  id: 'level_4',
  levelNumber: 4,
  title: 'The Waiting Room',
  subtitle: 'Message Queues & Asynchronous Workers',
  description: 'Buffer spike traffic with a decoupled queuing bay so backend workers never drop a heavy request.',
  unlockedByDefault: true,
  beats: [
    // BEAT 1 [cinematic, Panel 1 "The Heavy Task"]
    {
      id: 'beat1_heavy_task_arrival',
      type: 'cinematic',
      panelNumber: 1,
      panelTitle: 'Heavy Task Arrives',
      caption: 'A customer requests a massive batch video render job.',
      cameraShot: 'closeupBuilding',
      autoAdvance: true,
      duration: 3.8,
      speechBubbles: [
        { speaker: 'employee', text: 'Render 10,000 video files right now!', icon: 'question', delay: 0.6 },
      ],
    },

    // BEAT 2 [simulate, "The Synchronous Freeze"]
    {
      id: 'beat2_sync_bottleneck',
      type: 'simulate',
      panelNumber: 2,
      panelTitle: 'Front Desk Freeze',
      caption: 'The front desk freezes trying to do heavy work synchronously.',
      cameraShot: 'wide',
      simDuration: 4.8,
      trafficRate: 15,
      targetCapacity: 20,
      problemTriggerTime: 2.0,
      problemDescription: 'HTTP 504 Gateway Timeout: All web server threads blocked on heavy video encode.',
      speechBubbles: [
        { speaker: 'guard', text: 'Front desk frozen! System timeout 504.', icon: 'x', delay: 2.2 },
      ],
    },

    // BEAT 3 [decision, "How do we handle long-running operations?"]
    {
      id: 'beat3_decision_queue',
      type: 'decision',
      question: 'How do we prevent slow background jobs from locking the web server?',
      cameraShot: 'decisionPullback',
      options: [
        {
          id: 'opt_sync_block',
          title: 'Synchronous Processing (Keep Waiting)',
          tag: 'Direct Blocking',
          description: 'Keep the user HTTP connection open for 10 minutes until the entire video encodes.',
          dioramaType: 'sync_block',
          isCorrect: false,
          feedbackText: 'Disaster! Client connections drop after 30 seconds with 504 Gateway Timeout.',
        },
        {
          id: 'opt_message_queue',
          title: 'Decoupled Message Queue (Kafka / RabbitMQ)',
          tag: 'Asynchronous Queue Buffer',
          description: 'Return instant HTTP 202 Accepted, push job into queue bay, let worker pool process in background.',
          dioramaType: 'queue_buffer',
          isCorrect: true,
          feedbackText: 'Brilliant! Web server stays 100% responsive while background workers process at steady speed.',
        },
      ],
    },

    // BEAT 4 [interact, Panel 3 "The Queue Bay"]
    {
      id: 'beat4_queue_interaction',
      type: 'interact',
      panelNumber: 3,
      panelTitle: 'The Queuing Bay Station',
      caption: 'Enqueue heavy tasks and dispatch worker consumers.',
      cameraShot: 'deskCloseup',
      targetId: 'registration_desk',
      hintText: 'Buffer heavy jobs into message queue',
      actionType: 'click',
      completionEvent: 'queue_processed',
      interactionMode: 'queue_station',
    },

    // BEAT 5 [simulate, Panel 4 "Smooth Asynchronous Throughput"]
    {
      id: 'beat5_queue_surge',
      type: 'simulate',
      panelNumber: 4,
      panelTitle: 'Decoupled Steady Flow',
      caption: 'Tasks buffered smoothly. Response latency drops to 3ms.',
      cameraShot: 'wide',
      simDuration: 4.5,
      trafficRate: 25,
      targetCapacity: 150,
      problemTriggerTime: 999, // Smooth flow!
      showRushHourCounter: true,
      speechBubbles: [
        { speaker: 'guard', text: 'Queue depth: 10. Front desk responding in 3ms!', icon: 'check', delay: 1.0 },
      ],
    },

    // BEAT 6 [concept, THE CORE IDEA: Message Queues]
    {
      id: 'beat6_concept_queue',
      type: 'concept',
      cameraShot: 'wide',
      caption: 'Core Architecture: Message Queues & Workers.',
      concept: {
        title: 'Message Queues & Asynchronous Workers (RabbitMQ & Kafka)',
        subtitle: 'Decoupling Producers from Consumers',
        definition: 'A message queue is an asynchronous service-to-service buffer where jobs are placed by producers and drained by background consumer workers.',
        analogy: 'Taking a numbered order ticket at a busy bakery. The cashier takes your money instantly, hands you a ticket, and you step aside while bakers bake your cake.',
        diagramType: 'queue_buffer',
        coreIdeaBanner: 'Never make your web server wait for slow, heavy work. Acknowledge immediately (202 Accepted) and delegate to background workers via a queue.',
        yellowBanner: {
          title: 'MESSAGE QUEUE = Asynchronous Buffer',
          subtext: 'Producers push at burst speeds. Consumers pull at steady capacity. The system never crashes.',
        },
        mappingTable: [
          { realWorld: 'Numbered Bakery Order Ticket', tech: 'Message / Event Payload (JSON)' },
          { realWorld: 'Cashier Giving Instant Receipt', tech: 'HTTP 202 Accepted (Task ID Returned)' },
          { realWorld: 'Kitchen Bakers Cooking in Back', tech: 'Background Consumer Workers (Celery / BullMQ)' },
          { realWorld: 'Counter Order Ticket Spindle', tech: 'FIFO Queue Buffer (RabbitMQ / SQS / Kafka)' },
          { realWorld: 'Buzzer Vibrating When Ready', tech: 'WebSocket / Webhook Completion Event' },
        ],
        flowSteps: [
          '1. Client sends heavy request: POST /api/video/render',
          '2. API server puts job payload onto Message Queue',
          '3. Server immediately returns HTTP 202 Accepted with { jobId: "task_99" }',
          '4. Background worker node dequeues task and runs heavy compute',
          '5. Worker stores output in cloud storage and notifies client via webhook',
        ],
        commonMethods: [
          { name: 'FIFO Queue (First In, First Out)', icon: 'key' },
          { name: 'Pub/Sub Event Streaming', icon: 'globe' },
          { name: 'Dead-Letter Queue (DLQ)', icon: 'fingerprint' },
          { name: 'Worker Autoscaling', icon: 'smartphone' },
        ],
        pros: [
          'Prevents web servers from freezing or dropping client HTTP connections',
          'Smooths sudden traffic spikes without crashing backend databases',
          'Enables fault tolerance: failed jobs can be safely retried from the queue',
        ],
        cons: [
          'Eventual consistency: results are not available immediately to the client',
          'Additional operational complexity to manage queue brokers and worker fleets',
        ],
        realWorldExamples: [
          { company: 'Netflix', usage: 'Queues terabytes of video encoding and subtitle generation tasks across thousands of cloud worker nodes.' },
          { company: 'Uber', usage: 'Processes millions of GPS ride events and fare calculations per second via Apache Kafka event streams.' },
          { company: 'Stripe', usage: 'Buffers millions of webhook events into queues to guarantee 100% reliable delivery even if recipient servers are temporarily down.' },
        ],
      },
    },

    // BEAT 7 [quiz]
    {
      id: 'beat7_quiz_queue',
      type: 'quiz',
      cameraShot: 'wide',
      caption: 'Final Architecture Challenge.',
      question: 'Why should heavy background tasks (like PDF rendering) be moved to a Message Queue?',
      explanation: 'Message queues decouple slow background processing from the fast web server. The web server returns an immediate HTTP 202 Accepted response, preventing connection timeouts and thread pool saturation.',
      xpReward: 300,
      nextLevelTeaser: {
        levelTitle: 'Architectura Campus Master!',
        description: 'You have mastered Scaling, Authentication, Authorization, In-Memory Caching, and Message Queues! Your cloud campus is bulletproof.',
      },
      options: [
        {
          id: 'q_queue_correct',
          label: 'To immediately free the web server and prevent client connection timeouts',
          diagramDescription: 'Decoupled async workers handle heavy load without blocking users',
          isCorrect: true,
        },
        {
          id: 'q_queue_wrong_cpu',
          label: 'Because queues magically make CPU-heavy video encoding 1000x faster',
          diagramDescription: 'Compute work still takes the same time, but does not block users',
          isCorrect: false,
        },
        {
          id: 'q_queue_wrong_db',
          label: 'To avoid saving any files or records into databases',
          diagramDescription: 'Workers still write completed results to database and storage',
          isCorrect: false,
        },
      ],
    },
  ],
};
