import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface UserMenuProps {
  user: {
    name: string;
    photoURL?: string | null;
  };
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const { t } = useLanguage();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <span className="text-sm font-medium">{user.name}</span>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={user.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-5 h-5 text-gray-600" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            {t('dashboard.logout')}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;