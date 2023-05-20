import { StyleSheet, View, Text } from 'react-native';
import React from 'react';

export default function MonthInfo() {
  return (
    <View style={styles.container}>
      <Text style={styles.textExpenses}>-1256</Text>
      <Text style={styles.textIncomes}>+5300</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  textExpenses: {
    color: '#E80000',
    fontSize: 20,
  },
  textIncomes: {
    color: '#22980F',
    fontSize: 20,
  },
});
