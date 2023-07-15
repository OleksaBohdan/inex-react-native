import { useEffect } from 'react';
import appsFlyer from 'react-native-appsflyer';

const DeepLinkHandler = (props) => {
  useEffect(() => {
    const onDeepLinkCanceller = appsFlyer.onDeepLink((res) => {
      //for testing events
      appsFlyer.logEvent('deepLink', { message: JSON.stringify(res, null, 2) });

      if (res?.deepLinkStatus === 'FOUND') {
        console.log(JSON.stringify(res, null, 2));
        const categoryName = res.data.deep_link_value;
        const itemName = res.data.deep_link_sub1;
        const unitsMode = res.data.deep_link_sub2 === 'true';
        const quantity = 'test quantity';

        console.log('Deep Link was found');
        console.log(`${categoryName}, ${itemName}, ${unitsMode}, ${quantity}`);
      } else if (res?.deepLinkStatus === 'NOT_FOUND') {
        console.log('Deep Link was not found');
      }
    });

    return () => {
      onDeepLinkCanceller();
    };
  }, []);

  return null;
};

export default DeepLinkHandler;
