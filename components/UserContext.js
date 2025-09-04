// src/contexts/UserContext.js
import React, { createContext, useState, useContext, useCallback } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // объект текущего пользователя
  const [loading, setLoading] = useState(false);

  // ✅ функция для обновления профиля (например, при редактировании)
  const updateUser = useCallback((updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  }, []);

  // ✅ функция для очистки данных (logout)
  const clearUser = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, clearUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);