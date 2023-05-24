import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from '@expo/vector-icons/MaterialIcons';

export default function CategoryCard({ name }) {
  return (
    <View style={[styles.card]}>
      <Text style={styles.cardNameText}> {name}</Text>
      <Icon name="delete" size={16} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderColor: '#D9D9D9',
    height: 53,
    flexDirection: 'row',
    marginVertical: 4,
    paddingHorizontal: 13,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  cardNameText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
