// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLanguage } from './LanguageContext';
import axios from 'axios';  // استخدم axios للتواصل مع الخادم

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Check initial session
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('/api/session');  // تواصل مع API للحصول على بيانات الجلسة
        const session = response.data;

        if (session?.user) {
          setUser(session.user);
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/login', { email, password });  // استعلام للخادم لتسجيل الدخول

      if (data.user) {
        setUser(data.user);
        toast.success(t('login.success'));
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(t('login.error'));
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/login/google');  // استعلام لخادم لتسجيل الدخول باستخدام جوجل

      if (data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Google login error:', error);
      toast.error(t('login.googleError'));
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Partial<User>) => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/register', userData);  // استعلام لخادم للتسجيل

      if (data.user) {
        setUser(data.user);
        toast.success(t('signup.success'));
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(t('signup.error'));
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await axios.post('/api/logout');  // استعلام لخادم لتسجيل الخروج

      setUser(null);
      toast.success(t('logout.success'));
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(t('logout.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginWithGoogle,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
