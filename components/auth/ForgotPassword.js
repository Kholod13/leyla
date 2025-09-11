import React,  {useState} from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ActivityIndicator} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthStyles } from '../../styles/AuthStyles';
import { MainStyles } from '../../styles/MainStyles';
import { ENDPOINTS } from '../../components/api/endpoints';

export default function ForgotPassword({navigation}) {
  const [mail, setMail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailExists, setEmailExists] = useState(false); // ✅ новый стейт
  const [userId, setUserId] = useState(null); // сохраняем id для /remind_password


  const handleEmailChange = async (value) => {
    value = value.toLowerCase();
    setMail(value);
    setEmailError('');
    setEmailExists(false);
    setUserId(null);

    if (!value) return;

    try {
      const response = await fetch(ENDPOINTS.CHECK_EMAIL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const data = await response.json();

      if (data.is_format_good === false) {
        setEmailError("Invalid email format");
      } else if (data.taken === true && data.user_id) {
        // ✅ email существует, сохраняем user_id
        setEmailExists(true);
        setUserId(data.user_id);
        setEmailError('');
      } else if (data.taken === true) {
        // если user_id не возвращается, просто считаем что существует
        setEmailExists(true);
        setEmailError('');
      } else {
        setEmailError("User with this email not found");
      }
    } catch (err) {
      console.error("Email check error:", err);
      setEmailError("Server error, try again");
    }
  };

  const handleSend = async () => {
    if (!emailExists || emailError) return;

    setLoading(true);
    try {
      const response = await fetch(ENDPOINTS.REMIND_PASSWORD, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }), // используем сохранённый user_id
      });

      const data = await response.json();

      if (data.success) {
        navigation.navigate('CheckMail', { email: mail });
      } else {
        Alert.alert("Error", "Failed to send password reminder");
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      Alert.alert("Error", "Server error, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={AuthStyles.container}>
      <LinearGradient
        colors={['#FF8330', '#F9D423']}
        style={AuthStyles.circleForgotPassword1}>
      </LinearGradient>
      <LinearGradient
        colors={['#FF9A57', '#F9D423']}
        style={AuthStyles.circleForgotPassword2}>
      </LinearGradient>
      <LinearGradient
        colors={['#FF8330', '#F9D423']}
        style={AuthStyles.circleForgotPassword3}>
      </LinearGradient>
      <LinearGradient
        colors={['#FF9A57', '#F9D423']}
        style={AuthStyles.circleForgotPassword4}>
      </LinearGradient>

      <TouchableOpacity style={MainStyles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/icons/ArrowLeft.png')} />
      </TouchableOpacity>

      <View style={AuthStyles.content}>
        <Text style={AuthStyles.title}>Forgot password?</Text>

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
      </View>

      <View>
        <TouchableOpacity
          style={[
            mail && !emailError
              ? AuthStyles.buttonLogin
              : AuthStyles.buttonDisabled
          ]}
          onPress={handleSend}
          disabled={!mail || !!emailError || loading}
        >
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={AuthStyles.buttonLoginText}>Send</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}
