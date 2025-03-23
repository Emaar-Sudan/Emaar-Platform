// hooks/useJobApplicationForm.ts
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
}

export const useJobApplicationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    coverLetter: ''
  });
  const [resume, setResume] = useState<File | null>(null);
  const [hasAgreed, setHasAgreed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file: File | null) => {
    setResume(file);
  };

  const validateForm = () => {
    return (
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== '' &&
      resume !== null &&
      hasAgreed
    );
  };

  return {
    formData,
    setFormData,
    resume,
    hasAgreed,
    setHasAgreed,
    handleChange,
    handleFileChange,
    validateForm
  };
};