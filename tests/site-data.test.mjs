import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

test('Brand and showcase assets exist in public/assets and public/favicon.png', () => {
  const loginLogo = path.join(rootDir, 'public', 'assets', 'loginlogo.png');
  const brandMark = path.join(rootDir, 'public', 'assets', 'brand-mark.png');
  const ogImage = path.join(rootDir, 'public', 'assets', 'og-image.png');
  const logo = path.join(rootDir, 'public', 'assets', 'logo.png');
  const favicon = path.join(rootDir, 'public', 'favicon.png');

  assert.equal(fs.existsSync(loginLogo), true, 'public/assets/loginlogo.png must exist');
  assert.equal(fs.existsSync(brandMark), true, 'public/assets/brand-mark.png must exist');
  assert.equal(fs.existsSync(ogImage), true, 'public/assets/og-image.png must exist');
  assert.equal(fs.existsSync(logo), true, 'public/assets/logo.png must exist');
  assert.equal(fs.existsSync(favicon), true, 'public/favicon.png must exist');
  assert.ok(fs.statSync(loginLogo).size > 1000, 'loginlogo.png should not be empty');
  assert.ok(fs.statSync(brandMark).size > 1000, 'brand-mark.png should not be empty');
  assert.ok(fs.statSync(ogImage).size > 5000, 'og-image.png should not be empty');
  assert.ok(fs.statSync(logo).size > 1000, 'logo.png should not be empty');

  const showcaseFiles = [
    'group-workspace.png',
    'group-share-code.png',
    'group-join.png',
    'live-scanner.png',
    'scan-manual.png',
    'scan-walkin.png',
    'events-hub.png',
    'group-analytics.png',
    'event-analytics.png',
    'analytics-sessions.png',
    'biometric-roster.png',
    'attendee-history.png',
    'role-permissions.png',
    'audit-log.png',
  ];
  for (const file of showcaseFiles) {
    const filePath = path.join(rootDir, 'public', 'assets', 'showcase', file);
    assert.equal(fs.existsSync(filePath), true, `public/assets/showcase/${file} must exist`);
    assert.ok(fs.statSync(filePath).size > 50000, `public/assets/showcase/${file} must be a real screenshot`);
  }
});

test('Legal documents match official legal terms and privacy policy 1:1', () => {
  const legalSource = fs.readFileSync(path.join(rootDir, 'src', 'data', 'legal.ts'), 'utf8');

  // Privacy Policy headings & key phrases
  const privacyChecks = [
    '1. Overview & Purpose',
    'Here! is an attendance check-in platform designed for student organizations, clubs, and academic events.',
    '2. Biometric & Face Recognition Data',
    'Facial Feature Vectors: When an attendee is registered with face data, facial landmarks and feature embeddings are generated on-device using a lightweight neural network (MobileFaceNet).',
    'No Third-Party Sharing: Biometric representations are strictly used for matching roster members within your student organization events.',
    '3. Information Collected',
    '4. Data Ownership & Deletion',
    '5. Security & Offline Storage',
    '6. Updates to This Policy',
    'October 2026',
  ];

  for (const snippet of privacyChecks) {
    assert.ok(
      legalSource.includes(snippet),
      `Privacy Policy must contain exact phrase: "${snippet}"`
    );
  }

  // Terms & Conditions headings & key phrases
  const termsChecks = [
    '1. Acceptance of Terms',
    'By accessing or using Here!, you agree to be bound by these Terms and Conditions.',
    '2. User Roles & Responsibilities',
    '3. Prohibited Conduct',
    'Falsify, tamper with, or forge attendance records.',
    '4. Biometric Registration Consent',
    '5. Limitation of Liability & Availability',
    '6. Termination',
  ];

  for (const snippet of termsChecks) {
    assert.ok(
      legalSource.includes(snippet),
      `Terms & Conditions must contain exact phrase: "${snippet}"`
    );
  }
});

test('Release fetcher configures GitHub releases endpoint and v2.1.2-beta static fallback', () => {
  const releaseSource = fs.readFileSync(path.join(rootDir, 'src', 'data', 'release.ts'), 'utf8');

  assert.ok(
    releaseSource.includes('https://api.github.com/repos/Meowtys/here-releases/releases'),
    'Must use Meowtys/here-releases /releases endpoint'
  );
  assert.ok(
    releaseSource.includes(
      'https://github.com/Meowtys/here-releases/releases/download/v2.1.2-beta/here-v2.1.2-beta.apk'
    ),
    'Must include static fallback APK download URL for v2.1.2-beta'
  );
  assert.ok(
    releaseSource.includes('https://github.com/Meowtys/here-releases/releases/tag/v2.1.2-beta'),
    'Must include release page URL'
  );
  assert.ok(
    releaseSource.includes('https://github.com/Meowtys/here-releases/releases/latest'),
    'Must include latest release URL'
  );
  assert.ok(
    releaseSource.includes('102f9efb970fde9e20ee58e917df19bc0b4f610fbd4ded0562a41367927c7d95'),
    'Must include SHA-256 checksum'
  );
  assert.ok(releaseSource.includes('com.meowtys.here'), 'Must include package name com.meowtys.here');
  assert.ok(releaseSource.includes('buildNumber: 17'), 'Must include Build 17');
  assert.ok(releaseSource.includes('131.5 MB'), 'Must include 131.5 MB size');
});

test('Changelog contains clean user-focused release notes for v2.1.2-beta', () => {
  const changelogSource = fs.readFileSync(path.join(rootDir, 'src', 'data', 'changelog.ts'), 'utf8');

  assert.ok(changelogSource.includes('Transfer Group Ownership'), 'Must include Transfer Group Ownership');
  assert.ok(changelogSource.includes('Safer Group Handoff'), 'Must include Safer Group Handoff');
  assert.ok(changelogSource.includes('Smoother Leave Experience'), 'Must include Smoother Leave Experience');
  assert.ok(changelogSource.includes('Settings Polish'), 'Must include Settings Polish');
  assert.ok(
    changelogSource.includes('102f9efb970fde9e20ee58e917df19bc0b4f610fbd4ded0562a41367927c7d95'),
    'Changelog must include v2.1.2-beta SHA-256 checksum'
  );
  assert.ok(changelogSource.includes('Interactive Terms & Privacy Links'), 'Must retain v2.1.1-beta release notes');
});

test('No references to private repositories exist in source code', () => {
  const forbidden = ['here', 'next'].join('-');
  const searchDirs = ['src'];
  for (const dir of searchDirs) {
    const fullDir = path.join(rootDir, dir);
    if (!fs.existsSync(fullDir)) continue;

    function scan(d) {
      for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
        const fullPath = path.join(d, entry.name);
        if (entry.isDirectory()) {
          scan(fullPath);
        } else if (/\.(ts|mjs|astro|html|json)$/.test(entry.name)) {
          const fileContent = fs.readFileSync(fullPath, 'utf8');
          assert.equal(
            fileContent.toLowerCase().includes(forbidden),
            false,
            `File ${fullPath} must not contain references to private repository`
          );
        }
      }
    }
    scan(fullDir);
  }
});

test('Built dist HTML outputs exist and contain required copy, real showcase screenshots, and links', () => {
  const indexHtmlPath = path.join(rootDir, 'dist', 'index.html');
  const privacyHtmlPath = path.join(rootDir, 'dist', 'privacy', 'index.html');
  const termsHtmlPath = path.join(rootDir, 'dist', 'terms', 'index.html');
  const changelogHtmlPath = path.join(rootDir, 'dist', 'changelog', 'index.html');

  assert.equal(fs.existsSync(indexHtmlPath), true, 'dist/index.html must be generated');
  assert.equal(fs.existsSync(privacyHtmlPath), true, 'dist/privacy/index.html must be generated');
  assert.equal(fs.existsSync(termsHtmlPath), true, 'dist/terms/index.html must be generated');
  assert.equal(fs.existsSync(changelogHtmlPath), true, 'dist/changelog/index.html must be generated');

  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  assert.ok(indexHtml.includes('Download for Android (.apk)'), 'Landing page must contain primary APK CTA');
  assert.ok(indexHtml.includes('/changelog'), 'Landing page must link to Changelog');
  assert.ok(indexHtml.includes('here-v2.1.2-beta.apk'), 'Landing page must include v2.1.2-beta APK link');
  assert.ok(
    indexHtml.includes('102f9efb970fde9e20ee58e917df19bc0b4f610fbd4ded0562a41367927c7d95'),
    'Landing page must display SHA-256 checksum'
  );
  assert.ok(indexHtml.includes('Face-First Check-In'), 'Landing page must highlight Face-First on-the-go registration');
  assert.ok(indexHtml.includes('No pre-built roster needed'), 'Landing page must highlight no pre-built roster needed');
  assert.ok(indexHtml.includes('Single-Session &amp; Multi-Session Events') || indexHtml.includes('Single-Session & Multi-Session Events'), 'Landing page must highlight both 1-session and multi-session events');
  assert.ok(indexHtml.includes('brand-mark.png'), 'Landing page must render cropped crisp brand-mark.png');
  assert.ok(
    indexHtml.includes('https://youre-here.vercel.app/assets/og-image.png'),
    'Landing page must expose absolute og:image URL for LinkedIn and social previews'
  );
  assert.ok(indexHtml.includes('id="showcase"'), 'Landing page must include interactive showcase section');
  assert.ok(
    indexHtml.includes('Explore Real Android Screens from Here!') || indexHtml.includes('See Here! in Action on Android'),
    'Landing page must include showcase heading'
  );

  // Check all gallery screenshots are present in the showcase
  const allShowcaseScreens = [
    '/assets/showcase/group-workspace.png',
    '/assets/showcase/group-share-code.png',
    '/assets/showcase/group-join.png',
    '/assets/showcase/live-scanner.png',
    '/assets/showcase/scan-manual.png',
    '/assets/showcase/scan-walkin.png',
    '/assets/showcase/events-hub.png',
    '/assets/showcase/group-analytics.png',
    '/assets/showcase/event-analytics.png',
    '/assets/showcase/analytics-sessions.png',
    '/assets/showcase/biometric-roster.png',
    '/assets/showcase/attendee-history.png',
    '/assets/showcase/role-permissions.png',
    '/assets/showcase/audit-log.png',
  ];
  for (const screenPath of allShowcaseScreens) {
    assert.ok(indexHtml.includes(screenPath), `Showcase must render ${screenPath}`);
  }
  assert.ok(indexHtml.includes('data-copy-sha='), 'Landing page must provide 1-click SHA-256 copy controls');

  assert.ok(indexHtml.includes('1. Create or Join a Group'), 'Landing page must include Quick Start steps');

  const privacyHtml = fs.readFileSync(privacyHtmlPath, 'utf8');
  assert.ok(privacyHtml.includes('Privacy Policy'), 'Privacy page must render title');
  assert.ok(privacyHtml.includes('MobileFaceNet'), 'Privacy page must render biometric section');
  assert.ok(privacyHtml.includes('Last updated: October 2026'), 'Privacy page must render Last updated badge');

  const termsHtml = fs.readFileSync(termsHtmlPath, 'utf8');
  assert.ok(termsHtml.includes('Terms &amp; Conditions') || termsHtml.includes('Terms & Conditions'), 'Terms page must render title');
  assert.ok(termsHtml.includes('Biometric Registration Consent'), 'Terms page must render consent section');

  const changelogHtml = fs.readFileSync(changelogHtmlPath, 'utf8');
  assert.ok(changelogHtml.includes('Changelog &amp; Release Notes') || changelogHtml.includes('Changelog & Release Notes'), 'Changelog page must render title');
  assert.ok(changelogHtml.includes('v2.1.2-beta'), 'Changelog must include latest version');
  assert.ok(changelogHtml.includes('Build 17'), 'Changelog must include Build 17');
  assert.ok(changelogHtml.includes('com.meowtys.here'), 'Changelog must include package name');
  assert.ok(
    changelogHtml.includes('102f9efb970fde9e20ee58e917df19bc0b4f610fbd4ded0562a41367927c7d95'),
    'Changelog must display v2.1.2-beta SHA-256 checksum'
  );
  assert.ok(changelogHtml.includes('Transfer Group Ownership'), 'Changelog must include Transfer Group Ownership');
  assert.ok(changelogHtml.includes('Safer Group Handoff'), 'Changelog must include Safer Group Handoff');
  assert.ok(changelogHtml.includes('v2.1.1-beta'), 'Changelog must retain v2.1.1-beta entry');
});
