import { authAPI } from './api';

// Register a new user
export const registerUser = async ({ username, email, password, passwordConfirm, fullName }) => {
  try {
    const response = await authAPI.register({
      username,
      email,
      password,
      passwordConfirm,
      fullName,
    });

    const { token, user } = response.data;

    // Persist auth state
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return { success: true, user, token };
  } catch (error) {
    const message = error.response?.data?.error || 'Registration failed. Please try again.';
    return { success: false, error: message };
  }
};

// Login an existing user
export const loginUser = async ({ email, password }) => {
  try {
    const response = await authAPI.login({ email, password });

    const { token, user } = response.data;

    // Persist auth state
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return { success: true, user, token };
  } catch (error) {
    const message = error.response?.data?.error || 'Login failed. Please try again.';
    return { success: false, error: message };
  }
};

// Logout the current user
export const logoutUser = async () => {
  try {
    await authAPI.logout();
  } catch (error) {
    // Even if the server call fails, clear local state
    console.warn('Logout API call failed:', error.message);
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Get the current authenticated user from the server
export const fetchCurrentUser = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return { success: false, error: 'No token found' };

    const response = await authAPI.getCurrentUser();
    const { user } = response.data;

    // Keep localStorage in sync
    localStorage.setItem('user', JSON.stringify(user));

    return { success: true, user };
  } catch (error) {
    // Token is invalid/expired — cleanup
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    const message = error.response?.data?.error || 'Session expired. Please log in again.';
    return { success: false, error: message };
  }
};

// Check if the user is currently authenticated (quick local check)
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Update user profile
export const updateUserProfile = async (formData) => {
  try {
    const response = await authAPI.updateProfile(formData);
    const { user } = response.data;

    // Update persisted user state
    localStorage.setItem('user', JSON.stringify(user));

    return { success: true, user };
  } catch (error) {
    const message = error.response?.data?.error || 'Profile update failed. Please try again.';
    return { success: false, error: message };
  }
};
