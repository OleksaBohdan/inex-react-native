import * as Notifications from 'expo-notifications';
import moment from 'moment';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Switch, Button, Dialog, Portal } from 'react-native-paper';
import Icon from '@expo/vector-icons//MaterialIcons';

import { getTransactionsByDay } from '../repository/transactions';
import { createNotificationId, getNotificationId, deleteNotificationId } from '../repository/notificationId';

const BACKGROUND_FETCH_TASK = 'background-fetch-task';

const scheduleNotification = async () => {
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Expense reminder!',
      body: 'You did not have any transactions yesterday',
      data: { data: 'goes here' },
    },
    trigger: { hour: 9, minute: 0, repeats: true },
    // trigger: { seconds: 60, repeats: true },
  });
  await createNotificationId(notificationId);
};

const cancelNotification = async () => {
  const notificationId = await getNotificationId();
  if (notificationId) {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  }
  await deleteNotificationId();
};

const checkTransactions = async () => {
  const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DDT00:00:00');

  const transactions = await getTransactionsByDay(yesterday);

  if (transactions.length === 0) {
    scheduleNotification();
  }
};

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    await checkTransactions();
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

  const onToggleSwitch = () => {
    setIsSwitchOn((prevState) => {
      if (!prevState) {
        checkTransactions();
      } else {
        cancelNotification();
      }
      return !prevState;
    });
  };

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('No permission for notifications!');
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
                <Text>Plese, don't forget to enable notifications at the Settings if they disabled for this app.</Text>
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
