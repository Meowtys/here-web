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
const faviconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <rect x="6" y="6" width="116" height="116" rx="28" fill="#22678A"/>
  <path d="M96 32 L36 92 M36 92 H78 M36 92 V50" 
        fill="none" 
        stroke="#FFFFFF" 
        stroke-width="14" 
        stroke-linecap="round" 
        stroke-linejoin="round"/>
</svg>
`;

async function run() {
  await sharp(Buffer.from(arrowSvg)).png().toFile('public/assets/logo.png');
  await sharp(Buffer.from(faviconSvg)).resize(64, 64).png().toFile('public/favicon.png');
  await sharp(Buffer.from(arrowSvg)).resize(256, 256).png().toFile('C:/Users/Westen/.gemini/antigravity/brain/7f483af0-01e0-4d76-8af3-399c8074c24c/new_arrow_logo_inspect.png');
  console.log('Successfully generated public/assets/logo.png and public/favicon.png');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
