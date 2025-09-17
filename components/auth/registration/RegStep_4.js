import React from 'react';
import { View, Text } from 'react-native';
import { useUser } from '../../UserContext';

export default function RegStep_4() {
  const { user } = useUser();
  return (
    <View  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{user.Settings.interests}</Text>
    </View>
  );
}
