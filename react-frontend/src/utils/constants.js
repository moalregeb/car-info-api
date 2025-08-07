// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// App Configuration
export const APP_NAME = process.env.REACT_APP_NAME || 'حاسبة الرسوم الجمركية';
export const APP_VERSION = process.env.REACT_APP_VERSION || '1.0.0';
export const APP_ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT || 'development';

// Customs Rates (Updated 2024)
export const CUSTOMS_RATES = {
  REGULAR_CARS: {
    DUTY: 15, // Reduced from 25%
    SPECIAL_TAX: 10, // Reduced from 15%
    VAT: 16,
    TOTAL: 41 // 15 + 10 + 16
  },
  ELECTRIC_CARS: {
    DUTY: 0, // Exempt
    SPECIAL_TAX: 5, // Reduced rate
    VAT: 16,
    TOTAL: 21 // 0 + 5 + 16
  }
};

// Car Categories
export const CAR_CATEGORIES = [
  { id: 1, name: 'سيدان', icon: 'sedan' },
  { id: 2, name: 'SUV', icon: 'suv' },
  { id: 3, name: 'هاتشباك', icon: 'hatchback' },
  { id: 4, name: 'فان', icon: 'van' },
  { id: 5, name: 'شاحنة صغيرة', icon: 'truck' }
];

// Popular Brands
export const POPULAR_BRANDS = [
  'Toyota',
  'BYD',
  'Honda',
  'Nissan',
  'Hyundai',
  'Kia',
  'Mazda',
  'Mitsubishi'
];

// Contact Information
export const CONTACT_INFO = {
  PHONE: '+962 6 123 4567',
  EMAIL: 'info@customs-calculator.jo',
  ADDRESS: 'عمان، الأردن',
  WEBSITE: 'https://customs-calculator.jo'
};

// Social Media Links
export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/customs-calculator',
  TWITTER: 'https://twitter.com/customs-calculator',
  INSTAGRAM: 'https://instagram.com/customs-calculator',
  LINKEDIN: 'https://linkedin.com/company/customs-calculator'
};

// Animation Durations
export const ANIMATION_DURATIONS = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.6,
  VERY_SLOW: 1.0
};

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1200
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'خطأ في الاتصال بالخادم',
  VALIDATION_ERROR: 'يرجى التحقق من البيانات المدخلة',
  NOT_FOUND: 'المعلومات المطلوبة غير متوفرة',
  SERVER_ERROR: 'خطأ في الخادم، يرجى المحاولة لاحقاً'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  CALCULATION_COMPLETE: 'تم حساب الرسوم بنجاح',
  DATA_LOADED: 'تم تحميل البيانات بنجاح',
  FORM_SUBMITTED: 'تم إرسال البيانات بنجاح'
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'customs_calculator_preferences',
  RECENT_CALCULATIONS: 'customs_calculator_recent',
  THEME: 'customs_calculator_theme'
};

// Theme Colors
export const THEME_COLORS = {
  PRIMARY: '#6366f1',
  PRIMARY_DARK: '#4f46e5',
  SECONDARY: '#f59e0b',
  ACCENT: '#10b981',
  BACKGROUND: '#0f172a',
  SURFACE: '#1e293b',
  SURFACE_LIGHT: '#334155',
  TEXT_PRIMARY: '#f8fafc',
  TEXT_SECONDARY: '#cbd5e1',
  TEXT_MUTED: '#64748b',
  BORDER: '#334155'
};