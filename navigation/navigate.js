// navigation/navigate.js
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../components/AuthContext';
import ProgressProvider from '../components/ProgressContext';
import AppStack from './stacks/AppStack';
import AuthStack from './stacks/AuthStack';

export default function Navigate() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ProgressProvider>
      <NavigationContainer>
        {isLoggedIn ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </ProgressProvider>
  );
}
