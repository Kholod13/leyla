import React from 'react';
import { View, Text } from 'react-native';
import { useUser } from '../../UserContext';

export default function RegStep_3() {
  
  const { user, updateUser } = useUser();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{user.Settings.nativeLanguage}</Text>
      <Text>{user.Settings.learnLanguage}</Text>
      <Text>{user.Settings.levelLanguage}</Text>
    </View>
  );
}
