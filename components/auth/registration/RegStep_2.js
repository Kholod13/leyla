import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import ProgressBarHeader from '../../ProgressBarHeader';
import { useProgress } from '../../ProgressContext';
import { AuthStyles } from '../../../styles/AuthStyles';
import { MainStyles } from '../../../styles/MainStyles';
import { useState, useEffect } from 'react';
import { ENDPOINTS } from '../../api/endpoints';
import { useUser } from '../../UserContext';

const languageLevels = [
  { key: 'A1', label: 'Beginner', underLabel: 'I can say hello' },
  { key: 'A2', label: 'Elementary', underLabel: 'Understand short conversations' },
  { key: 'B1', label: 'Intermediate', underLabel: 'Talk about familiar topics' },
  { key: 'B2', label: 'Upper Intermediate', underLabel: 'Understand complex content'},
  { key: 'C1', label: 'Advanced', underLabel: 'Speak confidently'},
  { key: 'C2', label: 'Proficient', underLabel: 'Speak like a native' },
];

export default function RegStep_2({ navigation }) {
  const { setProgress } = useProgress();
  const { updateUser } = useUser();

  const [selectedLanguageLevel, setSelectedLanguageLevel] = useState(null);

  useEffect(() => {
    setProgress(45); // Устанавливаем прогресс на 0% при загрузке этого шага
  }, [setProgress]);

  // Нажатие Continue: сохраняем в UserContext и идём дальше
  const handleContinue = () => {
    if (!selectedLanguageLevel) return;
    // сохраняем в UserContext. updateUser сделан у тебя так, что он аккуратно мёржит Settings.
    updateUser({
      Settings: {
        levelLanguage: String(selectedLanguageLevel),
      },
    });
    navigation.navigate('RegStep_3'); // следующий шаг в AuthStack
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
        <Text style={AuthStyles.title}>Choose your language level</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
            {languageLevels.map((lang) => (
              <TouchableOpacity
                key={lang.key}
                style={[
                  AuthStyles.languageItem,
                  AuthStyles.radioContainer,
                  selectedLanguageLevel === lang.key && AuthStyles.languageItemSelected,
                ]}
              onPress={() => {
                setSelectedLanguageLevel(lang.key);
              }}
              >
                <View>
                  <Text style={AuthStyles.languageLevelText}>{lang.key}</Text>
                </View>
                <View style={{ alignItems: 'left', gap: 5 }}>
                  <Text style={AuthStyles.languageLevelLabelText}>{lang.label}</Text>
                  <Text style={AuthStyles.languageLevelUnderLabelText}>{lang.underLabel}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
      </View>

      <View style={AuthStyles.footer}>
        <TouchableOpacity
          style={selectedLanguageLevel ? AuthStyles.buttonLogin : AuthStyles.buttonDisabled}
          onPress={handleContinue}
          disabled={!selectedLanguageLevel}
        >
          <Text style={AuthStyles.buttonLoginText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
