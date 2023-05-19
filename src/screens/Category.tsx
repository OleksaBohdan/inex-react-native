import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Category() {
  return (
    <View style={styles.container}>
      <Text>Category Screen</Text>
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
