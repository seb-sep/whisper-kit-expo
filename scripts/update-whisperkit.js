const fs = require('fs');
const path = require('path');
const { cwd } = require('process');

const packagePath = path.join(cwd(), 'package.json');

if (!fs.existsSync(packagePath)) {
    console.error(`Could not find package.json at path: ${packagePath}.`);
    process.exit(1);
}

let packageJson = JSON.parse(fs.readFileSync(packagePath).toString());

let releaseTag = process.argv[2];
if (releaseTag === undefined) {
    console.error('Please provide a release tag as an argument to this script.');
    process.exit(1);
}
if (releaseTag.startsWith('v')) {
    releaseTag = releaseTag.substring(1);
}

packageJson['whisperKit']['version'] = releaseTag;

fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));


