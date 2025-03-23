// types/user.ts
export type UserType = 'individual' | 'company';

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  type: UserType;
}
