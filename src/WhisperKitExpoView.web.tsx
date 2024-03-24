import * as React from 'react';

import { WhisperKitExpoViewProps } from './WhisperKitExpo.types';

export default function WhisperKitExpoView(props: WhisperKitExpoViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
