// JobApplicationPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, ArrowRight, Upload, FileText, Check } from 'lucide-react';
import { useJobDetails } from '@/hooks/useJobs';
import { jobApplicationsApi } from '@/services/api/jobApplications';
import { useJobApplicationForm } from '@/hooks/useJobApplicationForm';
import { LoadingScreen } from '@/components/ui/LoadingIndicator';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import type { User } from '@/types/user';
import axios from 'axios'; // استخدم axios للتفاعل مع الخادم

const JobApplicationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t, dir } = useLanguage();
  const { user } = useAuth();
  const BackArrow = dir === 'rtl' ? ArrowRight : ArrowLeft;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const { job, isLoading: jobLoading } = useJobDetails(id || '');
  const {
    formData,
    setFormData,
    resume,
    hasAgreed,
    setHasAgreed,
    handleChange,
    handleFileChange,
    validateForm
  } = useJobApplicationForm();

  // التحقق من المصادقة وجلب بيانات المستخدم من MySQL
  useEffect(() => {
    const checkAuthAndFetchProfile = async () => {
      if (!user) {
        toast.error(t('login.firstLogin'));
        navigate('/login', { state: { from: location.pathname } });
        return;
      }

      try {
        const profile = await getUserProfileFromDB(user.id);
        if (profile.type !== 'individual') {
          toast.error(t('jobs.application.onlyIndividuals'));
          navigate('/jobs');
          return;
        }

        setUserProfile(profile);
        setFormData(prev => ({
          ...prev,
          name: profile.name || '',
          phone: profile.phone || '',
          email: profile.email || ''
        }));
      } catch (profileError) {
        console.error('Error fetching profile:', profileError);
        toast.error(t('profile.fetchError'));
      }
    };

    checkAuthAndFetchProfile();
  }, [navigate, location.pathname, t, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error(t('form.validation.required'));
      return;
    }

    if (!userProfile || userProfile.type !== 'individual') {
      toast.error(t('jobs.application.onlyIndividuals'));
      return;
    }

    setIsSubmitting(true);
    try {
      // رفع السيرة الذاتية إلى التخزين
      if (resume) {
        const fileName = `${user!.id}/${Date.now()}-${resume.name}`;
        const fileUrl = await uploadFileToStorage(fileName, resume);  // استخدام خدمة لرفع الملف

        // إنشاء طلب التوظيف
        await createJobApplication(id!, {
          cover_letter: formData.coverLetter,
          resume_url: fileUrl
        });

        toast.success(t('jobs.application.success'));
        navigate(`/jobs/${id}`);
      }
    } catch (error) {
      console.error('Application submission error:', error);
      toast.error(t('jobs.application.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (jobLoading) {
    return <LoadingScreen message={t('jobs.loading')} />;
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('jobs.notFound')}</h1>
          <button
            onClick={() => navigate('/jobs')}
            className="text-primary hover:underline"
          >
            {t('jobs.backToList')}
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(`/jobs/${id}`)}
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-8"
        >
          <BackArrow className="w-5 h-5" />
          <span>{t('jobs.application.back')}</span>
        </button>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-8">
              {t('jobs.application.title')} - {job.title}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* معلومات شخصية */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('jobs.application.name')} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  disabled
                  className="w-full p-3 border rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('jobs.application.email')} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full p-3 border rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('jobs.application.phone')} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  disabled
                  className="w-full p-3 border rounded-lg bg-gray-100"
                />
              </div>

              {/* خطاب التغطية */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('jobs.application.coverLetter')}
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>

              {/* رفع السيرة الذاتية */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  {t('jobs.application.cv')} *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                    className="hidden"
                    id="resume"
                  />
                  <label
                    htmlFor="resume"
                    className="flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
                  >
                    {resume ? (
                      <>
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="text-gray-600">{resume.name}</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600">{t('jobs.application.dropCV')}</span>
                      </>
                    )}
                  </label>
                  <p className="mt-2 text-sm text-gray-500">
                    {t('jobs.application.acceptedFormats')}
                  </p>
                </div>
              </div>

              {/* الموافقة على الشروط */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="agreement"
                  checked={hasAgreed}
                  onChange={(e) => setHasAgreed(e.target.checked)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="agreement" className="text-sm text-gray-600">
                  {t('jobs.application.termsAgreement')}
                </label>
              </div>

              {/* زر التقديم */}
              <button
                type="submit"
                disabled={isSubmitting || !hasAgreed}
                className={`w-full btn-primary py-3 flex items-center justify-center gap-2 ${
                  (isSubmitting || !hasAgreed) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⟳</span>
                    {t('jobs.application.submitting')}
                  </span>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    {t('jobs.application.submit')}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationPage;