# [whisper-kit-expo](https://www.npmjs.com/package/whisper-kit-expo)

# Usage
You must first load the transcriber into memory. This can be done in one of two ways: 

- Wrapping the root component in `TranscriberInitializer`, which loads the transcriber on compnent mount
```
<TranscriberInitializer>
    <children>
</TranscriberInitializer>
```

- Call `loadTranscriber()` explicitly

After this has been done, transcribe a file by calling `transcribe()` with the path to the file. Note that `transcribe()` will fail
if `loadTranscriber()` has never been called, and will block if `loadTranscriber()` has been called but not completed.
`transcribe()` also automatically handles sequential execution with Swift actors, so the function can be called concurrently
across as many components as you like.

# Installation in managed Expo projects

For [managed](https://docs.expo.dev/archive/managed-vs-bare/) Expo projects, please follow the installation instructions in the [API documentation for the latest stable release](#api-documentation). If you follow the link and there is no documentation available then this library is not yet usable within managed projects &mdash; it is likely to be included in an upcoming Expo SDK release.

# Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

### Add the package to your npm dependencies

```
npm install whisper-kit-expo
```

### Configure for iOS

__IMPORTANT__: This project uses the [cocoapods-spm](https://github.com/trinhngocthuyen/cocoapods-spm) plugin to allow the WhisperKit SPM package to interoperate with the CocoaPods Expo module. Its use requires the installation of the plugin and the addition of some lines to your Podfile (note that `whisper-kit-expo` requires a bare workflow for Expo projects). These steps should be automatically handled by `npm install`, if not, don't panic! Perform the following steps:

Download `cocoapods-spm`:
```{bash}
sudo gem install cocoapods-spm
```

Add plugin and dependency to Podfile:
```{ruby}
### START WHISPERKIT PLUGIN SCRIPT ###

plugin "cocoapods-spm"

spm_pkg "WhisperKit",
  :url => "https://github.com/argmaxinc/WhisperKit.git",
  :version => "0.6.0",
  :products => ["WhisperKit"]
### END WHISPERKIT PLUGIN SCRIPT ###
```

Update gitignore with:
```
ios/.spm.pods
```

Reference the example app in the repository.

Run `npx pod-install` after installing the npm package.


### Configure for Android

Given that WhisperKit is a Swift package, this Expo module does not work on Android.

