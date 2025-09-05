import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import useLoadFonts from './hooks/useLoadFonts';
import { AuthProvider } from './components/AuthContext';
import { UserProvider } from './components/UserContext';
import Navigate from './navigation/navigate';

console.log('Navigate:', Navigate);
console.log('AuthProvider:', AuthProvider);
console.log('UserProvider:', UserProvider);

export default function App() {
  const fontLoaded = useLoadFonts();

  if (!fontLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <UserProvider>
        <Navigate />
      </UserProvider>
    </AuthProvider>
  );
}
