import { StyleSheet, View, ScrollView, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';

import TransactionCard from './TransactionCard';

export default function TransactionsList({ navigation }) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handlePress = () => {
    Keyboard.dismiss();
    if (!isKeyboardVisible) {
      navigation.navigate('TransactionCardScreen');
    }
  };

  return (
    <View style={styles.container} onTouchStart={Keyboard.dismiss}>
      <ScrollView>
        <TransactionCard onPress={handlePress} />
        <TransactionCard onPress={handlePress} />
        <TransactionCard onPress={handlePress} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingTop: 16,
  },
});
