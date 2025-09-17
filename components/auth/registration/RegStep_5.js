import React from 'react';
import { View, Text } from 'react-native';
import { useUser } from '../../UserContext';

export default function RegStep_5() {
  const { user } = useUser();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Registration Complete!</Text>
      <Text>{user.username}</Text>
    </View>
  );
}
