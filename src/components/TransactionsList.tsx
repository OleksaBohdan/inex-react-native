import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';

import TransactionCard from './TransactionCard';

export default function TransactionsList({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <TransactionCard onPress={() => navigation.navigate('TransactionCardScreen')} />
        <TransactionCard onPress={() => navigation.navigate('TransactionCardScreen')} />
        <TransactionCard onPress={() => navigation.navigate('TransactionCardScreen')} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingTop: 16,
  },
});
