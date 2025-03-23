import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useLanguage } from './LanguageContext';
import { db } from '../lib/mysql'; // استيراد اتصال MySQL

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const checkSession = async () => {
      try {
        // تحقق من الجلسة عبر قاعدة البيانات
        const [rows] = await db.execute('SELECT * FROM users WHERE session_id = ?', [session.id]);
        if (rows.length > 0) {
          setUser({
            id: rows[0].id,
            email: rows[0].email,
            name: rows[0].name,
            type: rows[0].type,
            role: rows[0].role,
          });
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
      // تحقق من المستخدم عبر قاعدة البيانات
      const [rows] = await db.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

      if (rows.length === 0) {
        throw new Error(t('login.error'));
      }

      setUser({
        id: rows[0].id,
        email: rows[0].email,
        name: rows[0].name,
        type: rows[0].type,
        role: rows[0].role,
      });

      toast.success(t('login.success'));
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || t('login.error'));
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Partial<User>) => {
    try {
      setLoading(true);
      // تحقق من إذا كان البريد موجودًا في قاعدة البيانات
      const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [userData.email]);
      if (existingUser.length > 0) {
        throw new Error(t('signup.errors.emailExists'));
      }

      // تسجيل المستخدم في قاعدة البيانات
      const [result] = await db.execute(
        'INSERT INTO users (email, password, name, type, role) VALUES (?, ?, ?, ?, ?)',
        [userData.email, userData.password, userData.name, userData.type, 'user']
      );

      if (result.affectedRows === 1) {
        toast.success(t('signup.success'));
        navigate('/login');
      } else {
        throw new Error(t('signup.error'));
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || t('signup.error'));
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setUser(null);
      toast.success(t('logout.success'));
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(error.message || t('logout.error'));
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
