export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          phone: string | null;
          photo_url: string | null;
          type: 'individual' | 'company';
          role: 'user' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          phone?: string | null;
          photo_url?: string | null;
          type: 'individual' | 'company';
          role?: 'user' | 'admin';
        };
        Update: {
          email?: string;
          name?: string | null;
          phone?: string | null;
          photo_url?: string | null;
          type?: 'individual' | 'company';
          role?: 'user' | 'admin';
        };
      };
      // Add other table definitions as needed
    };
  };
}