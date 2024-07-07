#!/usr/bin/env node
const fs = require('fs');
const { execSync } = require('child_process');

const commitMsgFile = process.argv[2];

if (!commitMsgFile) {
  console.error('Commit message file path is missing.');
  process.exit(1);
}

try {
  let commitMsg = fs.readFileSync(commitMsgFile, 'utf-8');

  let prefix = '';

  const changedFilePaths = execSync('git diff --name-only --cached')
    .toString().trim().split('\n');

  let backendAlteration = false;
  let frontendAlteration = false;
  changedFilePaths.forEach((filePath) => {
    if (filePath.startsWith('backend')) {
      backendAlteration = true;
    } else if (filePath.startsWith('frontend')) {
      frontendAlteration = true;
    }
  })

  if (backendAlteration !== frontendAlteration) {
    if (backendAlteration) {
      prefix = "[Backend]"
    } else if (frontendAlteration) {
      prefix = "[Frontend]"
    }
  }

  if (prefix && !commitMsg.trim().startsWith(prefix.trim())) {
    commitMsg = `${prefix} ${commitMsg.trim()}`;
    fs.writeFileSync(commitMsgFile, commitMsg, 'utf-8');
  }

} catch (err) {
  console.error('Error occurred while preparing commit message:', err);
  process.exit(1);
}
