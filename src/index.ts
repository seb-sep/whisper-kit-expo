// Import the native module. On web, it will be resolved to WhisperKitExpo.web.ts
// and on native platforms to WhisperKitExpo.ts
import { TranscribeResult } from './WhisperKitExpo.types';
import WhisperKitExpoModule from './WhisperKitExpoModule';
import { TranscriberInitializer } from './TranscriberInitializer';



// If file is a file URI, trim it to a path
export async function transcribe(file: string): Promise<string> {
  const fileRegex = /^file:\/\//;
  const path = file.replace(fileRegex, "");
  const result: TranscribeResult = await WhisperKitExpoModule.transcribe(path);
  if (result.success) {
    console.log("Transcription is", result.value);
    return result.value;
  } else {
    throw result.value;
  }
}

export async function loadTranscriber(): Promise<boolean> {
  return await WhisperKitExpoModule.loadTranscriber();
}

export { TranscriberInitializer };
