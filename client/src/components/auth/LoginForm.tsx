import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Mail, Lock, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

export const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email, password);
      onLogin();
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          {t('login.email')}
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder={t('login.emailPlaceholder')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          {t('login.password')}
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder={t('login.passwordPlaceholder')}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
            {t('login.rememberMe')}
          </label>
        </div>
        <Link
          to="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          {t('login.forgotPassword')}
        </Link>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary py-3 flex items-center justify-center gap-2"
      >
        <LogIn className="w-5 h-5" />
        {isSubmitting ? t('login.loggingIn') : t('login.submit')}
      </button>
    </form>
  );
};