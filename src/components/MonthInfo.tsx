import { StyleSheet, View, Text } from 'react-native';
import React from 'react';

export default function MonthInfo() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This month:</Text>
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
    alignItems: 'center',
    paddingHorizontal: 10,
    // marginBottom: 8,
  },
  text: {
    fontSize: 20,
  },
  textExpenses: {
    fontSize: 20,
    color: '#E80000',
  },
  textIncomes: {
    fontSize: 20,
    color: '#22980F',
  },
});
