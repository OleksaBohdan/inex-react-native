import { View } from 'react-native';
import 'react-native-gesture-handler';
// import UserInviteHandler from './UserInviteHandler';
import DeepLinkHandler from './DeepLinkHandler';
import OnInstallConversionData from './OnInstallConversionData';
import InitializeSDKHandler from './InitializeSDKHandler';

const AppsFlyerHandler = (props) => {
  const {} = props;

  const displayConversionData = true;
  const useDeepLink = true;
  const useUserInvite = true;

  return (
    <View>
      {displayConversionData && <OnInstallConversionData />}

      {useDeepLink && <DeepLinkHandler />}

      <InitializeSDKHandler displayConversionData={displayConversionData} useDeepLink={useDeepLink} />
    </View>
  );
};

export default AppsFlyerHandler;
