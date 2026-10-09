import type { StoryboardConfig } from '../engine/types';

export const level1: StoryboardConfig = {
  id: 'level_1',
  levelNumber: 1,
  title: 'Who Are You?',
  subtitle: 'The Identity Gatekeeper',
  description: 'Protect the company headquarters by verifying every visitor before they step inside.',
  beats: [
    // BEAT 1 [cinematic, panel 1 "The Company Entrance"]
    {
      id: 'beat1_entrance',
      type: 'cinematic',
      panelNumber: 1,
      panelTitle: 'The Company Entrance',
      caption: 'Every day, many people come to the company.',
      cameraShot: 'sunriseIntro',
      autoAdvance: true,
      duration: 3.6,
    },

    // BEAT 2 [simulate, "The Crowd Grows"]
    {
      id: 'beat2_crowd_grows',
      type: 'simulate',
      panelNumber: 1,
      panelTitle: 'Unchecked Entry',
      caption: "Anyone can walk in. That's dangerous.",
      cameraShot: 'wide',
      simDuration: 4.8,
      trafficRate: 8,
      targetCapacity: 30,
      problemTriggerTime: 2.0,
      problemDescription: 'Intruder entered open building without verification.',
    },

    // BEAT 3 [decision, "How do we protect the entrance?"]
    {
      id: 'beat3_decision_guard',
      type: 'decision',
      question: 'How do we know who is really an employee?',
      cameraShot: 'decisionPullback',
      options: [
        {
          id: 'opt_leave_open',
          title: 'Leave Gate Open',
          tag: 'No Security',
          description: 'Let everyone walk freely inside without any check.',
          dioramaType: 'gate_open',
          isCorrect: false,
          feedbackText: 'Zero verification lets intruders steal equipment without resistance!',
        },
        {
          id: 'opt_ask_name',
          title: 'Ask Their Name Only',
          tag: 'Honour System',
          description: 'Guard asks "Who are you?" and trusts whoever says "Employee".',
          dioramaType: 'ask_name',
          isCorrect: false,
          feedbackText: 'Anyone can lie! Claims without proof do not protect a system.',
        },
        {
          id: 'opt_verify_id',
          title: 'Guard Verifies ID with Records',
          tag: 'Authentication (Secure)',
          description: 'Guard scans company ID badge and checks the employee database.',
          dioramaType: 'verify_id',
          isCorrect: true,
          feedbackText: 'Verifying credentials against stored records confirms true identity!',
        },
      ],
    },

    // BEAT 4 [cinematic, panel 2 "Security Guard Asks"]
    {
      id: 'beat4_guard_asks',
      type: 'cinematic',
      panelNumber: 2,
      panelTitle: 'Security Guard Asks',
      caption: 'Guard inspects incoming credentials at the gate.',
      cameraShot: 'gateCloseup',
      autoAdvance: false,
      speechBubbles: [
        { speaker: 'guard', text: 'Who are you?', icon: 'question', delay: 0.2 },
        { speaker: 'employee', text: 'I work at this company.', icon: 'idCard', delay: 1.2 },
        { speaker: 'guard', text: 'Please show your ID card.', icon: 'idCard', delay: 2.2 },
      ],
    },

    // BEAT 5 [interact, panel 3 "Verification"]
    {
      id: 'beat5_verification_station',
      type: 'interact',
      panelNumber: 3,
      panelTitle: 'Verification',
      caption: 'Scan ID badge and check against records.',
      cameraShot: 'gateCloseup',
      targetId: 'gate_scanner',
      hintText: 'Inspect visitor badges at the gate',
      actionType: 'click',
      completionEvent: 'queue_verified',
      interactionMode: 'verify_queue',
    },

    // BEAT 6 [simulate, "Too Many Unknown Faces"]
    {
      id: 'beat6_no_id_arrives',
      type: 'simulate',
      panelNumber: 3,
      panelTitle: 'Unregistered Visitor',
      caption: "What if they don't have an ID?",
      cameraShot: 'gateCloseup',
      simDuration: 4.2,
      trafficRate: 4,
      targetCapacity: 20,
      problemTriggerTime: 1.5,
      speechBubbles: [
        { speaker: 'guard', text: 'No ID? Cannot enter.', icon: 'x', delay: 1.2 },
        { speaker: 'employee', text: 'I am new here!', icon: 'question', delay: 2.2 },
      ],
    },

    // BEAT 7 [interact, panel 4 "What If They Don't Have An ID?"]
    {
      id: 'beat7_registration_desk',
      type: 'interact',
      panelNumber: 4,
      panelTitle: 'What If They Have No ID?',
      caption: 'Registered once. Stored in the records.',
      cameraShot: 'deskCloseup',
      targetId: 'registration_desk',
      hintText: 'Attach employee details to enroll',
      actionType: 'click',
      completionEvent: 'registered_complete',
      interactionMode: 'registration_form',
    },

    // BEAT 8 [cinematic, panel 5 "Next Time They Arrive"]
    {
      id: 'beat8_token_fast_lane',
      type: 'cinematic',
      panelNumber: 5,
      panelTitle: 'Next Time They Arrive',
      caption: 'No need to ask every detail again.',
      cameraShot: 'gateCloseup',
      autoAdvance: true,
      duration: 4.0,
      speechBubbles: [
        { speaker: 'guard', text: 'ID matches. Welcome in!', icon: 'check', delay: 0.8 },
      ],
    },

    // BEAT 9 [simulate, "Rush Hour With Authentication"]
    {
      id: 'beat9_rush_hour',
      type: 'simulate',
      panelNumber: 5,
      panelTitle: 'Secure Rush Hour',
      caption: 'Authentication protects the company during rush hour.',
      cameraShot: 'wide',
      simDuration: 4.5,
      trafficRate: 14,
      targetCapacity: 50,
      problemTriggerTime: 999, // No failure! Smooth operation
      showRushHourCounter: true,
    },

    // BEAT 10 [concept, THE CORE IDEA]
    {
      id: 'beat10_concept_auth',
      type: 'concept',
      cameraShot: 'wide',
      caption: 'Core Architecture: Authentication.',
      concept: {
        title: 'Authentication (AuthN)',
        subtitle: 'The Identity Verification Gateway',
        definition: 'Authentication is the process of verifying that someone or something is who they claim to be.',
        analogy: 'A security guard checking your official photo ID before allowing you through the front gate.',
        diagramType: 'auth_mapping',
        coreIdeaBanner: 'Before you enter a company, someone verifies your identity. Before you enter an application, the system verifies your identity.',
        yellowBanner: {
          title: 'AUTHENTICATION = Who Are You?',
          subtext: 'It verifies the identity of the user before allowing access.',
        },
        mappingTable: [
          { realWorld: 'Visiting Person', tech: 'Client User / Request' },
          { realWorld: 'Company ID Card', tech: 'Credentials / Password / Token' },
          { realWorld: 'Security Guard', tech: 'Authentication Service (AuthN)' },
          { realWorld: 'Employee Records Binder', tech: 'User Database (Auth Store)' },
          { realWorld: 'Registering at Front Desk', tech: 'User Sign-Up / Enrollment' },
          { realWorld: 'Presenting ID at Gate', tech: 'User Login / Auth Handshake' },
          { realWorld: 'Fast Entry Pass Next Day', tech: 'Session Cookie / JWT Token' },
        ],
        flowSteps: [
          '1. User submits login request with credentials',
          '2. Auth system hashes password or inspects token',
          '3. Verifies credentials against user database',
          '4. Matches identity or denies access (401)',
          '5. Issues signed session token for fast subsequent visits',
        ],
        commonMethods: [
          { name: 'Password / PIN', icon: 'key' },
          { name: 'One-Time Passcode (OTP)', icon: 'smartphone' },
          { name: 'Biometrics (Face / Fingerprint)', icon: 'fingerprint' },
          { name: 'Social Sign-In (OAuth / SSO)', icon: 'globe' },
        ],
        pros: [
          'Guarantees accountability & prevents unauthorized access',
          'Protects sensitive company resources from intruders',
          'Enables personalized user sessions and role mapping',
        ],
        cons: [
          'Can cause user friction if authentication flow is clunky',
          'Stolen or leaked credentials compromise account security',
        ],
        realWorldExamples: [
          { company: 'Google Sign-In', usage: 'OAuth 2.0 / OpenID Connect single sign-on across millions of apps.' },
          { company: 'Banking Apps & Aadhaar', usage: 'Multi-factor authentication (MFA) with OTP and biometrics.' },
          { company: 'JWT Tokens', usage: 'Stateless encrypted tokens carried in request headers for zero database lookups.' },
        ],
      },
    },

    // BEAT 11 [quiz]
    {
      id: 'beat11_quiz_auth',
      type: 'quiz',
      cameraShot: 'wide',
      caption: 'Quick Architecture Challenge.',
      question: 'Which real-world action represents Authentication?',
      explanation: 'Authentication strictly answers "Who are you?" by verifying identity (checking the ID badge), before deciding what permissions they have.',
      xpReward: 200,
      nextLevelTeaser: {
        levelTitle: 'Level 2: What Are You Allowed To Do?',
        description: 'Authentication confirms your identity. Authorization decides whether you can open the Finance Vault.',
      },
      options: [
        {
          id: 'q_auth_correct',
          label: 'Guard checking your photo ID card at the entrance',
          diagramDescription: 'Verifying identity: Who are you?',
          isCorrect: true,
        },
        {
          id: 'q_auth_wrong_keys',
          label: 'Guard giving you the key to the executive vault',
          diagramDescription: 'Permissions & rights: Authorization',
          isCorrect: false,
        },
        {
          id: 'q_auth_wrong_door',
          label: 'Automatic door opening for a delivery cart',
          diagramDescription: 'Physical routing & motion sensor',
          isCorrect: false,
        },
      ],
    },
  ],
};
