import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthStyles } from '../../styles/AuthStyles';
import { LinearGradient } from 'expo-linear-gradient';

export default function Onboarding() {
  const navigation = useNavigation();

  return (
    <View style={AuthStyles.container}>
        {/* background */}
        <LinearGradient
            colors={['#FF8330', '#F9D423']}
            style={AuthStyles.circle1}>
        </LinearGradient>
        <LinearGradient
            colors={['#FF9A57', '#F9D423']}
            style={AuthStyles.circle2}>
        </LinearGradient>
        <LinearGradient
            colors={['#FF9A57', '#F9D423']}
            style={AuthStyles.circle3}>
        </LinearGradient>
        <LinearGradient
            colors={['#FF9A57', '#F9D423']}
            style={AuthStyles.circle4}>
        </LinearGradient>
        {/* content */}
        
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View>
            <Text style={AuthStyles.title}>Hi!</Text>
            <Text style={AuthStyles.text}>We will help you learn the language. You will improve:</Text>

            <View style={{ alignItems: 'flex-start', marginBottom: '35%' }}>
                <View style={AuthStyles.block}>
                <Image style={AuthStyles.IconStyle} source={require('../../assets/icons/Note.png')} />
                <Text style={AuthStyles.textBlock}>Improve your vocabulary</Text>
                </View>
                <View style={AuthStyles.block}>
                <Image style={AuthStyles.IconStyle} source={require('../../assets/icons/Media.png')} />
                <Text style={AuthStyles.textBlock}>Understand complex texts</Text>
                </View>
                <View style={AuthStyles.block}>
                <Image style={AuthStyles.IconStyle} source={require('../../assets/icons/Facts.png')} />
                <Text style={AuthStyles.textBlock}>Read interesting facts</Text>
            </View>
          </View>
        </View>
        {/* Кнопки внизу */}
        <View style={{  }}>
          <TouchableOpacity style={AuthStyles.buttonLogin} onPress={() => navigation.navigate('Login')}>
            <Text style={AuthStyles.buttonLoginText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={AuthStyles.buttonRegister} onPress={() => navigation.navigate('RegStep_0')}>
            <Text style={AuthStyles.buttonRegisterText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
