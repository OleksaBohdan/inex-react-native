import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function CategoryCard() {
  return (
    <View style={[styles.card]}>
      <Text style={styles.categotyText}> Category Card</Text>
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
  categotyText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
