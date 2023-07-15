import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider, Text } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MainTabs from './src/components/Tabs';
import { StatusBar } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Platform, useColorScheme } from 'react-native';
import { theme } from './src/theme/theme';
import { configureStore } from '@reduxjs/toolkit';
import { mainSlice } from './src/state/mainState';
import { Provider } from 'react-redux';
import AppsFlyerHandler from './src/components/AppsFlyer/AppsFlyerHandler';
import * as Linking from 'expo-linking';
import { requestTrackingPermissionsAsync, getTrackingPermissionsAsync } from 'expo-tracking-transparency';

const store = configureStore({
  reducer: mainSlice.reducer,
});

const prefix = Linking.createURL('inexbudget://app');

export default function App() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'ios') {
        try {
          const { status } = await requestTrackingPermissionsAsync();
          if (status === 'granted') {
            console.log('Yay! I have user permission to track data');
          }
        } catch (error) {
          console.log('error', error);
        }
      }
    })();
  }, []);

  const url = Linking.useURL();

  const linking = {
    prefixes: [prefix],
  };

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
            <AppsFlyerHandler />
            <SafeAreaView edges={['top']} style={{ backgroundColor: '#FFFFFF' }}>
              <StatusBar style={colorScheme === 'dark' ? 'dark' : 'dark'} />
            </SafeAreaView>
            <MainTabs />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
