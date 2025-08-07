import { useState, useEffect } from 'react';

/**
 * Hook للتعامل مع Local Storage
 * @param {string} key - مفتاح التخزين
 * @param {any} initialValue - القيمة الافتراضية
 * @returns {array} [value, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // الحصول على القيمة من Local Storage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`خطأ في قراءة ${key} من Local Storage:`, error);
      return initialValue;
    }
  });

  // تحديث Local Storage عند تغيير القيمة
  const setValue = (value) => {
    try {
      // السماح للقيمة أن تكون دالة
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`خطأ في حفظ ${key} في Local Storage:`, error);
    }
  };

  return [storedValue, setValue];
};

/**
 * Hook للتعامل مع Session Storage
 * @param {string} key - مفتاح التخزين
 * @param {any} initialValue - القيمة الافتراضية
 * @returns {array} [value, setValue]
 */
export const useSessionStorage = (key, initialValue) => {
  // الحصول على القيمة من Session Storage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`خطأ في قراءة ${key} من Session Storage:`, error);
      return initialValue;
    }
  });

  // تحديث Session Storage عند تغيير القيمة
  const setValue = (value) => {
    try {
      // السماح للقيمة أن تكون دالة
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`خطأ في حفظ ${key} في Session Storage:`, error);
    }
  };

  return [storedValue, setValue];
};

/**
 * Hook للتعامل مع Cookies
 * @param {string} key - مفتاح الكوكي
 * @param {any} initialValue - القيمة الافتراضية
 * @param {number} days - عدد أيام انتهاء الصلاحية
 * @returns {array} [value, setValue]
 */
export const useCookie = (key, initialValue, days = 7) => {
  // الحصول على القيمة من Cookies
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const cookies = document.cookie.split(';');
      const cookie = cookies.find(c => c.trim().startsWith(`${key}=`));
      return cookie ? JSON.parse(decodeURIComponent(cookie.split('=')[1])) : initialValue;
    } catch (error) {
      console.error(`خطأ في قراءة ${key} من Cookies:`, error);
      return initialValue;
    }
  });

  // تحديث Cookies عند تغيير القيمة
  const setValue = (value) => {
    try {
      // السماح للقيمة أن تكون دالة
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      const expires = new Date();
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
      
      document.cookie = `${key}=${encodeURIComponent(JSON.stringify(valueToStore))};expires=${expires.toUTCString()};path=/`;
    } catch (error) {
      console.error(`خطأ في حفظ ${key} في Cookies:`, error);
    }
  };

  return [storedValue, setValue];
};

/**
 * Hook للتعامل مع تفضيلات المستخدم
 * @returns {object} تفضيلات المستخدم
 */
export const useUserPreferences = () => {
  const [preferences, setPreferences] = useLocalStorage('user_preferences', {
    theme: 'dark',
    language: 'ar',
    currency: 'JOD',
    notifications: true,
    autoSave: true
  });

  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return {
    preferences,
    updatePreference,
    setPreferences
  };
};

/**
 * Hook للتعامل مع الحسابات الأخيرة
 * @returns {object} الحسابات الأخيرة
 */
export const useRecentCalculations = () => {
  const [recentCalculations, setRecentCalculations] = useLocalStorage('recent_calculations', []);

  const addCalculation = (calculation) => {
    setRecentCalculations(prev => {
      const newCalculations = [calculation, ...prev.filter(c => c.id !== calculation.id)];
      return newCalculations.slice(0, 10); // الاحتفاظ بـ 10 حسابات فقط
    });
  };

  const removeCalculation = (id) => {
    setRecentCalculations(prev => prev.filter(c => c.id !== id));
  };

  const clearCalculations = () => {
    setRecentCalculations([]);
  };

  return {
    recentCalculations,
    addCalculation,
    removeCalculation,
    clearCalculations
  };
};