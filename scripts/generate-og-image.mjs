import sharp from 'sharp';
import path from 'path';

// 1200x630 (1.905:1) Open Graph & LinkedIn Project Link Card image
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22678A"/>
      <stop offset="100%" stop-color="#164963"/>
    </linearGradient>
    <filter id="iconShadow" x="-15%" y="-15%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#164963" flood-opacity="0.22"/>
    </filter>
  </defs>

  <!-- Crisp pure white background (blends seamlessly with LinkedIn cards) -->
  <rect width="1200" height="630" fill="#FFFFFF"/>

  <!-- Centered Horizontal Brand Lockup -->
  <g transform="translate(150, 195)">
    <!-- App Icon Badge (240x240) -->
    <g transform="translate(0, 0)">
      <rect width="240" height="240" rx="58" fill="url(#iconGrad)" filter="url(#iconShadow)"/>
      <!-- South-West Rounded Arrow -->
      <path d="M162 78 L78 162 M78 162 H134 M78 162 V106"
            fill="none"
            stroke="#FFFFFF"
            stroke-width="22"
            stroke-linecap="round"
            stroke-linejoin="round"/>
    </g>

    <!-- Wordmark + Beta Pill + Subtitle -->
    <g transform="translate(296, 12)">
      <text x="0" y="142"
            font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
            font-size="172"
            font-weight="800"
            letter-spacing="-6"
            fill="#14313F">Here!</text>

      <!-- Beta Pill (aligned flush with subtitle right edge) -->
      <g transform="translate(454, 30)">
        <rect width="160" height="70" rx="35" fill="#E3EEF3" stroke="#1F5F80" stroke-opacity="0.28" stroke-width="2.5"/>
        <text x="80" y="47"
              font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
              font-size="36"
              font-weight="700"
              fill="#1F5F80"
              text-anchor="middle">beta</text>
      </g>

      <!-- Clean Tagline -->
      <text x="5" y="216"
            font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
            font-size="36"
            font-weight="700"
            letter-spacing="2.1"
            fill="#5B6B73">STUDENT ATTENDANCE SYSTEM</text>
    </g>
  </g>
</svg>
`;

async function main() {
  const targetPath = path.resolve('public/assets/og-image.png');
  await sharp(Buffer.from(svg))
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(targetPath);

  const trimmed = await sharp(targetPath).trim().toBuffer({ resolveWithObject: true });
  console.log('Generated:', targetPath);
  console.log('Left margin:', -trimmed.info.trimOffsetLeft, 'Right margin:', 1200 - (-trimmed.info.trimOffsetLeft + trimmed.info.width));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
