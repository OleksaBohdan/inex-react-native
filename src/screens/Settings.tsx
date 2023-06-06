import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Switch, Button, Dialog, Portal } from 'react-native-paper';
import Icon from '@expo/vector-icons//MaterialIcons';

import { createNotificationId, getNotificationId, deleteNotificationId } from '../repository/notificationId';

const BACKGROUND_FETCH_TASK = 'background-fetch-task';

const scheduleNotification = async () => {
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Expense reminder!',
      body: 'Have you added your transactions for yesterday?',
      data: { data: 'goes here' },
    },
    trigger: { hour: 9, minute: 0, repeats: true },
  });
  await createNotificationId(notificationId);
  await AsyncStorage.setItem('notificationScheduled', 'true');
};

const cancelNotification = async () => {
  const notificationId = await getNotificationId();
  if (notificationId) {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  }
  await deleteNotificationId();
  await AsyncStorage.setItem('notificationScheduled', 'false');
};

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (err) {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

const registerBackgroundFetch = async () => {
  await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 24 * 60 * 60,
    // minimumInterval: 60,
  });
};

export default function Settings() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  const onToggleSwitch = () => {
    setIsSwitchOn((prevState) => {
      const newState = !prevState;
      AsyncStorage.setItem('switchState', JSON.stringify(newState));
      if (!prevState) {
        scheduleNotification();
      } else {
        cancelNotification();
      }
      return newState;
    });
  };

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      setHasPermission(status === 'granted');

      if (status !== 'granted') {
        alert('No permission for notifications! Please, open Settings and enable notifications for this app.');
      }

      const storedSwitchState = await AsyncStorage.getItem('switchState');
      if (storedSwitchState) {
        setIsSwitchOn(JSON.parse(storedSwitchState));
      }
    };

    requestPermissions();
    registerBackgroundFetch(); // register the background task
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.textHeader}>Settings</Text>
      </View>
      <View style={styles.settingsContainer}>
        <View style={styles.settingsItemContainer}>
          <View style={styles.settingsItemContainer}>
            <Text style={styles.settingsItemText}>Expense reminder</Text>
            <TouchableHighlight
              onPress={showDialog}
              underlayColor="#FFFFFF"
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <Icon name="help-outline" style={styles.helpIcon} />
            </TouchableHighlight>
          </View>

          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} disabled={!hasPermission} />

          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialogBackground}>
              <Dialog.Title>Reminder Information</Dialog.Title>
              <Dialog.Content>
                <Text>We'll remind you at 9 AM daily to log your last day's transactions.</Text>
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
