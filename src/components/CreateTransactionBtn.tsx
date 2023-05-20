import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';

export default function CreateTransactionBtn() {
  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => console.log('Pressed')} style={styles.addBtn}>
        Create transaction
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  addBtn: {
    backgroundColor: '#F35B25',
  },
});
