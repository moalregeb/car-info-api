import React from 'react';
import { motion } from 'framer-motion';
import { 
  Car, 
  Calculator, 
  Info, 
  Mail, 
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'الحاسبة', href: '#calculator' },
    { name: 'النماذج', href: '#models' },
    { name: 'المعلومات', href: '#info' },
  ];

  const services = [
    { name: 'حساب الرسوم الجمركية', href: '#calculator' },
    { name: 'نماذج ثلاثية الأبعاد', href: '#models' },
    { name: 'أسعار السوق', href: '#prices' },
    { name: 'دليل الاستخدام', href: '#guide' },
  ];

  const contactInfo = [
    { icon: Phone, text: '+962 6 123 4567' },
    { icon: Mail, text: 'info@customs-calculator.jo' },
    { icon: MapPin, text: 'عمان، الأردن' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
  ];

  return (
    <footer className="bg-surface mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-color to-secondary-color rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">حاسبة الجمرك</h3>
                <p className="text-sm text-text-secondary">الأردن</p>
              </div>
            </div>
            <p className="text-text-secondary mb-4">
              حاسبة الرسوم الجمركية الرسمية للسيارات في الأردن. احسب الرسوم بدقة وسهولة.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-surface-light rounded-lg flex items-center justify-center hover:bg-primary-color hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-text-secondary hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-bold mb-4">الخدمات</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-text-secondary hover:text-white transition-colors duration-200"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-bold mb-4">معلومات التواصل</h4>
            <ul className="space-y-3">
              {contactInfo.map((contact, index) => (
                <li key={index} className="flex items-center gap-3">
                  <contact.icon className="w-5 h-5 text-primary-color" />
                  <span className="text-text-secondary">{contact.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-text-secondary text-sm">
            © {currentYear} حاسبة الجمرك. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-text-secondary hover:text-white text-sm transition-colors">
              سياسة الخصوصية
            </a>
            <a href="#" className="text-text-secondary hover:text-white text-sm transition-colors">
              شروط الاستخدام
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;