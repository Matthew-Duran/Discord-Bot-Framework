/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const packageJson = require('./package.json');

try {
  fs.accessSync(path.join(__dirname, './', 'node_modules'));
} catch (e) {
  console.log('Please run "npm install" before starting the bot');
  process.exit(1);
}

// Error handling
process.on('uncaughtException', (err) => {
  if (err && err.message && err.message.startsWith('Unhandled MESSAGE_CREATE type')) {
    return;
  }

  // For everything else, crash with the error
  console.log('error', err);
  process.exit(1);
});

let testedPackage = '';
try {
  const modules = Object.keys(packageJson.dependencies);
  modules.forEach((mod) => {
    testedPackage = mod;
    fs.accessSync(path.join(__dirname, './', 'node_modules', mod));
  });
} catch (e) {
  console.log(`Please run "npm install" again! Package "${testedPackage}" is missing.`);
  process.exit(1);
}

process.on('uncaughtException', (error) => console.log(error));
const bot = require('./bot');

bot.start();
