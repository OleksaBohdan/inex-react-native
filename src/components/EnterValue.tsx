import { Keyboard, StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useState, useCallback } from 'react';
import Icon from '@expo/vector-icons/MaterialIcons';
import { TextInput } from 'react-native-paper';
import * as Haptics from 'expo-haptics';

export default function EnterValue() {
  const [text, setText] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('none');

  const handlePress = useCallback((iconType) => {
    setSelectedIcon(iconType);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handlePress('expenses')}>
        <Icon
          style={styles.expensesIcon}
          name={selectedIcon === 'expenses' ? 'remove-circle' : 'remove-circle-outline'}
        />
      </TouchableOpacity>
      <TextInput
        label="Total"
        style={styles.valueInput}
        keyboardType="numeric"
        maxLength={10}
        onBlur={() => Keyboard.dismiss()}
        mode="outlined"
      />
      <TouchableOpacity onPress={() => handlePress('incomes')}>
        <Icon style={styles.incomesIcon} name={selectedIcon === 'incomes' ? 'add-circle' : 'add-circle-outline'} />
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
    paddingHorizontal: 15,
    paddingVertical: 24,
    marginTop: 8,
    backgroundColor: '#FFFFFF',
  },
  valueInput: {
    width: 155,
    height: 56,
    backgroundColor: '#FFFFFF',
    fontSize: 24,
  },
  expensesIcon: {
    fontSize: 56,
    color: '#2E76B0',
  },
  incomesIcon: {
    fontSize: 56,
    color: '#2E76B0',
  },
});
