export interface ChangelogItem {
  type: 'added' | 'improved' | 'fixed' | 'security';
  text: string;
}

export interface ChangelogRelease {
  version: string;
  buildNumber: number;
  date: string;
  title: string;
  summary: string;
  isLatest?: boolean;
  items: ChangelogItem[];
}

export const CHANGELOG_RELEASES: ChangelogRelease[] = [
  {
    version: 'v2.1.0-beta.6',
    buildNumber: 14,
    date: 'Nov 1, 2026',
    title: 'Production Identity & Performance Hardening',
    summary:
      'Migrated package identity to com.meowtys.here, updated production signing configurations, and reinforced Cloud Firestore security rules.',
    isLatest: true,
    items: [
      {
        type: 'improved',
        text: 'Migrated Android application package name from development default to com.meowtys.here.',
      },
      {
        type: 'security',
        text: 'Hardened Cloud Firestore security rules with granular role-based checks for Group Owners, Admins, and Members.',
      },
      {
        type: 'improved',
        text: 'Optimized build assets and reduced APK footprint down to 129.6 MB.',
      },
      {
        type: 'fixed',
        text: 'Resolved edge-case timestamp synchronization during offline check-in queuing.',
      },
    ],
  },
  {
    version: 'v2.1.0-beta.5',
    buildNumber: 13,
    date: 'Oct 31, 2026',
    title: 'Branded Splash, Quick Start Guide & Record Management',
    summary:
      'Introduced the official You’re Here! branded splash screen, in-app Quick Start onboarding, individual attendance record deletion, and input safety limits.',
    items: [
      {
        type: 'added',
        text: 'Added official You’re Here! animated splash loading screen with pre-decoded logo assets to eliminate startup flash.',
      },
      {
        type: 'added',
        text: 'Added individual delete actions for time-in and time-out records on attendee cards.',
      },
      {
        type: 'added',
        text: 'Introduced in-app 4-step Quick Start Guide accessible from settings and help menus.',
      },
      {
        type: 'improved',
        text: 'Added strict character limits and real-time validation across group, event, and attendee text inputs.',
      },
      {
        type: 'fixed',
        text: 'Refined settings scroll layout and fixed counter visibility bugs on smaller screen viewports.',
      },
    ],
  },
  {
    version: 'v2.1.0-beta.4',
    buildNumber: 12,
    date: 'Oct 29, 2026',
    title: 'Group Analytics, Cross-Event Leaderboards & CSV Exports',
    summary:
      'Rolled out high-level organizational analytics, cross-event attendee participation rankings, and formula-sanitized CSV exports.',
    items: [
      {
        type: 'added',
        text: 'Created Group Analytics dashboard tracking Total Events, Roster Members, and Active Events at a glance.',
      },
      {
        type: 'added',
        text: 'Added top attendees leaderboard and cross-event attendance rate percentages.',
      },
      {
        type: 'added',
        text: 'Integrated 1-tap CSV export with automatic defense against CSV formula injection.',
      },
      {
        type: 'improved',
        text: 'Enhanced multi-session comparison progress bars to clearly show participant drop-off between sessions.',
      },
    ],
  },
  {
    version: 'v2.1.0-beta.3',
    buildNumber: 11,
    date: 'Oct 27, 2026',
    title: 'Attendance Verification Tags & 1-Tap Batch Verification',
    summary:
      'Differentiated biometric face scans from manual inputs with distinct tags and added 1-tap bulk verification for officers.',
    items: [
      {
        type: 'added',
        text: 'Added distinct "Typed ID" vs "Face Verified" badges on student attendance cards.',
      },
      {
        type: 'added',
        text: 'Added 1-tap batch verification button for organizers under the "To check" review filter.',
      },
      {
        type: 'added',
        text: 'Implemented automatic event locking when scheduled event duration has concluded.',
      },
      {
        type: 'improved',
        text: 'Enhanced live door scanner overlay with instant detection feedback and confidence tags.',
      },
    ],
  },
  {
    version: 'v2.1.0-beta.1',
    buildNumber: 9,
    date: 'Oct 26, 2026',
    title: 'Multi-Session Architecture & Single-Session Toggle',
    summary:
      'Support for both quick single-window meetings and multi-day / AM-PM conference tracking in one unified interface.',
    items: [
      {
        type: 'added',
        text: 'Single-session or multi-session toggle on event creation.',
      },
      {
        type: 'added',
        text: 'Arrival velocity histograms supporting 10-minute, 15-minute, and 30-minute bucket intervals.',
      },
      {
        type: 'improved',
        text: 'Refined TealBand header with synchronized attendee counts and active/archived group tabs.',
      },
    ],
  },
  {
    version: 'v2.0.0-beta.1',
    buildNumber: 5,
    date: 'Oct 22, 2026',
    title: 'On-Device MobileFaceNet Biometrics & Zero-Prep Walk-Ins',
    summary:
      'Rebuilt attendance engine around fully on-device facial recognition using MobileFaceNet, offline caching, and instant walk-in registration.',
    items: [
      {
        type: 'added',
        text: 'On-device facial embedding extraction and recognition via MobileFaceNet TFLite model.',
      },
      {
        type: 'added',
        text: 'Zero-prep walk-in registration: capture face and Student ID on first scan without importing a pre-existing roster.',
      },
      {
        type: 'added',
        text: 'Local SQLite offline check-in queue that syncs automatically when Wi-Fi or cellular reconnects.',
      },
      {
        type: 'security',
        text: 'Privacy-first architecture: raw facial photos are never stored or transmitted; only mathematical vector embeddings remain on-device with explicit consent.',
      },
    ],
  },
];
