import { execSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const rootDir = process.cwd();
const distDir = resolve(rootDir, 'dist');

if (!existsSync(resolve(distDir, 'index.html'))) {
  console.error('Error: dist/index.html not found. Run `npm run build` first.');
  process.exit(1);
}

const remoteUrl = execSync('git remote get-url origin', { cwd: rootDir, encoding: 'utf8' }).trim();
const gitDir = resolve(distDir, '.git');

if (existsSync(gitDir)) {
  rmSync(gitDir, { recursive: true, force: true });
}

const run = (cmd) => execSync(cmd, { cwd: distDir, stdio: 'inherit' });

try {
  run('git init -b gh-pages');
  run('git add -A');
  run('git commit -m "deploy: publish NFG Astro static site"');
  run(`git push --force "${remoteUrl}" gh-pages:gh-pages`);
  console.log('\nDeployed dist/ to origin/gh-pages successfully.');
} finally {
  if (existsSync(gitDir)) {
    rmSync(gitDir, { recursive: true, force: true });
  }
}
