import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AuthStyles } from '../../styles/AuthStyles';
import { LinearGradient } from 'expo-linear-gradient';

export default function CheckMail( { route, navigation } ) {
  const { email } = route.params;

  return (
    <View style={AuthStyles.container}>
      <LinearGradient
        colors={['#FF8330', '#F9D423']}
        style={AuthStyles.circle1}>
      </LinearGradient>
      <LinearGradient
        colors={['#FF9A57', '#F9D423']}
        style={AuthStyles.circle2}>
      </LinearGradient>
      <LinearGradient
        colors={['#FF8330', '#F9D423']}
        style={AuthStyles.circleCheckMail1}>
      </LinearGradient>
      <LinearGradient
        colors={['#FF9A57', '#F9D423']}
        style={AuthStyles.circleCheckMail2}>
      </LinearGradient>
      <LinearGradient
        colors={['#FF8330', '#F9D423']}
        style={AuthStyles.circleCheckMail3}>
      </LinearGradient>
      <LinearGradient
        colors={['#FF9A57', '#F9D423']}
        style={AuthStyles.circleCheckMail4}>
      </LinearGradient>
      
      <View style={[AuthStyles.content, {justifyContent: 'center'}, {alignItems: 'center'}]}>
        <Text style={AuthStyles.title}>Check you email</Text>
        <Text style={AuthStyles.text}>The password has been sent an email to <Text style={{fontFamily: 'inter-semiBold'}}>{email}</Text></Text>
      </View>

      <TouchableOpacity
        style={AuthStyles.buttonLogin}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={AuthStyles.buttonLoginText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
