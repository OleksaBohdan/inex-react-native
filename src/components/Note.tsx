import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-paper';
import { theme } from '../theme/theme';

export default function Note() {
  const [value, setValue] = useState('');

  const onChangeText = (text) => {
    if ((text.match(/\n/g) || []).length < 4) {
      setValue(text);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="note"
        multiline
        value={value}
        onChangeText={onChangeText}
        maxLength={80}
        style={styles.textInput}
        mode="outlined"
        theme={theme}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    width: '100%',
  },
  textInput: {},
});
