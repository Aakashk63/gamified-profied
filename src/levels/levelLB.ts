import type { StoryboardConfig } from '../engine/types';

export const levelLB: StoryboardConfig = {
  id: 'level_lb',
  levelNumber: 1,
  title: 'Level 1: The Traffic Director',
  subtitle: 'Load Balancing & Reverse Proxies',
  description: 'Two offices are open, but everyone rushes to Office 1! Introduce a Load Balancer to evenly distribute traffic across your infrastructure.',
  unlockedByDefault: true,
  beats: [
    // BEAT 1 [cinematic, panel 1 "Two Offices, One Habit"]
    {
      id: 'beat1_two_offices_old_habit',
      type: 'cinematic',
      panelNumber: 1,
      panelTitle: 'Two Offices, One Habit',
      caption: 'Two offices are built, but visitors have an old habit...',
      cameraShot: 'wide',
      autoAdvance: true,
      duration: 4.5,
      speechBubbles: [
        { speaker: 'employee', text: 'We have two offices now!', icon: 'idCard', delay: 0.6 },
        { speaker: 'employee', text: 'Everyone still runs to Office 1!', icon: 'question', delay: 2.0 },
      ],
    },

    // BEAT 2 [simulate, panel 2 "Office 1 Overloaded"]
    {
      id: 'beat2_uneven_surge',
      type: 'simulate',
      panelNumber: 2,
      panelTitle: 'The Bottleneck Returns',
      caption: 'Office 1 is 100% full & jammed! Office 2 is completely empty.',
      cameraShot: 'wide',
      simDuration: 5.0,
      trafficRate: 18,
      targetCapacity: 50,
      problemTriggerTime: 1.8,
      problemDescription: 'Office 1 Overloaded (100%), Office 2 Empty (0%)!',
      speechBubbles: [
        { speaker: 'guard', text: 'Office 1 door is stuck! Office 2 is empty!', icon: 'x', delay: 2.2 },
      ],
    },

    // BEAT 3 [decision, "How do we direct traffic?"]
    {
      id: 'beat3_decision_load_balancer',
      type: 'decision',
      question: 'Office 1 is full, Office 2 is empty. How do we direct traffic?',
      cameraShot: 'decisionPullback',
      options: [
        {
          id: 'opt_client_guess',
          title: 'Put a Sign Board at Office 1',
          tag: 'Client Guesswork (Manual)',
          description: 'Ask overcrowded visitors at Office 1 door to turn around and walk over to Office 2.',
          dioramaType: 'sync_block',
          isCorrect: false,
          feedbackText: 'Failed! Visitors still rush Office 1 first, causing huge lines and confusion.',
        },
        {
          id: 'opt_load_balancer',
          title: 'Deploy a Load Balancer',
          tag: 'Reverse Proxy & Traffic Router',
          description: 'Place a smart router at the entrance fork to evenly distribute traffic across both offices.',
          dioramaType: 'load_balancer',
          isCorrect: true,
          feedbackText: 'Success! The Load Balancer alternates traffic 50/50 with zero bottlenecks!',
        },
      ],
    },

    // BEAT 4 [interact, panel 3 "Traffic Router Station"]
    {
      id: 'beat4_router_interactive',
      type: 'interact',
      panelNumber: 3,
      panelTitle: 'Traffic Dispatcher',
      caption: 'Configure and activate the Load Balancer router.',
      cameraShot: 'wide',
      targetId: 'load_balancer_router',
      hintText: 'Inspect algorithms and deploy the load balancer',
      actionType: 'click',
      completionEvent: 'load_balancer_deployed',
      interactionMode: 'load_balancer_station',
    },

    // BEAT 5 [simulate, panel 4 "Balanced Rush Hour"]
    {
      id: 'beat5_balanced_rush_hour',
      type: 'simulate',
      panelNumber: 4,
      panelTitle: 'Balanced Rush Hour',
      caption: 'Traffic split 50/50! Both buildings operate smoothly at 50% load.',
      cameraShot: 'wide',
      simDuration: 4.8,
      trafficRate: 20,
      targetCapacity: 60,
      problemTriggerTime: 999, // Smooth flow!
      showRushHourCounter: true,
      speechBubbles: [
        { speaker: 'guard', text: 'Both offices running smoothly at 50% load!', icon: 'check', delay: 1.6 },
      ],
    },

    // BEAT 6 [concept, THE CORE IDEA]
    {
      id: 'beat6_concept_lb',
      type: 'concept',
      cameraShot: 'wide',
      caption: 'Core Architecture: Load Balancing.',
      concept: {
        title: 'Load Balancing (Reverse Proxy)',
        subtitle: 'The Traffic Cop of Distributed Systems',
        definition: 'A Load Balancer distributes incoming network traffic evenly across a group of backend servers to maximize throughput, minimize response time, and prevent overload.',
        analogy: 'An airport traffic coordinator directing passengers to Security Line A, Line B, or Line C so lines move at equal speed.',
        diagramType: 'load_balancer',
        coreIdeaBanner: 'Scaling adds more servers. A Load Balancer ensures they actually share the work!',
        yellowBanner: {
          title: 'LOAD BALANCER = Who Goes Where?',
          subtext: 'Distributes client requests and automatically bypasses crashed servers.',
        },
        mappingTable: [
          { realWorld: 'Incoming Commuters', tech: 'Client HTTP Requests' },
          { realWorld: 'Entrance Fork in Road', tech: 'Reverse Proxy / Load Balancer IP' },
          { realWorld: 'Office 1 & Office 2', tech: 'Backend Server Pool (Nodes)' },
          { realWorld: 'Alternating Left / Right', tech: 'Round-Robin Algorithm' },
          { realWorld: 'Checking Door Readiness', tech: 'Health Check (Heartbeat Ping)' },
          { realWorld: 'Directing to Shorter Line', tech: 'Least Connections Algorithm' },
        ],
        flowSteps: [
          '1. Client sends request to the single Load Balancer IP / DNS address',
          '2. Load Balancer selects server via algorithm (Round Robin / Least Conn)',
          '3. Verifies backend server health status (HTTP 200 OK ping)',
          '4. Forwards request to optimal healthy server (Reverse Proxy)',
          '5. Returns backend response back to client transparently',
        ],
        commonMethods: [
          { name: 'Round Robin', icon: 'globe' },
          { name: 'Least Conn', icon: 'smartphone' },
          { name: 'IP Hash (Sticky)', icon: 'fingerprint' },
          { name: 'Health Checks', icon: 'key' },
        ],
        pros: [
          'High Availability: Automatically reroutes around crashed servers',
          'Scalability: Add or remove backend servers without updating client apps',
          'Zero Downtime: Enables rolling software deployments and maintenance',
        ],
        cons: [
          'Can be a single point of failure without active-passive backup pairs',
          'Sticky sessions require centralized session stores (e.g., Redis)',
        ],
        realWorldExamples: [
          { company: 'AWS ALB', usage: 'Distributes millions of web requests across EC2 autoscaling groups.' },
          { company: 'NGINX & HAProxy', usage: 'Battle-tested open-source reverse proxies handling trillions of requests.' },
          { company: 'Cloudflare', usage: 'Global Anycast DNS load balances queries across 300+ data centers globally.' },
        ],
      },
    },

    // BEAT 7 [quiz]
    {
      id: 'beat7_quiz_lb',
      type: 'quiz',
      cameraShot: 'wide',
      caption: 'Quick Architecture Challenge.',
      question: 'What does a Load Balancer do if one of the backend servers crashes?',
      explanation: 'Load balancers perform continuous health checks. When a server fails, it is immediately removed from the active pool and traffic routes to surviving servers with zero downtime.',
      xpReward: 200,
      options: [
        {
          id: 'q_fail_all',
          label: 'Crashes the whole website with 500 error',
          diagramDescription: 'All user connections immediately drop',
          isCorrect: false,
        },
        {
          id: 'q_health_reroute',
          label: 'Health check detects it & routes to healthy servers',
          diagramDescription: 'Automatic failover to surviving nodes with zero downtime',
          isCorrect: true,
        },
      ],
    },
  ],
};
