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
  releaseUrl?: string;
  checksumSha256?: string;
  items: ChangelogItem[];
}

export const CHANGELOG_RELEASES: ChangelogRelease[] = [
  {
    version: 'v2.1.1-beta',
    buildNumber: 16,
    date: 'Nov 3, 2026',
    title: 'Open Beta: In-App Feedback, Changelog Viewer & Optimized Face Recognition',
    summary:
      'Added interactive Privacy Policy and Terms links on the sign-in screen, in-app feedback and bug reporting, an in-app changelog viewer, and streamlined face enrollment to 5 high-accuracy samples.',
    isLatest: true,
    releaseUrl: 'https://github.com/Meowtys/here-releases/releases/tag/v2.1.1-beta',
    checksumSha256: 'd29f175c4923222754d3e08f382e4ef4dfb55dd89a5a8f0098a2ee964bafaa6d',
    items: [
      {
        type: 'added',
        text: 'Interactive Terms & Privacy Links: Review Privacy Policy and Terms of Use directly on the sign-in screen before getting started.',
      },
      {
        type: 'added',
        text: 'In-App Feedback & Bug Reporting: Share thoughts, report issues, or suggest new features anytime via Settings > Help & Feedback.',
      },
      {
        type: 'added',
        text: 'In-App Changelog Viewer: View release notes and update details directly inside the app under Settings > About Here!.',
      },
      {
        type: 'improved',
        text: 'Optimized Face Recognition: Face enrollment is now streamlined to 5 high-accuracy samples per attendee for faster scanning and reliable recognition.',
      },
      {
        type: 'improved',
        text: 'Stability & Polish: General performance enhancements and a smoother onboarding experience.',
      },
    ],
  },
  {
    version: 'v2.1.0-beta.7',
    buildNumber: 15,
    date: 'Nov 3, 2026',
    title: 'In-App Auto-Updates & Direct Download Channel',
    summary:
      'Added native in-app update checking and installation with integrity verification, and launched a dedicated high-speed download distribution channel.',
    releaseUrl: 'https://github.com/Meowtys/here-releases/releases/tag/v2.1.0-beta.7',
    items: [
      {
        type: 'added',
        text: 'In-App Updates: Added automatic update alerts on launch and a manual "Check for updates" option in Settings with live download progress.',
      },
      {
        type: 'security',
        text: 'Cryptographic Verification: Automatically verifies package integrity before installation to protect against corrupted downloads.',
      },
      {
        type: 'improved',
        text: 'High-Speed Downloads: Migrated APK distribution to a dedicated global channel for faster, reliable direct downloads.',
      },
    ],
  },
  {
    version: 'v2.1.0-beta.6',
    buildNumber: 14,
    date: 'Nov 1, 2026',
    title: 'Performance Optimization & Account Security',
    summary:
      'Standardized official app identity for seamless Google Sign-In, fortified group role permissions, reduced download footprint, and improved offline check-in queuing.',
    releaseUrl: 'https://github.com/Meowtys/here-releases/releases/tag/v2.1.0-beta.6',
    items: [
      {
        type: 'improved',
        text: 'Official App Identity: Finalized official app identifiers to ensure seamless Google Sign-In and reliable automatic updates.',
      },
      {
        type: 'security',
        text: 'Granular Group Security: Enforced strict permission checks so only verified Group Owners and Admins can edit rosters and event settings.',
      },
      {
        type: 'improved',
        text: 'Reduced Download Size: Optimized graphics and app resources to bring the initial download size down to 129.6 MB.',
      },
      {
        type: 'fixed',
        text: 'Offline Sync Reliability: Ensured precise check-in timestamps are preserved and synchronized accurately when reconnecting to the internet.',
      },
    ],
  },
  {
    version: 'v2.1.0-beta.5',
    buildNumber: 13,
    date: 'Oct 31, 2026',
    title: 'Branded Launch, Quick Start Guide & Record Management',
    summary:
      'Introduced a smooth branded splash screen, in-app Quick Start onboarding, individual record management, and improved input assistance.',
    releaseUrl: 'https://github.com/Meowtys/here-releases/releases/tag/v2.1.0-beta.5',
    items: [
      {
        type: 'added',
        text: 'Smooth Launch Animation: Added an official branded splash screen for a smoother, flicker-free app startup.',
      },
      {
        type: 'added',
        text: 'Record Management: Added individual delete actions for time-in and time-out records on attendee cards.',
      },
      {
        type: 'added',
        text: 'Quick Start Guide: Introduced an interactive 4-step onboarding guide accessible anytime from settings and help menus.',
      },
      {
        type: 'improved',
        text: 'Input Assistance: Added helpful character limits and formatting hints when naming groups, events, and attendees.',
      },
      {
        type: 'fixed',
        text: 'Screen Compatibility: Improved scrolling layout and counter visibility on compact phone screens.',
      },
    ],
  },
  {
    version: 'v2.1.0-beta.4',
    buildNumber: 12,
    date: 'Oct 29, 2026',
    title: 'Group Analytics, Attendee Leaderboards & CSV Exports',
    summary:
      'Rolled out high-level organizational analytics, cross-event attendee participation rankings, and 1-tap spreadsheet exports.',
    releaseUrl: 'https://github.com/Meowtys/here-releases/releases/tag/v2.1.0-beta.4',
    items: [
      {
        type: 'added',
        text: 'Group Analytics Dashboard: Track total events, roster members, and active sessions at a glance.',
      },
      {
        type: 'added',
        text: 'Member Leaderboards: View top attendees and cross-event attendance percentages across your organization.',
      },
      {
        type: 'added',
        text: '1-Tap Spreadsheet Exports: Export attendance records in 1 tap with built-in formatting protections for Microsoft Excel and Google Sheets.',
      },
      {
        type: 'improved',
        text: 'Session Retention Bars: Enhanced visual comparison bars to clearly show participant retention between multi-session events.',
      },
    ],
  },
  {
    version: 'v2.1.0-beta.3',
    buildNumber: 11,
    date: 'Oct 27, 2026',
    title: 'Verification Tags & 1-Tap Batch Verification',
    summary:
      'Differentiated biometric face scans from manual inputs with clear tags, added 1-tap batch review for organizers, and automated event locking.',
    releaseUrl: 'https://github.com/Meowtys/here-releases/releases/tag/v2.1.0-beta.3',
    items: [
      {
        type: 'added',
        text: 'Verification Badges: Added clear "Typed ID" vs "Face Verified" tags on attendee attendance cards.',
      },
      {
        type: 'added',
        text: '1-Tap Batch Verification: Organizers can approve pending manual check-ins in one tap under the "To check" review filter.',
      },
      {
        type: 'added',
        text: 'Automatic Event Lock: Events now lock automatically once their scheduled duration concludes to prevent accidental late entries.',
      },
      {
        type: 'improved',
        text: 'Live Scanner Feedback: Enhanced camera viewfinder with real-time detection indicators when matching registered members.',
      },
    ],
  },
  {
    version: 'v2.1.0-beta.1',
    buildNumber: 9,
    date: 'Oct 26, 2026',
    title: 'Multi-Session Events & Arrival Velocity Charts',
    summary:
      'Support for single-window meetings and multi-day / AM-PM conference tracking in one unified interface with arrival velocity graphs.',
    releaseUrl: 'https://github.com/Meowtys/here-releases/releases/tag/v2.1.0-beta.1',
    items: [
      {
        type: 'added',
        text: 'Flexible Event Schedules: Easily switch between a quick 1-session meeting or multi-session AM/PM schedules on event creation.',
      },
      {
        type: 'added',
        text: 'Arrival Velocity Graphs: Visual charts showing check-in velocity across 10, 15, or 30-minute intervals to pinpoint peak arrival times.',
      },
      {
        type: 'improved',
        text: 'Refreshed Navigation Header: View live attendee totals and switch effortlessly between active and archived groups.',
      },
    ],
  },
  {
    version: 'v2.0.0-beta.1',
    buildNumber: 5,
    date: 'Oct 22, 2026',
    title: 'On-Device Face Recognition & Zero-Prep Walk-Ins',
    summary:
      'Rebuilt attendance engine around private on-device facial recognition, automatic offline check-in queuing, and instant walk-in registration.',
    releaseUrl: 'https://github.com/Meowtys/here-releases/releases/tag/v2.0.0-beta.1',
    items: [
      {
        type: 'added',
        text: 'Instant On-Device Facial Matching: Face verification runs locally on your phone in under 350ms with zero cloud delay and full offline support.',
      },
      {
        type: 'added',
        text: 'Zero-Prep Walk-In Registration: Capture face data and Student ID on the first scan without needing to import a pre-existing roster.',
      },
      {
        type: 'added',
        text: 'Automatic Offline Sync: Check in attendees anywhere without Wi-Fi; records queue securely on your device and sync automatically when back online.',
      },
      {
        type: 'security',
        text: 'Privacy-First Biometrics: Photos are never saved, uploaded, or shared; only secure mathematical feature vectors stay on your device with explicit consent.',
      },
    ],
  },
];
