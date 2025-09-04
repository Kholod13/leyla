import 'react-native-gesture-handler';
import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { AuthProvider } from './components/AuthContext';
import { UserProvider } from './components/UserContext';
import Navigation from './navigation/navigate'; // убедись, что путь верный

const loadFonts = () =>
  Font.loadAsync({
    'inter-regular': require('./assets/fonts/Inter_18pt-Regular.ttf'),
    'inter-light': require('./assets/fonts/Inter_18pt-Light.ttf'),
    'inter-bold': require('./assets/fonts/Inter_18pt-Bold.ttf'),
    'inter-medium': require('./assets/fonts/Inter_18pt-Medium.ttf'),
    'inter-italic': require('./assets/fonts/Inter_18pt-Italic.ttf'),
    'inter-semiBold': require('./assets/fonts/Inter_18pt-SemiBold.ttf'),
  });

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <AuthProvider>
      <UserProvider>
        <Navigation />
      </UserProvider>
    </AuthProvider>
  );
}
