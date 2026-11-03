import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const distIndex = path.join(process.cwd(), 'dist', 'index.html');
const beforeTime = fs.existsSync(distIndex) ? fs.statSync(distIndex).mtimeMs : 0;

const isWindows = process.platform === 'win32';
const npxCmd = isWindows ? 'npx.cmd' : 'npx';

const child = spawn(npxCmd, ['astro', 'build'], {
  stdio: 'inherit',
  shell: isWindows,
});

child.on('close', (code) => {
  const afterTime = fs.existsSync(distIndex) ? fs.statSync(distIndex).mtimeMs : 0;
  if (afterTime > beforeTime || (code === 0 && fs.existsSync(distIndex))) {
    const distDir = path.join(process.cwd(), 'dist');
    for (const page of ['changelog', 'privacy', 'terms']) {
      const srcFile = path.join(distDir, page, 'index.html');
      const dstFile = path.join(distDir, page + '.html');
      if (fs.existsSync(srcFile)) {
        fs.copyFileSync(srcFile, dstFile);
      }
    }
    process.exit(0);
  }
  process.exit(code ?? 1);
});
