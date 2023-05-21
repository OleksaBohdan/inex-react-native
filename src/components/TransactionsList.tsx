import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';

export default function TransactionsList() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
      </ScrollView>
    </View>
  );
}

const TransactionCard = () => (
  <View style={[styles.card]}>
    <View style={styles.leftCardContainer}>
      <Text style={styles.commentText}>Продукты</Text>
      <Text style={styles.subtitleText}>Продукты Kaufland</Text>
    </View>
    <Text style={styles.valueText}>-75</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginTop: 24,
  },
  leftCardContainer: {},
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderColor: '#D9D9D9',
    height: 53,
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 13,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentText: {
    fontSize: 16,
    fontWeight: '500',
  },
  subtitleText: {
    fontSize: 10,
    fontWeight: '300',
  },
  valueText: { fontSize: 16, color: '#000000', fontWeight: '500' },
  categoryAvatar: {
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    borderColor: '#CACCCE',
  },
});
