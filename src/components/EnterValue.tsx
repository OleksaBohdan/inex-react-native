import { Keyboard, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon from '@expo/vector-icons/MaterialIcons';
import { TextInput } from 'react-native-paper';
import * as Haptics from 'expo-haptics';
import { SegmentedButtons } from 'react-native-paper';

export default function EnterValue() {
  const [text, setText] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('none');

  const getIconName = (iconType) => {
    if (selectedIcon === iconType) {
      return iconType === 'expenses' ? 'remove-circle' : 'add-circle';
    }
    return iconType === 'expenses' ? 'remove-circle-outline' : 'add-circle-outline';
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setSelectedIcon('expenses'), Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      >
        <Icon name={getIconName('expenses')} style={styles.expensesIcon} />
      </TouchableOpacity>
      <TextInput
        mode="outlined"
        label="total"
        placeholder=""
        style={styles.valueInput}
        keyboardType="numeric"
        onBlur={() => Keyboard.dismiss()}
      />
      <TouchableOpacity
        onPress={() => {
          setSelectedIcon('incomes'), Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      >
        <Icon name={getIconName('incomes')} style={styles.incomesIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 13,
  },
  valueInput: {
    width: 155,
    height: 56,
    backgroundColor: '#FFFFFF',
    color: 'black',
  },
  expensesIcon: {
    fontSize: 48,
    color: '#E80000',
  },
  incomesIcon: {
    fontSize: 48,
    color: '#22980F',
  },
});
