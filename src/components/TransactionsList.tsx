import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-paper';

export default function TransactionsList() {
  return (
    <View style={styles.container}>
      <TransactionCard />
    </View>
  );
}

const TransactionCard = () => (
  <View style={[styles.card]}>
    <View style={styles.leftCardContainer}>
      <Avatar.Text size={24} label="Пр" style={styles.categoryAvatar} />
      <Text style={styles.commentText}>Продукты Kaufland</Text>
    </View>
    <Text style={styles.valueText}>-75</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    width: '100%',
  },
  leftCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#C6F0C5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    height: 53,
    marginVertical: 8,
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 13,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commentText: {
    fontSize: 16,
    marginLeft: 16,
  },
  valueText: { fontSize: 20 },

  categoryAvatar: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
});
