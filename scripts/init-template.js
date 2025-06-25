#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectName = process.argv[2];

if (!projectName) {
  console.error('Please provide a project name');
  console.error('Usage: npx brandify-template <project-name>');
  process.exit(1);
}

// Create project directory
fs.mkdirSync(projectName);
process.chdir(projectName);

// Initialize git repository
execSync('git init');

// Copy template files
const templateDir = path.join(__dirname, '..', 'template');
const files = fs.readdirSync(templateDir);

files.forEach((file) => {
  const sourcePath = path.join(templateDir, file);
  const targetPath = path.join(process.cwd(), file);

  if (file === 'package.json') {
    const packageJson = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
    packageJson.name = projectName;
    fs.writeFileSync(targetPath, JSON.stringify(packageJson, null, 2));
  } else {
    fs.copyFileSync(sourcePath, targetPath);
  }
});

// Install dependencies
console.log('Installing dependencies...');
execSync('npm install');

console.log(`
🎉 Your Brandify template project has been created!

Next steps:
1. cd ${projectName}
2. Update firebase-info.ts with your Firebase configuration
3. npm start

Happy coding! 🚀
`);
