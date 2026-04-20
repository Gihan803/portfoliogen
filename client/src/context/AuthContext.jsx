import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loginUser, registerUser, logoutUser, fetchCurrentUser, isAuthenticated, updateUserProfile } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Clear any auth error
  const clearError = useCallback(() => setError(null), []);

  // On mount: check if user is already authenticated
  useEffect(() => {
    const initAuth = async () => {
      if (isAuthenticated()) {
        const result = await fetchCurrentUser();
        if (result.success) {
          setUser(result.user);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Register
  const register = useCallback(async (formData) => {
    setError(null);
    setLoading(true);

    const result = await registerUser(formData);

    if (result.success) {
      setUser(result.user);
    } else {
      setError(result.error);
    }

    setLoading(false);
    return result;
  }, []);

  // Update Profile
  const updateProfile = useCallback(async (formData) => {
    setError(null);
    setLoading(true);

    const result = await updateUserProfile(formData);

    if (result.success) {
      setUser(result.user);
    } else {
      setError(result.error);
    }

    setLoading(false);
    return result;
  }, []);

  // Login
  const login = useCallback(async (credentials) => {
    setError(null);
    setLoading(true);

    const result = await loginUser(credentials);

    if (result.success) {
      setUser(result.user);
    } else {
      setError(result.error);
    }

    setLoading(false);
    return result;
  }, []);

  // Logout
  const logout = useCallback(async () => {
    setLoading(true);
    await logoutUser();
    setUser(null);
    setError(null);
    setLoading(false);
  }, []);

  const value = {
    user,
    loading,
    error,
    isLoggedIn: !!user,
    register,
    login,
    logout,
    updateProfile,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for consuming the context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
