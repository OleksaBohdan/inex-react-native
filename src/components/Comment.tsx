import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function Comment() {
  return (
    <View style={styles.container}>
      <TextInput
        theme={{ dark: false }}
        label="comment"
        multiline
        numberOfLines={4}
        style={styles.textInput}
        mode="outlined"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    width: '100%',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    color: 'black',
  },
});
