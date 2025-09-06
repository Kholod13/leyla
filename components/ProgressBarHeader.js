import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useProgress } from "./ProgressContext";

export default function ProgressBarHeader() {
  const { progress } = useProgress(); // ✅ вместо useContext(ProgressContext)

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <LinearGradient
          colors={['#F9D423', '#FF9853']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.bar, { width: `${progress}%` }]}
        />
      </View>
    </View>
  );
}

const styles = {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item: {
        height: 8,
        backgroundColor: '#E5E0DC',
        width: '100%',
        borderRadius: 5,
        overflow: 'hidden',
    },
    bar: {
        height: '100%',
        borderRadius: 5,
    }
};