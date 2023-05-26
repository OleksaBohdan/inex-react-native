import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Switch, Button, Dialog, Portal } from 'react-native-paper';
import Icon from '@expo/vector-icons//MaterialIcons';

export default function Settings() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [visible, setVisible] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.textHeader}>Settings</Text>
      </View>
      <View style={styles.settingsContainer}>
        <View style={styles.settingsItemContainer}>
          <View style={styles.settingsItemContainer}>
            <Text style={styles.settingsItemText}>Expense reminder</Text>
            <TouchableOpacity onPress={showDialog}>
              <Icon name="help-outline" style={styles.helpIcon} />
            </TouchableOpacity>
          </View>

          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialogBackground}>
              <Dialog.Title>Reminder Information</Dialog.Title>
              <Dialog.Content>
                <Text>You will be remined at 9:00 next day if previous day don't have transactions.</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Ok</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingHorizontal: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 24,
    fontWeight: '500',
  },
  settingsContainer: {
    flex: 1,
    marginTop: 30,
  },
  settingsItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingsItemText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
  },
  helpIcon: {
    fontSize: 20,
    marginLeft: 10,
  },
  dialogBackground: {
    backgroundColor: '#FFFFFF',
  },
});
