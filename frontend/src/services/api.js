// API Configuration for Multi-School ID Studio
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://multi-school-id-studio.onrender.com';

export async function fetchSchools() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/schools`);
    if (!response.ok) throw new Error('Failed to fetch schools');
    return await response.json();
  } catch (error) {
    console.warn('API error, falling back to local data:', error);
    return null;
  }
}

export async function loginUser(passcode, mobileNumber, role) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode, mobileNumber, role })
    });
    if (!response.ok) throw new Error('Login failed');
    return await response.json();
  } catch (error) {
    console.warn('API error, falling back to mock authentication:', error);
    return null;
  }
}
