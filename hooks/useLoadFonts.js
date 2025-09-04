import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export default function useLoadFonts() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'inter-regular': require('../assets/fonts/Inter_18pt-Regular.ttf'),
        'inter-light': require('../assets/fonts/Inter_18pt-Light.ttf'),
        'inter-bold': require('../assets/fonts/Inter_18pt-Bold.ttf'),
        'inter-medium': require('../assets/fonts/Inter_18pt-Medium.ttf'),
        'inter-italic': require('../assets/fonts/Inter_18pt-Italic.ttf'),
        'inter-semiBold': require('../assets/fonts/Inter_18pt-SemiBold.ttf'),
      });
      setLoaded(true);
    }

    loadFonts();
  }, []);

  return loaded;
}
