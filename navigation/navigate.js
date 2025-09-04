import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../components/AuthContext';
import { ProgressProvider } from '../components/ProgressContext';
import AppStack from '../navigation/stacks/AppStack';
import AuthStack from '../navigation/stacks/AuthStack';

const Stack = createStackNavigator();

export default function Navigate() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null; // Можешь показать SplashScreen, если хочешь

  return (
    <ProgressProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <Stack.Screen name="App" component={AppStack} />
          ) : (
            <Stack.Screen name="Auth" component={AuthStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ProgressProvider>
  );
}
