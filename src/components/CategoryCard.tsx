import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import React from 'react';
import Icon from '@expo/vector-icons/MaterialIcons';

export default function CategoryCard({ name, onDelete }) {
  return (
    <View style={[styles.card]}>
      <Text style={styles.cardNameText}> {name}</Text>
      <TouchableHighlight
        onPress={onDelete}
        underlayColor="#DDDDDD"
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        style={styles.roundedTouchable}
      >
        <View style={styles.iconContainer}>{name !== 'Any' ? <Icon name="delete" size={16} /> : null}</View>
      </TouchableHighlight>
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
  roundedTouchable: {
    borderRadius: 30,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
