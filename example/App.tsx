import { StyleSheet, Text, View } from 'react-native';

import * as WhisperKitExpo from 'whisper-kit-expo';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{WhisperKitExpo.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
