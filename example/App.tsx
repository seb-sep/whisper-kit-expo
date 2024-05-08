import { useEffect, useState } from 'react';
import * as fs from 'expo-file-system';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

import { TranscriberInitializer, transcribe } from 'whisper-kit-expo';

export default function App() {

  const [transcription, setTranscription] = useState("");
  const [path, setPath] = useState("");
  
  return (
    <TranscriberInitializer>
      <View style={styles.container}>
        <Text>Enter (absolute) filepath to transcribe here:</Text>
        <TextInput
          style={styles.textBox}
          value={path}
          onChangeText={setPath}
          multiline
          numberOfLines={4}
          placeholder='absolute filepath'
          autoCapitalize='none'
        />
        <Button
          title='Transcribe'
          onPress={async () => {setTranscription(await transcribe(path))}}
          />
        <Text>Transcription from WhisperKit is:</Text>
        <Text>{transcription}</Text>
      </View>
    </TranscriberInitializer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBox: {
    borderColor: 'darkgray',
    borderWidth: 1,
    borderRadius: 4,
    height: 40,
    width: 240,
    padding: 8,
},
});
