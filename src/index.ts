import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to WhisperKitExpo.web.ts
// and on native platforms to WhisperKitExpo.ts
import WhisperKitExpoModule from './WhisperKitExpoModule';
import WhisperKitExpoView from './WhisperKitExpoView';
import { ChangeEventPayload, WhisperKitExpoViewProps } from './WhisperKitExpo.types';

// Get the native constant value.
export const PI = WhisperKitExpoModule.PI;

export function hello(): string {
  return WhisperKitExpoModule.hello();
}

export async function transcribe(fileURL: string): Promise<string> {
    return await WhisperKitExpoModule.transcribe(fileURL);
}
export async function setValueAsync(value: string) {
  return await WhisperKitExpoModule.setValueAsync(value);
}

const emitter = new EventEmitter(WhisperKitExpoModule ?? NativeModulesProxy.WhisperKitExpo);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { WhisperKitExpoView, WhisperKitExpoViewProps, ChangeEventPayload };
