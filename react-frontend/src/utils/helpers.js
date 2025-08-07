import { CUSTOMS_RATES } from './constants';

/**
 * تنسيق الأرقام بالفواصل العربية
 * @param {number} num - الرقم المراد تنسيقه
 * @returns {string} الرقم المنسق
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined) return '0';
  return new Intl.NumberFormat('ar-JO').format(num);
};

/**
 * تنسيق العملة الأردنية
 * @param {number} amount - المبلغ
 * @returns {string} المبلغ المنسق
 */
export const formatCurrency = (amount) => {
  return `${formatNumber(amount)} د.أ`;
};

/**
 * حساب الرسوم الجمركية
 * @param {number} declaredValue - القيمة المعلنة
 * @param {string} carType - نوع السيارة (regular/electric)
 * @returns {object} تفاصيل الحساب
 */
export const calculateCustoms = (declaredValue, carType = 'regular') => {
  const rates = carType === 'electric' ? CUSTOMS_RATES.ELECTRIC_CARS : CUSTOMS_RATES.REGULAR_CARS;
  
  const dutyAmount = (declaredValue * rates.DUTY) / 100;
  const specialTaxAmount = (declaredValue * rates.SPECIAL_TAX) / 100;
  const vatAmount = ((declaredValue + dutyAmount + specialTaxAmount) * rates.VAT) / 100;
  const totalAmount = dutyAmount + specialTaxAmount + vatAmount;
  const finalPrice = declaredValue + totalAmount;

  return {
    declaredValue,
    dutyAmount,
    specialTaxAmount,
    vatAmount,
    totalAmount,
    finalPrice,
    rates
  };
};

/**
 * التحقق من صحة البريد الإلكتروني
 * @param {string} email - البريد الإلكتروني
 * @returns {boolean} صحة البريد الإلكتروني
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * التحقق من صحة رقم الهاتف الأردني
 * @param {string} phone - رقم الهاتف
 * @returns {boolean} صحة رقم الهاتف
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^(\+962|0)?[79]\d{8}$/;
  return phoneRegex.test(phone);
};

/**
 * تحويل النص إلى عنوان URL صالح
 * @param {string} text - النص المراد تحويله
 * @returns {string} النص المحول
 */
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

/**
 * تقصير النص مع إضافة علامة الحذف
 * @param {string} text - النص المراد تقصيره
 * @param {number} maxLength - الحد الأقصى للطول
 * @returns {string} النص المختصر
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * تحويل التاريخ إلى تنسيق عربي
 * @param {Date} date - التاريخ
 * @returns {string} التاريخ المنسق
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('ar-JO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

/**
 * الحصول على الوقت المنقضي
 * @param {Date} date - التاريخ
 * @returns {string} الوقت المنقضي
 */
export const getTimeAgo = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'الآن';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} دقيقة`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ساعة`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} يوم`;
  
  return formatDate(date);
};

/**
 * تحويل حجم الملف إلى تنسيق مقروء
 * @param {number} bytes - حجم الملف بالبايت
 * @returns {string} الحجم المنسق
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * إنشاء معرف فريد
 * @returns {string} المعرف الفريد
 */
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * تأخير زمني
 * @param {number} ms - الوقت بالميلي ثانية
 * @returns {Promise} وعد بالتأخير
 */
export const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * التحقق من أن العنصر في نطاق الشاشة
 * @param {HTMLElement} element - العنصر
 * @returns {boolean} هل العنصر في النطاق
 */
export const isInViewport = (element) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * نسخ النص إلى الحافظة
 * @param {string} text - النص المراد نسخه
 * @returns {Promise<boolean>} نجاح العملية
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('فشل في نسخ النص:', err);
    return false;
  }
};

/**
 * تحميل ملف
 * @param {string} url - رابط الملف
 * @param {string} filename - اسم الملف
 */
export const downloadFile = (url, filename) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * تحويل درجة الحرارة
 * @param {number} celsius - درجة الحرارة بالسيليزيوس
 * @returns {number} درجة الحرارة بالفهرنهايت
 */
export const celsiusToFahrenheit = (celsius) => {
  return (celsius * 9/5) + 32;
};

/**
 * تحويل درجة الحرارة
 * @param {number} fahrenheit - درجة الحرارة بالفهرنهايت
 * @returns {number} درجة الحرارة بالسيليزيوس
 */
export const fahrenheitToCelsius = (fahrenheit) => {
  return (fahrenheit - 32) * 5/9;
};