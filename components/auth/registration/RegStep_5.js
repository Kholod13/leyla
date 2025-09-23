import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useProgress } from '../../ProgressContext';
import { useUser } from '../../UserContext';
import { AuthStyles } from '../../../styles/AuthStyles';
import { MainStyles } from '../../../styles/MainStyles';
import { ENDPOINTS } from '../../api/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../AuthContext';
import ProgressBarHeader from '../../ProgressBarHeader';

export default function RegFinal({ navigation }) {
  const { setProgress } = useProgress();
  const { user, updateUser } = useUser();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setProgress(90);
  }, [setProgress]);

  // Проверка email
  const handleEmailChange = async (value) => {
    value = value.toLowerCase();
    value = value.replace(/\s/g, ''); // удаляем все пробелы
    setEmail(value);
    setEmailError('');
    if (!value) return;

    try {
      const res = await fetch(ENDPOINTS.CHECK_EMAIL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      });
      const data = await res.json();
      if (data.is_format_good === false) {
        setEmailError('Invalid email format');
      } else if (data.taken === true) {
        setEmailError('Email already in use');
      }
    } catch (err) {
      console.error('Email check error:', err);
    }
  };

  // Проверка пароля
  const handlePasswordChange = async (value) => {
    value = value.replace(/\s/g, ''); // удаляем все пробелы
    setPassword(value);
    setPasswordError('');
    if (!value) return;

    try {
      const res = await fetch(ENDPOINTS.CHECK_PASSWORD, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: value }),
      });
      const data = await res.json();
      if (!data.is_format_good) {
        setPasswordError('Password must be at least 8 chars, 1 uppercase, 1 number, 1 special char');
      }
    } catch (err) {
      console.error('Password check error:', err);
    }
  };

  // Проверка confirm password
  const validateConfirmPassword = () => {
    if (password && confirmPassword && password !== confirmPassword) {
      setConfirmError('Passwords do not match');
    } else {
      setConfirmError('');
    }
  };

  // Регистрация
const handleRegister = async () => {
  setGeneralError('');
  setLoading(true);

  try {
    const body = {
      email: email || "",
      nickname: user?.username || "testuser",
      lang_id: user?.Settings?.learningLanguageId ?? 1,
      level: user?.Settings?.levelLanguage || "A1",
      lang_native_id: user?.Settings?.nativeLanguageId ?? 2,
      password: password || "",
      interests: user?.Settings?.interestsIds || [],
    };

    console.log('Registration request body:', JSON.stringify(body, null, 2));

    const res = await fetch(ENDPOINTS.REGISTRATION, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log('Registration response:', data);

    if (res.ok && data.user_id) {
      // ✅ сохраняем user_id
      await AsyncStorage.setItem("user_id", String(data.user_id));

      // ✅ обновляем UserContext
      updateUser({ id: data.user_id, email });

      // ✅ авторизация через AuthContext
      await login("dummy-token"); 
      // если сервер вернёт токен — используй его вместо dummy
    } else {
      setGeneralError('Registration failed. Try again.');
    }
  } catch (err) {
    console.error('Registration error:', err);
    setGeneralError('Server error, try again later');
  } finally {
    setLoading(false);
  }
};



  return (
    <View style={AuthStyles.container}>
      {/* Background */}
      <LinearGradient colors={['#FF8330', '#F9D423']} style={AuthStyles.circlePassPage1} />
      <LinearGradient colors={['#FF9A57', '#F9D423']} style={AuthStyles.circlePassPage2} />

      <View style={AuthStyles.progressBarContainer}>
        <TouchableOpacity style={MainStyles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/icons/ArrowLeft.png')} />
        </TouchableOpacity>
         <ProgressBarHeader />
      </View>

      <View style={AuthStyles.content}>
        <Text style={AuthStyles.title}>Create an account</Text>

        {/* Email */}
        <Text style={AuthStyles.inputText}>Email</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#918D8A"
          style={[AuthStyles.input, emailError && AuthStyles.inputError]}
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError ? <Text style={AuthStyles.textError}>{emailError}</Text> : null}

        {/* Password */}
        <Text style={AuthStyles.inputText}>Password</Text>
        <View style={AuthStyles.inputWrapper}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#918D8A"
            secureTextEntry={!showPassword}
            style={[AuthStyles.input, passwordError && AuthStyles.inputError]}
            value={password}
            onChangeText={handlePasswordChange}
            onBlur={() => handlePasswordChange(password)}
          />
          <TouchableOpacity
            style={AuthStyles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={
                showPassword
                  ? require('../../../assets/icons/Eye.png')
                  : require('../../../assets/icons/EyeClosed.png')
              }
              style={AuthStyles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
        {passwordError ? <Text style={AuthStyles.textError}>{passwordError}</Text> : null}

        {/* Confirm Password */}
        <Text style={AuthStyles.inputText}>Confirm Password</Text>
        <View style={AuthStyles.inputWrapper}>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#918D8A"
            secureTextEntry={!showConfirmPassword}
            style={[AuthStyles.input, confirmError && AuthStyles.inputError]}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            onBlur={validateConfirmPassword}
          />
          <TouchableOpacity
            style={AuthStyles.eyeButton}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Image
              source={
                showConfirmPassword
                  ? require('../../../assets/icons/Eye.png')
                  : require('../../../assets/icons/EyeClosed.png')
              }
              style={AuthStyles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
        {confirmError ? <Text style={AuthStyles.textError}>{confirmError}</Text> : null}

        {generalError ? <Text style={AuthStyles.textError}>{generalError}</Text> : null}
      </View>

      <View style={AuthStyles.footer}>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[AuthStyles.linkText, {marginBottom: 30}]}>
              I have an account <Text style={{color: '#0388F5'}}>Log in</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={
            email && password && confirmPassword && !emailError && !passwordError && !confirmError
              ? AuthStyles.buttonLogin
              : AuthStyles.buttonDisabled
          }
          onPress={handleRegister}
          disabled={
            !email || !password || !confirmPassword || !!emailError || !!passwordError || !!confirmError || loading
          }
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={AuthStyles.buttonLoginText}>Register</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}
