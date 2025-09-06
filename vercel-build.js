// vercel-build.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Build the frontend
console.log('Building frontend...');
execSync('npm run build', { stdio: 'inherit' });

// Copy API files to dist folder
console.log('Copying API files...');
const apiSrc = path.join(__dirname, 'api');
const apiDest = path.join(__dirname, 'dist', 'api');

if (!fs.existsSync(apiDest)) {
  fs.mkdirSync(apiDest, { recursive: true });
}

const apiFiles = fs.readdirSync(apiSrc);
apiFiles.forEach(file => {
  if (file.endsWith('.js')) {
    fs.copyFileSync(path.join(apiSrc, file), path.join(apiDest, file));
    console.log(`Copied ${file} to dist/api/`);
  }
});

console.log('Build completed successfully!');