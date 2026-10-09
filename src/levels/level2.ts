import type { StoryboardConfig } from '../engine/types';

export const level2: StoryboardConfig = {
  id: 'level_2',
  levelNumber: 2,
  title: 'What Are You Allowed To Do?',
  subtitle: 'Authorization & Access Control (RBAC)',
  description: 'Authentication confirms your identity. Authorization decides which doors you can open inside the company.',
  unlockedByDefault: true,
  beats: [
    // BEAT 1 [cinematic, panel 1 "You Have Entered The Company"]
    {
      id: 'beat1_entered_company',
      type: 'cinematic',
      panelNumber: 1,
      panelTitle: 'You Have Entered The Company',
      caption: "You're inside. But can you go everywhere?",
      cameraShot: 'corridorCutaway',
      autoAdvance: true,
      duration: 4.2,
      speechBubbles: [
        { speaker: 'guard', text: 'Identity verified. You may enter.', icon: 'check', delay: 0.5 },
      ],
    },

    // BEAT 2 [simulate, "Everyone Goes Everywhere"]
    {
      id: 'beat2_everyone_goes_everywhere',
      type: 'simulate',
      panelNumber: 2,
      panelTitle: 'Everyone Goes Everywhere',
      caption: 'Everyone here is genuine. Yet this is dangerous.',
      cameraShot: 'corridorCutaway',
      simDuration: 5.2,
      trafficRate: 8,
      targetCapacity: 20,
      problemTriggerTime: 1.8,
      problemDescription: 'Security Breach! Intern walked into Finance and leaked salary files.',
      speechBubbles: [
        { speaker: 'employee', text: 'Found the company salary files!', icon: 'question', delay: 0.8 },
        { speaker: 'guard', text: 'Warning! Confidential records leaking!', icon: 'x', delay: 2.2 },
      ],
    },

    // BEAT 3 [decision, "How do we control who opens which door?"]
    {
      id: 'beat3_decision_control_doors',
      type: 'decision',
      question: 'Everyone is verified. Who should open which door?',
      cameraShot: 'decisionPullback',
      options: [
        {
          id: 'opt_master_key',
          title: 'One Master Key for Every Employee',
          tag: 'Root Access (No Boundaries)',
          description: 'Give all verified employees a master key opening every room door in the building.',
          dioramaType: 'master_key',
          isCorrect: false,
          feedbackText: 'Disaster! One stolen key opens everything. Intern leaked all salaries!',
        },
        {
          id: 'opt_recheck_identity',
          title: 'Verify Identity Again at Every Door',
          tag: 'Re-Check ID Only',
          description: 'Put a guard at each door to verify identity. Every verified person can enter.',
          dioramaType: 'verify_every_door',
          isCorrect: false,
          feedbackText: 'Failed! Verified is not allowed. Identity is not permission.',
        },
        {
          id: 'opt_role_permissions',
          title: 'Give Each Role Its Own Permissions (RBAC)',
          tag: 'Role-Based Access Control',
          description: 'Card carries a role. Door reader checks role against permission list. Only matches enter.',
          dioramaType: 'role_permissions',
          isCorrect: true,
          feedbackText: 'Success! RBAC enforces least privilege: only necessary doors open.',
        },
      ],
    },

    // BEAT 4 [cinematic, panel 2 "Different Employees, Different Access"]
    {
      id: 'beat4_different_employees',
      type: 'cinematic',
      panelNumber: 2,
      panelTitle: 'Different Employees, Different Access',
      caption: 'Each role gets only the access it needs.',
      cameraShot: 'corridorCutaway',
      autoAdvance: true,
      duration: 4.5,
      speechBubbles: [
        { speaker: 'employee', text: 'We have different roles and duties.', icon: 'idCard', delay: 0.6 },
        { speaker: 'guard', text: 'Different roles get different access rights.', icon: 'check', delay: 2.0 },
      ],
    },

    // BEAT 5 [interact, "Build The Permissions"]
    {
      id: 'beat5_build_matrix',
      type: 'interact',
      panelNumber: 3,
      panelTitle: 'Build The Permissions',
      caption: 'Build the access matrix: only what they need.',
      cameraShot: 'corridorCutaway',
      targetId: 'access_matrix',
      hintText: 'Tap cells to grant only necessary room access',
      actionType: 'click',
      completionEvent: 'matrix_built',
      interactionMode: 'build_matrix',
    },

    // BEAT 6 [cinematic, panel 3 "Trying To Enter A Restricted Room"]
    {
      id: 'beat6_restricted_room_attempt',
      type: 'cinematic',
      panelNumber: 3,
      panelTitle: 'Trying To Enter A Restricted Room',
      caption: 'Real employee. Still denied. Permission matters.',
      cameraShot: 'financeRoomCloseup',
      autoAdvance: true,
      duration: 4.5,
      speechBubbles: [
        { speaker: 'employee', text: 'I am an employee. Can I enter?', icon: 'question', delay: 0.6 },
        { speaker: 'guard', text: "You're genuine. Not authorized here.", icon: 'x', delay: 2.0 },
      ],
    },

    // BEAT 7 [cinematic, panel 4 "Special Access For The Right Person"]
    {
      id: 'beat7_special_access_granted',
      type: 'cinematic',
      panelNumber: 4,
      panelTitle: 'Special Access For The Right Person',
      caption: 'Authorized credentials unlock sensitive rooms safely.',
      cameraShot: 'financeRoomCloseup',
      autoAdvance: true,
      duration: 4.2,
      speechBubbles: [
        { speaker: 'guard', text: 'You are authorized. You may enter.', icon: 'check', delay: 0.8 },
      ],
    },

    // BEAT 8 [interact, "Be The Door Guard"]
    {
      id: 'beat8_be_the_door_guard',
      type: 'interact',
      panelNumber: 5,
      panelTitle: 'Be The Door Guard',
      caption: 'Inspect badges: allow authorized staff, deny unauthorized.',
      cameraShot: 'financeRoomCloseup',
      targetId: 'door_reader_finance',
      hintText: 'Inspect incoming staff and enforce room permissions',
      actionType: 'click',
      completionEvent: 'door_guard_passed',
      interactionMode: 'door_guard',
    },

    // BEAT 9 [simulate, "Authentication Then Authorization"]
    {
      id: 'beat9_authn_then_authz',
      type: 'simulate',
      panelNumber: 6,
      panelTitle: 'Authentication Then Authorization',
      caption: 'Gate proves identity. Doors enforce permissions.',
      cameraShot: 'dualCheckpoint',
      simDuration: 5.5,
      trafficRate: 12,
      targetCapacity: 100,
      problemTriggerTime: 999, // Smooth dual checkpoint simulation
      showRushHourCounter: true,
      speechBubbles: [
        { speaker: 'guard', text: 'Gate checks WHO. Door checks WHAT.', icon: 'check', delay: 1.0 },
      ],
    },

    // BEAT 10 [concept, THE CORE IDEA]
    {
      id: 'beat10_concept_authorization',
      type: 'concept',
      cameraShot: 'wide',
      caption: 'Core Architecture: Authorization (AuthZ).',
      concept: {
        title: 'Authorization (AuthZ) vs Authentication (AuthN)',
        subtitle: 'Permissions, Roles, and Principle of Least Privilege',
        definition: 'Authorization decides what an authenticated identity is permitted to do, read, or execute across protected system resources.',
        analogy: 'Showing your passport at the border is Authentication. Your boarding pass deciding whether you can sit in First Class is Authorization.',
        diagramType: 'auth_mapping',
        coreIdeaBanner: 'Authentication gets you through the company gate. Authorization decides which doors you can open inside.',
        yellowBanner: {
          title: 'AUTHORIZATION = What are you allowed to do?',
          subtext: 'It controls what a verified user can access inside the system.',
        },
        sideBySide: {
          leftTitle: 'Authentication (AuthN)',
          leftItems: [
            'Who are you?',
            'Happens first at the company gate',
            'Validates identity credentials',
            'Login, password, MFA, session token',
            'Failure: HTTP 401 Unauthorized',
          ],
          rightTitle: 'Authorization (AuthZ)',
          rightItems: [
            'What are you allowed to do?',
            'Happens after entry, at room doors',
            'Checks roles, scopes, and permissions',
            'RBAC, scopes, permission matrix',
            'Failure: HTTP 403 Forbidden',
          ],
        },
        mappingTable: [
          { realWorld: 'Company Employee', tech: 'Authenticated User Account' },
          { realWorld: 'Color-Coded ID Badge', tech: 'Session Token / JWT Token with Claims' },
          { realWorld: 'Security Guard & Door Reader', tech: 'Auth Server & API Gateway Policy Engine' },
          { realWorld: 'Employee Records Book', tech: 'User & Permissions Database' },
          { realWorld: 'Employee Job Role', tech: 'User Role (Role-Based Access Control)' },
          { realWorld: 'Room Door Permission List', tech: 'Access Control List (ACL) & Scopes' },
          { realWorld: 'Door Locked Red (No Permission)', tech: 'HTTP 403 Forbidden Response' },
        ],
        flowSteps: [
          '1. Client sends request with token: GET /api/finance/salaries',
          '2. API Gateway validates token signature and identity (AuthN)',
          '3. Middleware extracts user role: "role": "developer"',
          '4. Evaluates RBAC policy: Developer lacks "finance:read" scope',
          '5. Blocks request immediately and returns HTTP 403 Forbidden',
        ],
        commonMethods: [
          { name: 'RBAC (Role-Based)', icon: 'key' },
          { name: 'Least Privilege', icon: 'fingerprint' },
          { name: 'Scopes & Claims', icon: 'smartphone' },
          { name: 'Admin vs Member', icon: 'globe' },
        ],
        pros: [
          'Limits blast radius from leaks, bugs, or compromised accounts',
          'Enforces Principle of Least Privilege (PoLP) across all APIs',
          'Maintains clear compliance, confidentiality, and audit trails',
        ],
        cons: [
          'Role proliferation: managing hundreds of fine-grained roles gets complex',
          'Overly strict rules can block legitimate productivity if not configured well',
        ],
        realWorldExamples: [
          { company: 'Google Drive', usage: 'Viewer (read-only), Commenter, Editor, and File Owner roles.' },
          { company: 'GitHub', usage: 'Repository roles: Reader, Triage, Writer, Maintainer, and Organization Admin.' },
          { company: 'AWS IAM', usage: 'JSON policy documents defining exact actions (e.g. s3:GetObject) permitted on specific resources.' },
          { company: 'Slack', usage: 'Workspace Primary Owner, Admin, Full Member, Single-Channel Guest.' },
          { company: 'OAuth 2.0', usage: 'Scoped tokens: "This app can read profile, but cannot send emails".' },
        ],
      },
    },

    // BEAT 11 [quiz]
    {
      id: 'beat11_quiz_authorization',
      type: 'quiz',
      cameraShot: 'wide',
      caption: 'Architecture Challenge: Authorization.',
      question: 'Which real-world event represents Authorization?',
      explanation: 'Authorization checks whether a verified person is permitted to perform a specific action, such as checking if an employee has clearance to open the Finance room.',
      xpReward: 250,
      nextLevelTeaser: {
        levelTitle: 'Level 3: Memory Fast-Lane (The Building Is Full)',
        description: 'Repeated database lookups are causing bottlenecks. Discover Redis and In-Memory Caching to accelerate response times.',
      },
      questions: [
        {
          question: 'Which scenario is an example of Authorization?',
          options: [
            {
              id: 'q1_correct_authz',
              label: 'Guard checking badge permissions and denying Developer at the Finance door',
              diagramDescription: 'Checking rights: What are you allowed to do?',
              isCorrect: true,
            },
            {
              id: 'q1_wrong_authn',
              label: 'Guard scanning ID card at the company gate to verify identity',
              diagramDescription: 'Verifying identity: Who are you? (Authentication)',
              isCorrect: false,
            },
            {
              id: 'q1_wrong_register',
              label: 'Receptionist taking a photo to print a brand new ID badge',
              diagramDescription: 'Account enrollment and registration',
              isCorrect: false,
            },
          ],
          explanation: 'Authorization evaluates permissions for a specific resource (such as checking whether a developer has the right to open the Finance room).',
        },
        {
          question: 'A logged-in user clicks "Admin Panel" but has no admin privileges. What must happen?',
          options: [
            {
              id: 'q2_correct_403',
              label: 'Return HTTP 403 Forbidden (Access Denied: Missing Permission)',
              diagramDescription: 'User identity is known, but role lacks admin scope',
              isCorrect: true,
            },
            {
              id: 'q2_wrong_letin',
              label: 'Let them in anyway because they successfully logged in',
              diagramDescription: 'Massive vulnerability: Authentication is not permission',
              isCorrect: false,
            },
            {
              id: 'q2_wrong_login_again',
              label: 'Ask them to type their password again (401 Unauthorized)',
              diagramDescription: 'Unnecessary: Their identity was already verified',
              isCorrect: false,
            },
          ],
          explanation: 'When a user is already authenticated but lacks permissions for an endpoint, the server responds with HTTP 403 Forbidden.',
        },
        {
          question: 'What is the correct architectural security order?',
          options: [
            {
              id: 'q3_correct_order',
              label: 'Gate Check (Authentication: Who are you?) then Door Check (Authorization: What can you do?)',
              diagramDescription: 'Verify identity first, then enforce resource permissions',
              isCorrect: true,
            },
            {
              id: 'q3_wrong_door_first',
              label: 'Door Check (Authorization) before verifying who the person is',
              diagramDescription: 'Cannot check permissions for an unverified identity',
              isCorrect: false,
            },
            {
              id: 'q3_wrong_gate_only',
              label: 'Gate Check only, and let all verified users open every door',
              diagramDescription: 'Eliminates security boundaries and invites data leaks',
              isCorrect: false,
            },
          ],
          explanation: 'Authentication must always occur first to verify who the client is, followed by Authorization to verify what they are allowed to access.',
        },
      ],
      options: [
        {
          id: 'q1_correct_authz',
          label: 'Guard checking badge permissions and denying Developer at the Finance door',
          diagramDescription: 'Checking rights: What are you allowed to do?',
          isCorrect: true,
        },
        {
          id: 'q1_wrong_authn',
          label: 'Guard scanning ID card at the company gate to verify identity',
          diagramDescription: 'Verifying identity: Who are you? (Authentication)',
          isCorrect: false,
        },
        {
          id: 'q1_wrong_register',
          label: 'Receptionist taking a photo to print a brand new ID badge',
          diagramDescription: 'Account enrollment and registration',
          isCorrect: false,
        },
      ],
    },

    // BEAT 12 [outcome, "Level 2 Complete"]
    {
      id: 'beat12_outcome_complete',
      type: 'outcome',
      outcomeType: 'success',
      panelNumber: 6,
      panelTitle: 'Level 2 Complete',
      caption: 'Congratulations! You mastered Role-Based Access Control.',
      cameraShot: 'successCelebration',
      explanationText: 'Your company now enforces Principle of Least Privilege: authentication verifies identity at the gate, and authorization controls access at every room door.',
    },
  ],
};
