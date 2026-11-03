import sharp from 'sharp';
import fs from 'fs';

// Generous 512x512 canvas, arrow centered with proportional padding
const arrowSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <!-- Crisp Centered Teal Southwest Arrow matching brand-mark & Flutter app -->
  <path d="M380 132 L144 368 M144 368 H308 M144 368 V204" 
        fill="none" 
        stroke="#22678A" 
        stroke-width="56" 
        stroke-linecap="round" 
        stroke-linejoin="round"/>
</svg>
`;

// Squircle favicon for browser tab visibility across light and dark themes
const squircleFaviconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <linearGradient id="favGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#247196"/>
      <stop offset="100%" stop-color="#1A516E"/>
    </linearGradient>
  </defs>
  <rect x="4" y="4" width="120" height="120" rx="30" fill="url(#favGrad)"/>
  <path d="M92 36 L36 92 M36 92 H78 M36 92 V50" 
        fill="none" 
        stroke="#FFFFFF" 
        stroke-width="15" 
        stroke-linecap="round" 
        stroke-linejoin="round"/>
</svg>
`;

async function run() {
  await sharp(Buffer.from(arrowSvg)).png().toFile('public/assets/logo.png');
  fs.writeFileSync('public/favicon.svg', squircleFaviconSvg.trim(), 'utf8');
  await sharp(Buffer.from(squircleFaviconSvg)).resize(64, 64).png().toFile('public/favicon.png');
  await sharp(Buffer.from(squircleFaviconSvg)).resize(180, 180).png().toFile('public/apple-touch-icon.png');
  console.log('Successfully generated public/assets/logo.png, public/favicon.svg, public/favicon.png, and public/apple-touch-icon.png');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
