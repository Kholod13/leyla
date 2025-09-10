import React from 'react';
import { View, Text } from 'react-native';
import LogoutButton from '../dialogWindows/LogoutButton';

export default function Main({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Main Screen</Text>
      <LogoutButton navigation={navigation} />
    </View>
  );
}
