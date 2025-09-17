import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import ProgressBarHeader from '../../ProgressBarHeader';
import { useProgress } from '../../ProgressContext';
import { AuthStyles } from '../../../styles/AuthStyles';
import { MainStyles } from '../../../styles/MainStyles';
import { useUser } from '../../UserContext';
import { ENDPOINTS } from '../../api/endpoints';

export default function RegStep_3({ navigation }) {
  const { setProgress } = useProgress();
  const { updateUser } = useUser();

  const [interests, setInterests] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setProgress(60);

    let mounted = true;

    const fetchInterests = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(ENDPOINTS.INTERESTS_LIST, { method: 'GET' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (mounted) {
          setInterests(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Ошибка загрузки интересов:', err);
        if (mounted) setError('Не удалось загрузить список интересов');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchInterests();
    return () => { mounted = false; };
  }, [setProgress]);

  // Добавление/удаление интереса
  const toggleInterest = (id) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(item => item !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  // Continue → сохраняем массив в Settings
  const handleContinue = () => {
    if (selectedInterests.length === 0) return;

    const selectedLabels = interests
      .filter(i => selectedInterests.includes(i.id))
      .map(i => i.name);

    updateUser({
      Settings: {
        interests: selectedLabels, // сохраняем массив строк
      },
    });

    navigation.navigate('RegStep_4');
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
        <Text style={AuthStyles.title}>Choose your interests</Text>

        {loading ? (
          <ActivityIndicator style={{ marginTop: 20 }} />
        ) : error ? (
          <Text style={AuthStyles.textError}>{error}</Text>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}
          >
            {interests.map((interest) => (
              <TouchableOpacity
                key={interest.id}
                style={[
                  AuthStyles.InterestsItem,
                  AuthStyles.radioContainer,
                  selectedInterests.includes(interest.id) && AuthStyles.languageItemSelected,
                ]}
                onPress={() => toggleInterest(interest.id)}
              >
                <Text style={[AuthStyles.languageText, { marginLeft: 0 }]}>
                  {interest.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      <View style={AuthStyles.footer}>
        <TouchableOpacity
          style={selectedInterests.length > 0 ? AuthStyles.buttonLogin : AuthStyles.buttonDisabled}
          onPress={handleContinue}
          disabled={selectedInterests.length === 0}
        >
          <Text style={AuthStyles.buttonLoginText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
