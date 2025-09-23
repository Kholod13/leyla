// src/contexts/UserContext.js
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    username: '',
    email: '',
    Settings: {
      nativeLanguage: '',
      learnLanguage: '',
      levelLanguage: '',
      interestsIds: [],
      interestsNames: [],
    }
  }); // объект текущего пользователя

  const [loading, setLoading] = useState(false);

  // Загружаем пользователя из AsyncStorage при старте приложения
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Ошибка загрузки пользователя:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Сохраняем пользователя в AsyncStorage при изменениях
  useEffect(() => {
    const saveUser = async () => {
      try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.error('Ошибка сохранения пользователя:', error);
      }
    };
    // Не сохраняем, пока идет начальная загрузка
    if (!loading) saveUser();
  }, [user, loading]);

  // Функция для частичного обновления пользователя
  const updateUser = useCallback((updates) => {
    setUser((prev) => ({
      ...prev,
      ...updates,
      Settings: updates.Settings
        ? { ...prev.Settings, ...updates.Settings }
        : prev.Settings,
    }));
  }, []);

  // Очистка данных при logout
  const clearUser = useCallback(async () => {
    setUser({
      id: null,
      username: '',
      email: '',
      Settings: {
        nativeLanguage: '',
        learnLanguage: '',
        levelLanguage: '',
        interestsIds: [],
        interestsNames: [],
      },
    });
    try {
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Ошибка очистки пользователя:', error);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, clearUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

// Кастомный хук для доступа к контексту
export const useUser = () => useContext(UserContext);