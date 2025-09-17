import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import ProgressBarHeader from '../../ProgressBarHeader';
import { useProgress } from '../../ProgressContext';
import { AuthStyles } from '../../../styles/AuthStyles';
import { MainStyles } from '../../../styles/MainStyles';
import { useState, useEffect } from 'react';
import { ENDPOINTS } from '../../api/endpoints';
import { useUser } from '../../UserContext';

export default function RegStep_1({ navigation }) {
  const { setProgress } = useProgress();
  const { user, updateUser } = useUser();

  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setProgress(30); // Устанавливаем прогресс на 0% при загрузке этого шага

  let mounted = true; // чтобы избежать setState после unmount
    const fetchLanguages = async () => {
      setLoading(true);
      setError('');
    try {
      const res = await fetch(ENDPOINTS.LANGUAGES_LIST);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (mounted) {
        const filtered = Array.isArray(data)
        ? data.filter(lang => lang.name !== user?.Settings?.nativeLanguage)
        : [];
        setLanguages(filtered);
      }
    } catch (err) {
      console.error('Ошибка загрузки языков:', err);
      if (mounted) setError('Server error');
    } finally {
      if (mounted) setLoading(false);
    }
  };

  fetchLanguages();
    return () => { mounted = false; };
  }, [setProgress]);

  // Нажатие Continue: сохраняем в UserContext и идём дальше
  const handleContinue = () => {
    if (!selectedLanguage) return;
    const langObj = languages.find(l => l.id === selectedLanguage);
    // сохраняем в UserContext. updateUser сделан у тебя так, что он аккуратно мёржит Settings.
    updateUser({
      Settings: {
        learnLanguage: langObj ? langObj.name : String(selectedLanguage),
      },
    });
    navigation.navigate('RegStep_2'); // следующий шаг в AuthStack
  };
  
  return (
    <View style={AuthStyles.container}>
      <View style={AuthStyles.progressBarContainer}>
        <TouchableOpacity style={MainStyles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/icons/ArrowLeft.png')} />
        </TouchableOpacity>

        <ProgressBarHeader />
      </View>
      <View style={AuthStyles.content}>
        <Text style={AuthStyles.title}>Choose the language you want to learn</Text>

        {loading ? (
          <ActivityIndicator style={{ marginTop: 20 }} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 12 }}>
            {error ? (
              <Text style={AuthStyles.textError}>{error}</Text>
            ) : (
              languages.map(lang => (
                <TouchableOpacity
                  key={lang.id}
                  style={[
                    AuthStyles.languageItem,
                    AuthStyles.radioContainer,
                    selectedLanguage === lang.id && AuthStyles.languageItemSelected,
                  ]}
                  onPress={() => setSelectedLanguage(lang.id)}
                >
                  <Image
                      source={require(`../../../assets/icons/Ukraine.png`)}
                    />
                  <Text
                    style={[
                      AuthStyles.languageText,
                      selectedLanguage === lang.id,
                    ]}
                  >
                    {lang.name}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        )}
      </View>

      <View style={AuthStyles.footer}>
        <TouchableOpacity
          style={selectedLanguage ? AuthStyles.buttonLogin : AuthStyles.buttonDisabled}
          onPress={handleContinue}
          disabled={!selectedLanguage}
        >
          <Text style={AuthStyles.buttonLoginText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
