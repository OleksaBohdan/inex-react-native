import React from 'react';
import { Dialog, Portal, Text, Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function Error({ errorText }) {
  const [visible, setVisible] = React.useState(true);
  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Icon icon="alert" />
        <Dialog.Title style={styles.title}>Error</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{errorText}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
});
