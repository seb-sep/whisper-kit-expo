`whisper-kit-expo` is a React Native wrapper for the excellent [WhisperKit](https://github.com/argmaxinc/WhisperKit) library which offers fast on-device audio transcription for Apple devices.

# Usage
You must first load the transcriber into memory. This can be done in one of two ways: 

- Wrapping the root component in `TranscriberInitializer`, which loads the transcriber on compnent mount
```
<TranscriberInitializer>
    <children>
</TranscriberInitializer>
```

- Call `loadTranscriber()` explicitly

After this has been done, transcribe a file by calling `transcribe()` with the path or URI to the file:

```
import { transcribe } from 'whisper-kit-expo';
const transcription = await transcribe("path/to/your/audio.{wav,mp3,m4a,flac}")
```

 Note that `transcribe()` will fail
if `loadTranscriber()` has never been called, and will block if `loadTranscriber()` has been called but not completed.
`transcribe()` also automatically handles sequential execution with Swift actors, so the function can be called concurrently
across as many components as you like.


# Installation

This package uses the [Expo Modules API](https://docs.expo.dev/modules/overview/) to bridge to Swift code, so installation for Expo projects should work out of the box:
```
npm install whisper-kit-expo
```
See [this article](https://docs.expo.dev/modules/overview/) for installation in regular React Native projects.


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

### Android

Given that WhisperKit is built for Apple devices, this module does not work on Android.

