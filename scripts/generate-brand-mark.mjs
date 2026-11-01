import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 130" width="1080" height="260">
  <defs>
    <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22678A"/>
      <stop offset="100%" stop-color="#164963"/>
    </linearGradient>
    <filter id="subtleShadow" x="-10%" y="-10%" width="125%" height="125%">
      <feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#164963" flood-opacity="0.2"/>
    </filter>
  </defs>

  <!-- App Icon Badge -->
  <g transform="translate(12, 12)">
    <rect width="106" height="106" rx="26" fill="url(#iconGrad)" filter="url(#subtleShadow)"/>
    <!-- South-West Rounded Arrow -->
    <path d="M72 34 L34 72 M34 72 H60 M34 72 V46" 
          fill="none" 
          stroke="#FFFFFF" 
          stroke-width="9.5" 
          stroke-linecap="round" 
          stroke-linejoin="round"/>
  </g>

  <!-- Wordmark Text -->
  <g transform="translate(138, 26)">
    <text x="0" y="58" 
          font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" 
          font-size="62" 
          font-weight="800" 
          letter-spacing="-2.2" 
          fill="#14313F">Here!</text>
    
    <!-- Beta Pill -->
    <g transform="translate(190, 16)">
      <rect width="60" height="28" rx="14" fill="#E3EEF3" stroke="#1F5F80" stroke-opacity="0.25" stroke-width="1.5"/>
      <text x="30" y="19" 
            font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" 
            font-size="14" 
            font-weight="700" 
            fill="#1F5F80" 
            text-anchor="middle">beta</text>
    </g>

    <!-- Subtitle / Category Label -->
    <text x="2" y="85" 
          font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" 
          font-size="14" 
          font-weight="700" 
          letter-spacing="0.9" 
          fill="#5B6B73">STUDENT ATTENDANCE SYSTEM</text>
  </g>
</svg>
`;

async function main() {
  const targetPath = path.resolve('public/assets/brand-mark.png');
  await sharp(Buffer.from(svg))
    .png()
    .toFile(targetPath);
  console.log('Successfully generated clean brand-mark.png at:', targetPath);

  // Also crop public/assets/logo.png cleanly so it has no 250px white margins!
  const originalLogo = path.resolve('public/assets/logo.png');
  // Crop the 495x495 icon and give it transparent rounded corners
  const iconBuffer = await sharp(originalLogo)
    .extract({ left: 277, top: 252, width: 495, height: 495 })
    .toBuffer();

  const maskSvg = `
    <svg width="495" height="495">
      <rect x="0" y="0" width="495" height="495" rx="80" ry="80" fill="#fff"/>
    </svg>
  `;

  await sharp(iconBuffer)
    .composite([{ input: Buffer.from(maskSvg), blend: 'dest-in' }])
    .png()
    .toFile(path.resolve('public/assets/logo-clean.png'));

  console.log('Successfully generated clean transparent logo-clean.png');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
