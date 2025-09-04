import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from '../../components/context/main/Main';
import Folders from '../../components/context/folders/Folders';
import Training from '../../components/context/training/Training';
import Profile from '../../components/context/profile/Profile';
import AddWordToFolder from '../../components/context/dialogWindows/AddWordToFolder';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Folders" component={Folders} />
      <Stack.Screen name="Training" component={Training} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="AddWordToFolder" component={AddWordToFolder} />
    </Stack.Navigator>
  );
}
