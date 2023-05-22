import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function Comment() {
  return (
    <View style={styles.container}>
      <TextInput label="Comment" style={styles.textInput} maxLength={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
  },
});
