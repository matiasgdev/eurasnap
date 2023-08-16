import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import {useStore} from '../store/PhotoStore';

export function useSplashScreen() {
  const {status} = useStore();

  useEffect(() => {
    if (status === 'pending') {
      SplashScreen.show();
    } else {
      SplashScreen.hide();
    }
  }, [status]);
}
