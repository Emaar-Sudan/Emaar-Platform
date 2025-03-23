export type UserType = 'individual' | 'company';
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  photo_url?: string;
  type: UserType;
  role: UserRole;
  last_login?: Date;
  created_at: Date;
  updated_at: Date;
  profile_info?: string;
}

export interface CompanyProfile {
  id: string;
  user_id: string;
  business_name: string;
  commercial_reg_no: string;
  tax_number?: string;
  address?: string;
  city?: string;
  country?: string;
  industry?: string;
  company_size?: string;
  created_at: Date;
}

export interface IndividualProfile {
  id: string;
  user_id: string;
  national_id: string;
  date_of_birth?: Date;
  address?: string;
  city?: string;
  country?: string;
  occupation?: string;
  education_level?: string;
  created_at: Date;
}