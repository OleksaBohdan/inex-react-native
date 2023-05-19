import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Report() {
  return (
    <View style={styles.container}>
      <Text>Report Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // your desired color
    alignItems: 'center',
    justifyContent: 'center',
  },
});
