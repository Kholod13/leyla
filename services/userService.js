// src/services/userService.js
import { API_BASE_URL } from '@env';

export async function getCurrentUser(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to fetch user');
    return await response.json();
  } catch (error) {
    console.error('getCurrentUser error:', error);
    return null;
  }
}

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Login failed');
    return await response.json(); // ожидаем { token, user }
  } catch (error) {
    console.error('loginUser error:', error);
    throw error;
  }
}
