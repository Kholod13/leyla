import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../../../components/AuthContext';
import { useUser } from '../../../components/UserContext';

export default function LogoutButton({ navigation }) {
  const { logout } = useContext(AuthContext);
  const { clearUser } = useUser();

  const handleLogout = async () => {
    try {
      await clearUser();  // очистка данных пользователя
      await logout();     // выход из системы
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={styles.text}>Log Out</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF4C4C",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
