import AsyncStorage from '@react-native-async-storage/async-storage';

export const createNotificationId = async (notificationId: any) => {
  await AsyncStorage.setItem('notificationId', notificationId);
};

export const getNotificationId = async () => {
  return await AsyncStorage.getItem('notificationId');
};

export const deleteNotificationId = async () => {
  await AsyncStorage.removeItem('notificationId');
};
