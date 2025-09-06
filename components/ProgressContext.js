// components/ProgressContext.js
import React, { createContext, useState, useContext } from 'react';

// создаём контекст
export const ProgressContext = createContext();

// провайдер
const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);

  return (
    <ProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

// экспорт по умолчанию ✅
export default ProgressProvider;

// удобный хук
export const useProgress = () => useContext(ProgressContext);
