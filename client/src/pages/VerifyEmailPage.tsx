import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const { user, sendVerificationEmail } = useAuth();
  const { t } = useLanguage();
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/signup');
      return;
    }

    const checkVerification = setInterval(() => {
      user.reload().then(() => {
        if (user.emailVerified) {
          setIsVerified(true);
          clearInterval(checkVerification);
          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
        }
      });
    }, 3000);

    return () => clearInterval(checkVerification);
  }, [user, navigate]);

  useEffect(() => {
    if (!canResend && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(c => c - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleResendEmail = async () => {
    try {
      await sendVerificationEmail();
      setCanResend(false);
      setCountdown(60);
      toast.success(t('verifyEmail.resendSuccess'));
    } catch (error) {
      toast.error(t('verifyEmail.resendError'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {isVerified ? (
          <div className="text-center">
            <CheckCircle className="mx-auto w-16 h-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {t('verifyEmail.verified')}
            </h2>
            <p className="text-gray-600">
              {t('verifyEmail.redirecting')}
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <Mail className="mx-auto w-16 h-16 text-primary mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t('verifyEmail.title')}
              </h2>
              <p className="text-gray-600">
                {t('verifyEmail.description')}
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-blue-500" />
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    {t('verifyEmail.checkSpam')}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleResendEmail}
                disabled={!canResend}
                className={`w-full btn-primary py-3 mb-4 ${
                  !canResend && 'opacity-50 cursor-not-allowed'
                }`}
              >
                {canResend
                  ? t('verifyEmail.resend')
                  : `${t('verifyEmail.resendIn')} ${countdown}s`}
              </button>
              <p className="text-sm text-gray-500">
                {t('verifyEmail.wrongEmail')}{' '}
                <button
                  onClick={() => navigate('/signup')}
                  className="text-primary hover:underline"
                >
                  {t('verifyEmail.startOver')}
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;