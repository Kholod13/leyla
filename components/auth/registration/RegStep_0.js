import React from 'react';
import { View, Text, Button } from 'react-native';
import ProgressBarHeader from '../../ProgressBarHeader';
import { useProgress } from '../../ProgressContext';

export default function RegStep_0() {
  const { progress, setProgress } = useProgress();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>RegStep_0 Screen</Text>
       {/* Полоса прогресса сверху */}
      <ProgressBarHeader />

      {/* Пример управления прогрессом */}
      <Button
        title="Добавить 10%"
        onPress={() => setProgress(Math.min(progress + 10, 100))}
      />
      <Button
        title="Сбросить прогресс"
        onPress={() => setProgress(0)}
      />
    </View>
  );
}
