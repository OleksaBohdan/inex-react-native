import React, { useEffect } from 'react';
import { Dialog, Portal, Text, Button } from 'react-native-paper';
import { StyleSheet, Image } from 'react-native';
import { Audio } from 'expo-av';

import fox from '../assets/fox3.png';
import zvuk from '../assets/zvuk.mp3';

export default function Error({ errorText }) {
  const [visible, setVisible] = React.useState(true);
  const hideDialog = () => setVisible(false);

  // const [sound, setSound] = React.useState(undefined);
  // async function playSound() {
  //   console.log('Loading Sound');
  //   const { sound } = await Audio.Sound.createAsync(zvuk);
  //   setSound(sound);

  //   console.log('Playing Sound');
  //   await sound.playAsync();
  // }
  // useEffect(() => {
  //   playSound();

  //   return sound
  //     ? () => {
  //         console.log('Unloading Sound');
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, []);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Icon icon="alert" />
        <Dialog.Title style={styles.title}>Error</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{errorText}</Text>
        </Dialog.Content>
        {/* <Image source={fox} style={{ height: '85%', width: '100%' }} /> */}

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
