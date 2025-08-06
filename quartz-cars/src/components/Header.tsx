import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiSearch, 
  FiMenu, 
  FiX, 
  FiHome, 
  FiCar, 
  FiBarChart3, 
  FiCalculator,
  FiGlobe
} from 'react-icons/fi';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'الرئيسية', labelEn: 'Home', icon: FiHome },
    { path: '/search', label: 'البحث', labelEn: 'Search', icon: FiSearch },
    { path: '/compare', label: 'مقارنة', labelEn: 'Compare', icon: FiBarChart3 },
    { path: '/calculator', label: 'الحاسبة', labelEn: 'Calculator', icon: FiCalculator },
  ];

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  return (
    <motion.header 
      className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-quartz-200"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-br from-quartz-500 to-quartz-600 rounded-lg flex items-center justify-center shadow-lg">
                <FiCar className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gradient bg-gradient-to-r from-quartz-600 to-quartz-500 bg-clip-text text-transparent">
                  Quartz
                </span>
                <span className="text-xs text-gray-500 -mt-1">
                  {language === 'ar' ? 'للسيارات' : 'Cars'}
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'text-quartz-600 bg-quartz-50'
                      : 'text-gray-700 hover:text-quartz-600 hover:bg-quartz-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">
                    {language === 'ar' ? item.label : item.labelEn}
                  </span>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-quartz-500 rounded-full"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 rtl:space-x-reverse px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiGlobe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {language === 'ar' ? 'EN' : 'ع'}
              </span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <FiX className="w-5 h-5" />
              ) : (
                <FiMenu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-4 space-y-2 border-t border-gray-200">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'text-quartz-600 bg-quartz-50'
                      : 'text-gray-700 hover:text-quartz-600 hover:bg-quartz-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">
                    {language === 'ar' ? item.label : item.labelEn}
                  </span>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;