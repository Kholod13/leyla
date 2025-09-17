import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, TextInput } from 'react-native';
import ProgressBarHeader from '../../ProgressBarHeader';
import { useProgress } from '../../ProgressContext';
import { AuthStyles } from '../../../styles/AuthStyles';
import { MainStyles } from '../../../styles/MainStyles';
import { ENDPOINTS } from '../../api/endpoints';
import { useUser } from '../../UserContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function RegStep_4({ navigation }) {
  const { setProgress } = useProgress();
  const { updateUser } = useUser();

  const [username, setUsername] = useState('');
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState('');
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    setProgress(75);
  }, [setProgress]);

  const checkUsername = async (name) => {
    if (!name) {
      setError('Input username');
      setAvailable(false);
      return;
    }
    setChecking(true);
    setError('');
    try {
      const res = await fetch(ENDPOINTS.CHECK_NICKNAME, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: name }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.taken) {
        setError('Username is not available');
        setAvailable(false);
      } else {
        setAvailable(true);
      }
    } catch (err) {
      console.error('Ошибка проверки никнейма:', err);
      setError('Error checking username');
      setAvailable(false);
    } finally {
      setChecking(false);
    }
  };

  const handleContinue = () => {
    if (!available) return;
    updateUser({
      username,
    });
    navigation.navigate('RegStep_5'); // следующий шаг
  };

  return (
    <View style={AuthStyles.container}>
      <LinearGradient
        colors={['#FF8330', '#F9D423']}
        style={AuthStyles.circleNamePage1}
      />
      <LinearGradient
        colors={['#FF9A57', '#F9D423']}
        style={AuthStyles.circleNamePage2}
      />
      <LinearGradient
        colors={['#FF9A57', '#F9D423']}
        style={AuthStyles.circleNamePage3}
      />
      
      <View style={AuthStyles.progressBarContainer}>
        <TouchableOpacity style={MainStyles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/icons/ArrowLeft.png')} />
        </TouchableOpacity>
        <ProgressBarHeader />
      </View>

      <View style={AuthStyles.content}>
        <Text style={AuthStyles.title}>Set your username</Text>
        <Text style={AuthStyles.inputText}>Username</Text>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#918D8A"
          style={[AuthStyles.input, error && AuthStyles.inputError]}
          value={username.toLowerCase()}
          onChangeText={(text) => {
            const clean = text.replace(/\s/g, ''); // удаляем все пробелы
            setUsername(clean);
            setAvailable(false);
            setError('');
          }}
          onBlur={() => checkUsername(username)} // проверяем при потере фокуса
          autoCapitalize="none"
        />
        {checking && <ActivityIndicator style={{ marginTop: 10 }} />}
        {error ? <Text style={AuthStyles.textError}>{error}</Text> : null}
      </View>

      <View style={AuthStyles.footer}>
        <TouchableOpacity
          style={available ? AuthStyles.buttonLogin : AuthStyles.buttonDisabled}
          onPress={handleContinue}
          disabled={!available}
        >
          <Text style={AuthStyles.buttonLoginText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
