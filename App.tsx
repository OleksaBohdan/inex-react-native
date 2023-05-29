import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MainTabs from './src/components/Tabs';
import { StatusBar } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useColorScheme } from 'react-native';
import { theme } from './src/theme/theme';
import { configureStore } from '@reduxjs/toolkit';
import { mainSlice } from './src/state/mainState';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer: mainSlice.reducer,
});

export default function App() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
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
