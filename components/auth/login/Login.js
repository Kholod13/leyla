import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../../components/AuthContext';
import { useUser } from '../../../components/UserContext';
import { ENDPOINTS } from '../../../components/api/endpoints';
import { AuthStyles } from '../../../styles/AuthStyles';
import { MainStyles } from '../../../styles/MainStyles';

export default function Login({ navigation }) {
  const { login } = useAuth();
  const { updateUser } = useUser();

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Проверка email (на лету)
  const handleEmailChange = async (value) => {
    value = value.toLowerCase();
    setMail(value);
    if (!value) {
      setEmailError('');
      return;
    }
    try {
      const response = await fetch(ENDPOINTS.CHECK_EMAIL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const data = await response.json();

      if (data.is_format_good === false) {
        setEmailError("Invalid email format");
      } else if (data.taken === true) {
        // В Login можно не блокировать, но предупреждать
        setEmailError(""); // ❗ логично не блокировать логин
      } else {
        setEmailError('');
      }
    } catch (err) {
      console.error("Email check error:", err);
    }
  };

  // ✅ Проверка пароля (на лету)
  const handlePasswordChange = async (value) => {
    setPassword(value);
    if (!value) {
      setPasswordError('');
      return;
    }
    try {
      const response = await fetch(ENDPOINTS.CHECK_PASSWORD, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: value }),
      });
      const data = await response.json();

      if (data.is_format_good === false) {
        setPasswordError("Password must be 8+ chars, 1 uppercase, 1 number, 1 special char");
      } else {
        setPasswordError('');
      }
    } catch (err) {
      console.error("Password check error:", err);
    }
  };

  const handleLogin = async () => {
    setGeneralError('');
    setLoading(true);
    try {
      const response = await fetch(ENDPOINTS.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: mail, password }),
      });

      const data = await response.json();

      if (response.ok && data.user_id) {
        // ✅ Сохраняем user_id в AsyncStorage
        await AsyncStorage.setItem("user_id", String(data.user_id));

        // ✅ Обновляем UserContext
        updateUser({ id: data.user_id, email: mail });

        // ✅ Авторизация (сохраняем токен в AuthContext)
        await login("dummy-token"); // если бэкенд вернёт токен — используй его

      } else {
        setGeneralError("Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setGeneralError("Server error, try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={AuthStyles.container}>
      {/* background */}
      <LinearGradient colors={['#FF8330', '#F9D423']} style={AuthStyles.circleLogin1} />
      <LinearGradient colors={['#FF9A57', '#F9D423']} style={AuthStyles.circleLogin2} />

      <TouchableOpacity style={MainStyles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../../../assets/icons/ArrowLeft.png')} />
      </TouchableOpacity>

      <View style={AuthStyles.content}>
        <Text style={AuthStyles.title}>Log in</Text>

        {/* EMAIL */}
        <Text style={AuthStyles.inputText}>Email</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#918D8A"
          style={[AuthStyles.input, emailError && AuthStyles.inputError]}
          onChangeText={handleEmailChange}
          value={mail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError ? <Text style={AuthStyles.textError}>{emailError}</Text> : null}

        {/* PASSWORD */}
        <Text style={AuthStyles.inputText}>Password</Text>
        <View style={AuthStyles.inputWrapper}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#918D8A"
            secureTextEntry={!showPassword}
            style={[AuthStyles.input, passwordError && AuthStyles.inputError]}
            onChangeText={handlePasswordChange}
            value={password}
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

        {generalError ? <Text style={AuthStyles.textError}>{generalError}</Text> : null}

        {/* Forgot password link */}
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={[AuthStyles.linkText, {color: '#0388F5'}]}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={AuthStyles.footer}>
        <View style={AuthStyles.footerTextWrapper}>
          <TouchableOpacity onPress={() => navigation.navigate('RegStep_0')}>
            <Text style={[AuthStyles.linkText, {marginBottom: 30}]}>
              Don't have an account? <Text style={{color: '#0388F5'}}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            mail && password && !emailError && !passwordError
              ? AuthStyles.buttonLogin
              : AuthStyles.buttonDisabled
          ]}
          onPress={handleLogin}
          disabled={!mail || !password || !!emailError || !!passwordError || loading}
        >
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={AuthStyles.buttonLoginText}>Log in</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}
