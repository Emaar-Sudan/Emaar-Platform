// src/pages/LoginPage.tsx
import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'; 
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { LoginForm } from '../components/auth/LoginForm';
import { SocialLogin } from '../components/auth/SocialLogin';

const LoginPage = () => {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();  // استخدام useLocation لالتقاط الموقع الحالي
  const BackArrow = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const handleLoginSuccess = () => {
    const redirectPath = location.state?.from || '/';  // التوجيه إلى المسار المحفوظ أو الصفحة الرئيسية
    navigate(redirectPath);  // التوجيه بعد تسجيل الدخول
    toast.success(t('login.success'));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4" dir={dir}>
      <div className="container mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6"
        >
          <BackArrow className="w-5 h-5" />
          <span>{t('login.back')}</span>
        </button>

        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            {t('login.title')}
          </h2>

          <LoginForm onLogin={handleLoginSuccess} />  {/* تمرير دالة onLogin */}

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                {t('login.orContinueWith')}
              </span>
            </div>
          </div>

          <SocialLogin />

          <p className="text-center text-sm text-gray-600 mt-6">
            {t('login.noAccount')}{' '}
            <Link to="/signup" className="text-primary hover:underline">
              {t('login.signUp')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
