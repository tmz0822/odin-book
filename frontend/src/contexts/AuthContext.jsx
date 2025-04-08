import { createContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = currentUser !== null;

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:3000/users/me', {
        credentials: 'include',
      });

      const data = await response.json();
      if (data.success) {
        setCurrentUser(data.user);
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    const data = await authService.login(username, password);
    if (data.success) {
      setCurrentUser(data.user);
    }
  };

  const logout = async () => {
    await authService.logout();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

