const fs = require('fs');
const path = require('path');
const process = require('process');
const { execSync } = require('child_process');

// check if cocoapods-spm is installed and install if not
const gems = execSync('gem list').toString();
if (!gems.includes('cocoapods-spm')) {
    console.log('cocoapods-spm not installed. Installing...');
    try {
        execSync('gem install cocoapods-spm');
    } catch (error) {
        console.error(error);
        console.error('Failed to install cocoapods-spm. Please install it manually.');
        process.exit(1);
    }
}

// open Podfile
const projectRoot = process.env.INIT_CWD;
const podfilePath = path.join(projectRoot, 'ios', 'Podfile');

const pluginRegex = /### START WHISPERKIT PLUGIN SCRIPT ###[\s\S]*### END WHISPERKIT PLUGIN SCRIPT ###/;
const pluginScript = `\n
### START WHISPERKIT PLUGIN SCRIPT ###

# This script was automatically added by the whisper-kit-expo library upon installation.
# The same cannot happen for uninstallation: 
# https://docs.npmjs.com/cli/v10/using-npm/scripts#a-note-on-a-lack-of-npm-uninstall-scripts
# Remove this script manually if you are uninstalling the whisper-kit-expo library.
# Learn more about cocoapods-spm, used to integrate SPM dependencies with CocoaPods, here:
# https://github.com/trinhngocthuyen/cocoapods-spm

plugin "cocoapods-spm"

config_cocoapods_spm(
  dont_prebuild_macros: true,
  default_macro_config: "debug"
)

spm_pkg "WhisperKit",
  :url => "https://github.com/argmaxinc/WhisperKit.git",
  :version => "0.6.0",
  :products => ["WhisperKit"]
### END WHISPERKIT PLUGIN SCRIPT ###
`;

if (!fs.existsSync(podfilePath)) {
    console.warn(`Could not file Podfile at path: ${podfilePath}. whisper-kit-expo requires a bare Expo workflow, read more here:
    https://docs.expo.dev/workflow/prebuild/
    If you are using a bare workflow but installing whisper-kit-expo cannot find the Podfile, 
    you can manually add the following script to your Podfile: \n${pluginScript}`);
    process.exit(0);
}

const podfile = fs.readFileSync(podfilePath).toString();

// If the script has already been added, do not add again
if (pluginRegex.test(podfile)) {
    console.log('Plugin script already exists in Podfile');
} else {
    fs.appendFileSync(podfilePath, pluginScript);
}

// update gitignore to ignore SPM pods directory
const gitignorePath = path.join(projectRoot, '.gitignore');

if (!fs.existsSync(gitignorePath)) {
    console.warn(`Could not find .gitignore at path: ${gitignorePath}. 
    Add the following line to your .gitignore file to ignore the SPM Pods directory:
    ios/.spm.pods`);
    process.exit(0);
}
const gitignore = fs.readFileSync(gitignorePath).toString();
const ignoreSPM = `\n
# Ignore SPM Pods directory
ios/.spm.pods
`;
if (!gitignore.includes('ios/.spm.pods')) {
    fs.appendFileSync(gitignorePath, ignoreSPM);
}
