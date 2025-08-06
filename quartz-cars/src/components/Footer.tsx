import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiLinkedin,
  FiCar,
  FiHeart
} from 'react-icons/fi';

const Footer: React.FC = () => {
  const quickLinks = [
    { path: '/', label: 'الرئيسية' },
    { path: '/search', label: 'البحث عن سيارة' },
    { path: '/compare', label: 'مقارنة السيارات' },
    { path: '/calculator', label: 'حاسبة التكاليف' },
  ];

  const carBrands = [
    'تويوتا', 'هوندا', 'نيسان', 'هيونداي', 'كيا', 'فورد', 'بي إم دبليو', 'مرسيدس'
  ];

  const services = [
    'تقييم السيارات المستعملة',
    'استشارات الشراء',
    'حاسبة رسوم الجمرك',
    'دليل الوكلاء المعتمدين',
    'نصائح الصيانة',
    'تمويل السيارات'
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-quartz-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-br from-quartz-500 to-quartz-600 rounded-lg flex items-center justify-center shadow-lg">
                <FiCar className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gradient bg-gradient-to-r from-quartz-400 to-quartz-300 bg-clip-text text-transparent">
                  Quartz
                </span>
                <span className="text-xs text-gray-400 -mt-1">للسيارات</span>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              منصتك الموثوقة لبيع وشراء السيارات في الأردن. نقدم أفضل الأسعار والخدمات 
              مع معلومات شاملة ودقيقة عن جميع أنواع السيارات.
            </p>

            <div className="space-y-2">
              <div className="flex items-center space-x-3 rtl:space-x-reverse text-sm text-gray-300">
                <FiMapPin className="w-4 h-4 text-quartz-400" />
                <span>عمان، الأردن</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse text-sm text-gray-300">
                <FiPhone className="w-4 h-4 text-quartz-400" />
                <span>+962-6-5000000</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse text-sm text-gray-300">
                <FiMail className="w-4 h-4 text-quartz-400" />
                <span>info@quartz.jo</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-quartz-300">روابط سريعة</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-quartz-300 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Car Brands */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-quartz-300">العلامات التجارية</h3>
            <div className="grid grid-cols-2 gap-2">
              {carBrands.map((brand) => (
                <Link
                  key={brand}
                  to={`/search?brand=${encodeURIComponent(brand)}`}
                  className="text-gray-300 hover:text-quartz-300 transition-colors duration-200 text-sm"
                >
                  {brand}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-quartz-300">خدماتنا</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-300 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Social Media & Bottom Section */}
        <motion.div 
          className="border-t border-gray-700 mt-12 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Media */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <span className="text-gray-300 text-sm">تابعنا على:</span>
              <div className="flex space-x-3 rtl:space-x-reverse">
                {[
                  { Icon: FiFacebook, href: '#', color: 'hover:text-blue-400' },
                  { Icon: FiTwitter, href: '#', color: 'hover:text-sky-400' },
                  { Icon: FiInstagram, href: '#', color: 'hover:text-pink-400' },
                  { Icon: FiLinkedin, href: '#', color: 'hover:text-blue-600' },
                ].map(({ Icon, href, color }, index) => (
                  <motion.a
                    key={index}
                    href={href}
                    className={`text-gray-400 ${color} transition-colors duration-200`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-400 text-sm">
              <span>© 2025 Quartz Cars. جميع الحقوق محفوظة</span>
              <span>•</span>
              <span className="flex items-center space-x-1 rtl:space-x-reverse">
                <span>صنع بـ</span>
                <FiHeart className="w-4 h-4 text-red-400" />
                <span>في الأردن</span>
              </span>
            </div>
          </div>

          {/* Additional Links */}
          <div className="flex flex-wrap justify-center md:justify-start space-x-6 rtl:space-x-reverse mt-4 text-xs text-gray-400">
            <Link to="/privacy" className="hover:text-quartz-300 transition-colors">
              سياسة الخصوصية
            </Link>
            <Link to="/terms" className="hover:text-quartz-300 transition-colors">
              شروط الاستخدام
            </Link>
            <Link to="/contact" className="hover:text-quartz-300 transition-colors">
              اتصل بنا
            </Link>
            <Link to="/about" className="hover:text-quartz-300 transition-colors">
              من نحن
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;