export interface LegalSection {
  heading: string;
  body: string;
}

export interface LegalDocument {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export const PRIVACY_POLICY: LegalDocument = {
  title: 'Privacy Policy',
  subtitle: 'Biometric face data handling & data retention',
  lastUpdated: 'October 2026',
  sections: [
    {
      heading: '1. Overview & Purpose',
      body:
        'Here! is an attendance check-in platform designed for student organizations, clubs, and academic events. This Privacy Policy explains how we collect, store, and process information when you use the app.',
    },
    {
      heading: '2. Biometric & Face Recognition Data',
      body:
        '• Facial Feature Vectors: When an attendee is registered with face data, facial landmarks and feature embeddings are generated on-device using a lightweight neural network (MobileFaceNet).\n\n' +
        "• Stored Samples: The app stores normalized numerical embeddings and a small thumbnail image in the organization's secure database to match attendees during event check-ins.\n\n" +
        '• No Third-Party Sharing: Biometric representations are strictly used for matching roster members within your student organization events. They are never sold, rented, or shared with third parties or external advertising networks.',
    },
    {
      heading: '3. Information Collected',
      body:
        '• Account Information: Display name, email address, and Google account profile photo provided upon authentication.\n\n' +
        '• Attendee Rosters: Student ID numbers, full names, and optional facial sample data submitted by organization administrators.\n\n' +
        '• Attendance Records: Event check-in and check-out timestamps, verification status, and checker attribution.',
    },
    {
      heading: '4. Data Ownership & Deletion',
      body:
        '• Group Administrators and Owners retain authority over attendee roster data and attendance records within their respective groups.\n\n' +
        '• Attendees may request removal of their face data or attendance records by contacting their organization admin or group owner.\n\n' +
        '• Deleting an attendee permanently removes their face embedding samples and registered roster profile from the group.',
    },
    {
      heading: '5. Security & Offline Storage',
      body:
        '• Data in transit and at rest is secured via Google Cloud Firestore with role-based security rules.\n\n' +
        '• When taking attendance offline, records and cached roster profiles are held in device local storage and synced automatically upon reconnecting to the internet.',
    },
    {
      heading: '6. Updates to This Policy',
      body:
        'We may update this Privacy Policy from time to time to reflect system enhancements or legal requirements. Updated versions will be accessible directly within the application settings.',
    },
  ],
};

export const TERMS_AND_CONDITIONS: LegalDocument = {
  title: 'Terms & Conditions',
  subtitle: 'Usage rules & organizer responsibilities',
  lastUpdated: 'October 2026',
  sections: [
    {
      heading: '1. Acceptance of Terms',
      body:
        'By accessing or using Here!, you agree to be bound by these Terms and Conditions. The application is intended for student organizations, school clubs, event organizers, and attendees for legitimate attendance tracking.',
    },
    {
      heading: '2. User Roles & Responsibilities',
      body:
        '• Owners: The creator of a group is responsible for governing group settings, managing administrators, and overseeing data retention.\n\n' +
        '• Administrators: Authorized to create events, manage rosters, approve members, and export attendance records.\n\n' +
        '• Checkers / Members: Responsible for conducting attendance verification honestly and accurately during organization events.',
    },
    {
      heading: '3. Prohibited Conduct',
      body:
        'Users agree not to:\n\n' +
        '• Falsify, tamper with, or forge attendance records.\n' +
        '• Spoof identity or submit unauthorized biometric data of non-consenting individuals.\n' +
        '• Attempt to bypass or circumvent group access permissions or system security rules.',
    },
    {
      heading: '4. Biometric Registration Consent',
      body:
        'Organization administrators and checkers must obtain appropriate verbal or written consent from attendees prior to capturing and enrolling their facial samples into the group roster.',
    },
    {
      heading: '5. Limitation of Liability & Availability',
      body:
        'Here! is provided "as is" and "as available". While we strive for high accuracy and reliable offline operation, organizations should verify attendance logs prior to finalizing formal academic or club requirements.',
    },
    {
      heading: '6. Termination',
      body:
        'We reserve the right to revoke access or terminate group workspaces that violate these terms, engage in malicious activity, or abuse system resources.',
    },
  ],
};
