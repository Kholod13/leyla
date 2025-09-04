import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from '../../components/auth/Onboarding';
import Login from '../../components/auth/login/Login';
import RegStep_0 from '../../components/auth/registration/RegStep_0';
import RegStep_1 from '../../components/auth/registration/RegStep_1';
import RegStep_2 from '../../components/auth/registration/RegStep_2';
import RegStep_3 from '../../components/auth/registration/RegStep_3';
import RegStep_4 from '../../components/auth/registration/RegStep_4';
import RegStep_5 from '../../components/auth/registration/RegStep_5';
import ForgotPassword from '../../components/auth/ForgotPassword';
import CheckMail from '../../components/auth/CheckMail';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="RegStep_0" component={RegStep_0} />
        <Stack.Screen name="RegStep_1" component={RegStep_1} />
        <Stack.Screen name="RegStep_2" component={RegStep_2} />
        <Stack.Screen name="RegStep_3" component={RegStep_3} />
        <Stack.Screen name="RegStep_4" component={RegStep_4} />
        <Stack.Screen name="RegStep_5" component={RegStep_5} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="CheckMail" component={CheckMail} />
    </Stack.Navigator>
  );
}
