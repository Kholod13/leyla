import React from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import { ENDPOINTS } from '../../api/endpoints';
import { AuthStyles } from '../../../styles/AuthStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { MainStyles } from '../../../styles/MainStyles';
export default function Login() {


  return (
    <View style={ AuthStyles.container }>
      <LinearGradient colors={['#FF8330', '#F9D423']} style={AuthStyles.circleLogin1} />
      <LinearGradient colors={['#FF9A57', '#F9D423']} style={AuthStyles.circleLogin2} />

      <TouchableOpacity style={MainStyles.backButton}>
        <Image source={require('../../../assets/icons/ArrowLeft.png')} />
      </TouchableOpacity>
      <View style={AuthStyles.content}>
        <Text style={AuthStyles.title}>Log In</Text>
      </View>
    </View>
  );
}
