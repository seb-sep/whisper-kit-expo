// Import the native module. On web, it will be resolved to WhisperKitExpo.web.ts
// and on native platforms to WhisperKitExpo.ts
import WhisperKitExpoModule from './WhisperKitExpoModule';


export function hello(): string {
  return WhisperKitExpoModule.hello();
}

// If file is a file URI, trim it to a path
export async function transcribe(file: string): Promise<string> {
  const fileRegex = /^file:\/\//;
  const path = file.replace(fileRegex, "");
  const transcription = await WhisperKitExpoModule.transcribe(path);
  console.log("Transcription is", transcription);
  return transcription;
}

export async function loadTranscriber(): Promise<boolean> {
  return await WhisperKitExpoModule.loadTranscriber();
}


