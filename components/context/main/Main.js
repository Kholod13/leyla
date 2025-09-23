import React from 'react';
import { View, Text } from 'react-native';
import LogoutButton from '../dialogWindows/LogoutButton';
import { useUser } from '../../UserContext';

export default function Main({navigation}) {
  const { user } = useUser();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Main Screen</Text>
      <View style={{ marginTop: 20 }}>
        <Text>ID: {user.id}</Text>
        <Text>Username: {user.username}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Settings:</Text>
        <Text>Native Language: {user.Settings.nativeLanguage}</Text>
        <Text>Learn Language: {user.Settings.learnLanguage}</Text>
        <Text>Level Language: {user.Settings.levelLanguage}</Text>
        <Text>Interests-ID: {user.Settings.interestsIds.join(', ')}</Text>
        <Text>Interests-Names: {user.Settings.interestsNames.join(', ')}</Text>
      </View>
      <LogoutButton navigation={navigation} />
    </View>
  );
}
