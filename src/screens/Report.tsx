import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import TransactionsList from '../components/TransactionsList';

export default function Report() {
  return (
    <View style={styles.container}>
      <Text>Report Screen</Text>
      {/* <TransactionsList /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
