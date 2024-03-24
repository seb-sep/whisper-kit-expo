import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { WhisperKitExpoViewProps } from './WhisperKitExpo.types';

const NativeView: React.ComponentType<WhisperKitExpoViewProps> =
  requireNativeViewManager('WhisperKitExpo');

export default function WhisperKitExpoView(props: WhisperKitExpoViewProps) {
  return <NativeView {...props} />;
}
