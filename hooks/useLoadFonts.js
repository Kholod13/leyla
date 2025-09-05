import * as Font from 'expo-font';
import { useState, useEffect } from 'react';

export default function useLoadFonts() { // ✅ теперь это default export
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
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

    load();
  }, []);

  return loaded;
}
