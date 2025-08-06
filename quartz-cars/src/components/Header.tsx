import React, { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiGlobe } from 'react-icons/fi';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const location = useLocation();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  }, []);

  const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);

  const navItems = [
    { path: '/', label: 'الرئيسية', labelEn: 'Home' },
    { path: '/search', label: 'البحث', labelEn: 'Search' },
    { path: '/compare', label: 'مقارنة', labelEn: 'Compare' },
    { path: '/calculator', label: 'الحاسبة', labelEn: 'Calculator' }
  ];

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-r from-quartz-500 to-quartz-600 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white font-bold text-lg">Q</span>
            </motion.div>
            <span className="text-xl font-bold text-gray-900">Quartz</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-quartz-600 border-b-2 border-quartz-500 pb-1'
                    : 'text-gray-700 hover:text-quartz-600'
                }`}
              >
                {language === 'ar' ? item.label : item.labelEn}
              </Link>
            ))}
          </nav>

          {/* Right side - Language toggle & Mobile menu */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 text-sm font-medium text-gray-700 hover:text-quartz-600 transition-colors"
            >
              <FiGlobe className="w-4 h-4" />
              <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-quartz-600 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden border-t border-gray-200 py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'text-quartz-600 bg-quartz-50'
                      : 'text-gray-700 hover:text-quartz-600 hover:bg-gray-50'
                  }`}
                >
                  {language === 'ar' ? item.label : item.labelEn}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;