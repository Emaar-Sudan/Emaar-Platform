import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LogIn,
  UserPlus,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  LogOut,
} from 'lucide-react';
import { useLanguage } from '../contexts';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  // Close menu and dropdowns when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  // Handle click outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector('.language-dropdown');
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle dropdown
  const toggleDropdown = useCallback(() => {
    setOpenDropdown(prev => (prev === 'language' ? null : 'language'));
  }, []);

  const handleLanguageChange = useCallback((lang: 'ar' | 'en') => {
    setLanguage(lang);  // Set the new language
    setOpenDropdown(null);  // Close the dropdown after selecting the language
  }, [setLanguage]);

  const isActive = useCallback((href: string) => location.pathname === href, [location.pathname]);

  const handleDashboardClick = useCallback(() => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
    setIsMenuOpen(false);
  }, [user, navigate]);

  const mainNavLinks = [
    { key: 'header.home', href: '/' },
    {
      key: 'header.aboutUs',
      href: '#',
      dropdown: true,
      items: [
        { key: 'header.about', href: '/about' },
        { key: 'header.contact', href: '/contact' },
      ],
    },
    {
      key: 'header.services',
      href: '#',
      dropdown: true,
      items: [
        { key: 'header.tenders', href: '/tenders' },
        { key: 'header.auctions', href: '/auctions' },
        { key: 'header.jobs', href: '/jobs' },
        { key: 'header.map', href: '/map' },
      ],
    },
    { key: 'header.news', href: '/news' },
    { key: 'header.results', href: '/results' },
    { key: 'header.projects', href: '/projects' },
    { key: 'header.support', href: '/support' },
  ];

  return (
    <header className="bg-white shadow-md" dir={direction}>
      {/* Top Bar */}
      <div className="bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="py-3 flex justify-between items-center">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className={`flex items-center w-8 h-8 rounded-full overflow-hidden border-2 transition-all ${
                  openDropdown === 'language' ? 'border-primary ring-2 ring-primary/20' : 'border-gray-300'
                }`}
              >
                <img
                  src={language === 'ar' ? '/assets/flags/sd.png' : '/assets/flags/gb.png'}
                  alt={language === 'ar' ? 'العربية' : 'English'}
                  className="w-full h-full object-cover"
                />
              </button>

              {openDropdown === 'language' && (
                <div className="absolute top-full mt-2 w-40 bg-white rounded-lg shadow-xl border py-2 z-50 language-dropdown">
                  <button
                    onClick={() => handleLanguageChange('ar')}
                    className="flex items-center gap-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm"
                  >
                    <img
                      src="/assets/flags/sd.png"
                      alt="العربية"
                      className="w-5 h-5 object-cover"
                    />
                    <span className="text-sm">العربية</span>
                  </button>
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className="flex items-center gap-3 w-full px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm"
                  >
                    <img
                      src="/assets/flags/gb.png"
                      alt="English"
                      className="w-5 h-5 object-cover"
                    />
                    <span className="text-sm">English</span>
                  </button>
                </div>
              )}
            </div>

            {/* Auth Links */}
            <div className="flex items-center gap-8">
              {user ? (
                <>
                  <button
                    onClick={handleDashboardClick}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="hidden md:inline text-sm font-bold">
                      {t('header.dashboard')}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="hidden md:inline text-sm font-bold">
                      {t('header.logout')}
                    </span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition"
                  >
                    <LogIn className="w-5 h-5" />
                    <span className="hidden md:inline text-sm font-bold">
                      {t('header.login')}
                    </span>
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-primary text-sm flex items-center gap-2 font-bold"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span className="hidden md:inline">
                      {t('header.createAccount')}
                    </span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <nav className="py-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="inline-flex items-center">
              <img
                src="/assets/logo.png"
                alt="Logo"
                className="h-16 object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center gap-12">
              {mainNavLinks.map((link) =>
                link.dropdown ? (
                  <div className="relative" key={link.key}>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === link.key ? null : link.key)}
                      className={`nav-link font-bold text-base flex items-center gap-1 ${
                        isActive(link.href) ? 'text-primary' : ''
                      }`}
                    >
                      {t(link.key)}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openDropdown === link.key ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openDropdown === link.key && (
                      <div className="absolute top-full mt-2 w-56 bg-white rounded-lg shadow-xl border py-2 z-50">
                        {link.items.map((item) => (
                          <Link
                            key={item.key}
                            to={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-primary"
                          >
                            <span className="font-medium">{t(item.key)}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.key}
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`nav-link font-bold text-base ${
                      isActive(link.href) ? 'text-primary' : ''
                    }`}
                  >
                    {t(link.key)}
                  </Link>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 bg-white border rounded-lg shadow-xl">
              <ul className="flex flex-col gap-2 p-4">
                {mainNavLinks.map((link) =>
                  link.dropdown ? (
                    <li key={link.key}>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === link.key ? null : link.key)}
                        className="flex justify-between items-center w-full font-bold text-base text-gray-700"
                      >
                        {t(link.key)}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            openDropdown === link.key ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openDropdown === link.key && (
                        <ul className="pl-4 mt-2 border-l border-gray-300">
                          {link.items.map((item) => (
                            <li key={item.key}>
                              <Link
                                to={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block py-2 text-gray-600 hover:text-primary"
                              >
                                {t(item.key)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ) : (
                    <li key={link.key}>
                      <Link
                        to={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block py-2 text-gray-700 font-bold ${
                          isActive(link.href) ? 'text-primary' : ''
                        }`}
                      >
                        {t(link.key)}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
