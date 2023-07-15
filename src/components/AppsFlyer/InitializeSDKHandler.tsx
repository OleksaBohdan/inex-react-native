import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import appsFlyer from 'react-native-appsflyer';

const InitializeSDKHandler = (props) => {
  const { displayConversionData, useDeepLink } = props;

  useEffect(() => {
    appsFlyer.initSdk(
      {
        devKey: 'EBvixfXWhKv2iFapV8Tssk',
        isDebug: true,
        appId: '6449741773',
        onInstallConversionDataListener: displayConversionData,
        onDeepLinkListener: useDeepLink,
        timeToWaitForATTUserAuthorization: 20,
      },
      (result) => {
        console.log('result', result);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }, []);

  return null;
};

export default InitializeSDKHandler;
