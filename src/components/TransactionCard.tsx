import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import 'react-native-gesture-handler';

export default function TransactionCard({ onPress }) {
  return (
    <View style={[styles.card]} onTouchEnd={onPress}>
      <View>
        <Text style={styles.commentText}>Продукты</Text>
        <Text style={styles.subtitleText}>Продукты Kaufland</Text>
      </View>
      <Text style={styles.valueText}>-75</Text>
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
    paddingVertical: 0,
    paddingHorizontal: 13,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    marginVertical: 4,
  },
  commentText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 10,
    fontWeight: '300',
  },
  valueText: { fontSize: 16, color: '#000000', fontWeight: '500' },
});
