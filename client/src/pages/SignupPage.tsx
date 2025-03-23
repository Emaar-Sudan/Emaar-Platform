import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Check, X, Mail, Phone, Camera, Upload, Building2, GraduationCap, MapPin, Briefcase, Lock, CheckCircle } from 'lucide-react';

type AccountType = 'citizen' | 'visitor';
type Step = 1 | 2 | 3 | 4 | 5;

interface FormData {
  accountType: AccountType | null;
  email: string;
  confirmEmail: string;
  countryCode: string;
  phone: string;
  // Personal Information
  fullName: string;
  nationality: string;
  idNumber: string;
  dateOfBirth: string;
  address: string;
  occupation: string;
  educationLevel: string;
  // Document
  documentImage: File | null;
  // Password fields will be added in step 4
  password: string;
  confirmPassword: string;
}

interface ExtractedData {
  fullName: string;
  nationality: string;
  idNumber: string;
  dateOfBirth: string;
}

const SignupPage = () => {
  const navigate = useNavigate();
  const { t, dir } = useLanguage();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    accountType: null,
    email: '',
    confirmEmail: '',
    countryCode: '+249',
    phone: '',
    fullName: '',
    nationality: '',
    idNumber: '',
    dateOfBirth: '',
    address: '',
    occupation: '',
    educationLevel: '',
    documentImage: null,
    password: '',
    confirmPassword: ''
  });
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);

  const steps = [
    t('signup.steps.accountType'),
    t('signup.steps.contact'),
    t('signup.steps.personal'),
    t('signup.steps.password'),
    t('signup.steps.completion')
  ];

  const countryCodes = [
    { code: '+249', country: 'Sudan' },
    { code: '+966', country: 'Saudi Arabia' },
    { code: '+971', country: 'UAE' },
    { code: '+20', country: 'Egypt' },
    { code: '+974', country: 'Qatar' },
    // Add more country codes as needed
  ];

  const handleAccountTypeSelect = (type: AccountType) => {
    setFormData(prev => ({ ...prev, accountType: type }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateContactInfo = () => {
    if (!formData.email || !formData.confirmEmail || !formData.phone) {
      return false;
    }
    if (formData.email !== formData.confirmEmail) {
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (!formData.password || !formData.confirmPassword) {
      return false;
    }
    if (formData.password.length < 8) {
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      return false;
    }
    return true;
  };

  const handleFileUpload = (file: File) => {
    setFormData(prev => ({ ...prev, documentImage: file }));
    // Simulate OCR extraction
    setTimeout(() => {
      setExtractedData({
        fullName: 'John Doe',
        nationality: 'Sudanese',
        idNumber: '1234567890',
        dateOfBirth: '1990-01-01'
      });
    }, 1000);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setShowCamera(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'captured-id.jpg', { type: 'image/jpeg' });
          handleFileUpload(file);
        }
      });
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const handleSubmit = async () => {
    try {
      // Here you would typically make an API call to register the user
      // For now, we'll just simulate success
      setCurrentStep(5);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleContinue = () => {
    if (currentStep === 2 && !validateContactInfo()) {
      return;
    }
    if (currentStep < 5) {
      setCurrentStep((prev => (prev + 1) as Step));
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev => (prev - 1) as Step));
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir={dir}>
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
                >
                  <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    index + 1 === currentStep 
                      ? 'border-primary bg-primary text-white'
                      : index + 1 < currentStep
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-300 bg-white text-gray-500'
                  }`}>
                    {index + 1 < currentStep ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${
                      index + 1 < currentStep ? 'bg-primary' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {steps.map((step, index) => (
                <div key={index} className="text-xs text-center flex-1">
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-center">
                  {t('signup.chooseAccountType')}
                </h2>
                <div className="space-y-4">
                  <label className="block p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="accountType"
                      className="sr-only"
                      checked={formData.accountType === 'citizen'}
                      onChange={() => handleAccountTypeSelect('citizen')}
                    />
                    <div className="flex items-center">
                      <div className={`w-5 h-5 border-2 rounded-full mr-3 ${
                        formData.accountType === 'citizen' 
                          ? 'border-primary bg-primary'
                          : 'border-gray-300'
                      }`} />
                      <div>
                        <p className="font-medium">{t('signup.citizenTitle')}</p>
                        <p className="text-sm text-gray-500">{t('signup.citizenDesc')}</p>
                      </div>
                    </div>
                  </label>

                  <label className="block p-4 border-2 rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <input
                      type="radio"
                      name="accountType"
                      className="sr-only"
                      checked={formData.accountType === 'visitor'}
                      onChange={() => handleAccountTypeSelect('visitor')}
                    />
                    <div className="flex items-center">
                      <div className={`w-5 h-5 border-2 rounded-full mr-3 ${
                        formData.accountType === 'visitor' 
                          ? 'border-primary bg-primary'
                          : 'border-gray-300'
                      }`} />
                      <div>
                        <p className="font-medium">{t('signup.visitorTitle')}</p>
                        <p className="text-sm text-gray-500">{t('signup.visitorDesc')}</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-center">
                  {t('signup.enterContactInfo')}
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">
                      {t('signup.email')}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder={t('signup.emailPlaceholder')}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="confirmEmail">
                      {t('signup.confirmEmail')}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        id="confirmEmail"
                        name="confirmEmail"
                        value={formData.confirmEmail}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder={t('signup.confirmEmailPlaceholder')}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="phone">
                      {t('signup.phone')}
                    </label>
                    <div className="flex gap-2">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        className="w-32 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        {countryCodes.map(({ code, country }) => (
                          <option key={code} value={code}>
                            {code} ({country})
                          </option>
                        ))}
                      </select>
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder={t('signup.phonePlaceholder')}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-center">
                  {t('signup.enterPersonalInfo')}
                </h2>

                {/* Document Upload Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">
                    {t('signup.documentUpload')}
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Camera Capture */}
                    <button
                      onClick={startCamera}
                      className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg hover:border-primary transition-colors"
                    >
                      <Camera className="w-5 h-5" />
                      {t('signup.openCamera')}
                    </button>

                    {showCamera && (
                      <div className="relative">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full rounded-lg"
                        />
                        <div className="flex justify-center gap-4 mt-4">
                          <button
                            onClick={captureImage}
                            className="px-4 py-2 bg-primary text-white rounded-lg"
                          >
                            {t('signup.capture')}
                          </button>
                          <button
                            onClick={stopCamera}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                          >
                            {t('signup.cancel')}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* File Upload */}
                    <div
                      className="relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file);
                        }}
                      />
                      <Upload className="mx-auto w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">
                        {t('signup.dragDropFile')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Extracted Data Section */}
                {extractedData && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">
                      {t('signup.extractedData')}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-500">{t('signup.fullName')}</p>
                        <p className="font-medium">{extractedData.fullName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('signup.nationality')}</p>
                        <p className="font-medium">{extractedData.nationality}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('signup.idNumber')}</p>
                        <p className="font-medium">{extractedData.idNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('signup.dateOfBirth')}</p>
                        <p className="font-medium">{extractedData.dateOfBirth}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Manual Input Fields */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t('signup.address')}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t('signup.occupation')}
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="occupation"
                        value={formData.occupation}
                        onChange={(e) => setFormData(prev => ({ ...prev, occupation: e.target.value }))}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t('signup.educationLevel')}
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        name="educationLevel"
                        value={formData.educationLevel}
                        onChange={(e) => setFormData(prev => ({ ...prev, educationLevel: e.target.value }))}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">{t('signup.selectEducation')}</option>
                        <option value="high-school">{t('signup.education.highSchool')}</option>
                        <option value="diploma">{t('signup.education.diploma')}</option>
                        <option value="bachelors">{t('signup.education.bachelors')}</option>
                        <option value="masters">{t('signup.education.masters')}</option>
                        <option value="doctorate">{t('signup.education.doctorate')}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-center">
                  {t('signup.enterPassword')}
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t('signup.password')}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder={t('signup.passwordPlaceholder')}
                        minLength={8}
                        required
                      />
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {t('signup.passwordRequirements')}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      {t('signup.confirmPassword')}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder={t('signup.confirmPasswordPlaceholder')}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold mb-4">
                  {t('signup.registrationSuccess')}
                </h2>
                <p className="text-gray-600 mb-8">
                  {t('signup.registrationMessage')}
                </p>
                <Link
                  to="/login"
                  className="inline-block px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  {t('signup.loginNow')}
                </Link>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 5 && (
              <div className="flex justify-between mt-8">
                {currentStep === 1 ? (
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    {t('common.cancel')}
                  </button>
                ) : (
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800"
                  >
                    {t('common.back')}
                  </button>
                )}
                <button
                  onClick={currentStep === 4 ? handleSubmit : handleContinue}
                  disabled={
                    (currentStep === 1 && !formData.accountType) ||
                    (currentStep === 2 && !validateContactInfo()) ||
                    (currentStep === 4 && !validatePassword())
                  }
                  className={`px-6 py-2 bg-primary text-white rounded-lg flex items-center gap-2 ${
                    ((currentStep === 1 && !formData.accountType) ||
                    (currentStep === 2 && !validateContactInfo()) ||
                    (currentStep === 4 && !validatePassword()))
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-primary-dark'
                  }`}
                >
                  {currentStep === 4 ? t('signup.createAccount') : t('common.continue')}
                  <Check className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;