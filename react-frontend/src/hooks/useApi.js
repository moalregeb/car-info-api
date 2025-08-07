import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL, ERROR_MESSAGES } from '../utils/constants';

/**
 * Hook للتعامل مع API calls
 * @param {string} url - رابط API
 * @param {object} options - خيارات الطلب
 * @returns {object} حالة الطلب والبيانات
 */
export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${API_BASE_URL}${url}`, options);
      setData(response.data);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.response?.data?.message || ERROR_MESSAGES.NETWORK_ERROR);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

/**
 * Hook للتعامل مع POST requests
 * @returns {object} دالة POST وحالة الطلب
 */
export const usePostApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postData = useCallback(async (url, payload, options = {}) => {
    setLoading(true);
    setError(null);
    setData(null);
    
    try {
      const response = await axios.post(`${API_BASE_URL}${url}`, payload, options);
      setData(response.data);
      return response.data;
    } catch (err) {
      console.error('POST API Error:', err);
      const errorMessage = err.response?.data?.message || ERROR_MESSAGES.NETWORK_ERROR;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return { postData, loading, error, data };
};

/**
 * Hook للتعامل مع PUT requests
 * @returns {object} دالة PUT وحالة الطلب
 */
export const usePutApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const putData = useCallback(async (url, payload, options = {}) => {
    setLoading(true);
    setError(null);
    setData(null);
    
    try {
      const response = await axios.put(`${API_BASE_URL}${url}`, payload, options);
      setData(response.data);
      return response.data;
    } catch (err) {
      console.error('PUT API Error:', err);
      const errorMessage = err.response?.data?.message || ERROR_MESSAGES.NETWORK_ERROR;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return { putData, loading, error, data };
};

/**
 * Hook للتعامل مع DELETE requests
 * @returns {object} دالة DELETE وحالة الطلب
 */
export const useDeleteApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const deleteData = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);
    setData(null);
    
    try {
      const response = await axios.delete(`${API_BASE_URL}${url}`, options);
      setData(response.data);
      return response.data;
    } catch (err) {
      console.error('DELETE API Error:', err);
      const errorMessage = err.response?.data?.message || ERROR_MESSAGES.NETWORK_ERROR;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return { deleteData, loading, error, data };
};

/**
 * Hook للتعامل مع API مع cache
 * @param {string} url - رابط API
 * @param {number} cacheTime - وقت التخزين المؤقت بالمللي ثانية
 * @returns {object} حالة الطلب والبيانات
 */
export const useCachedApi = (url, cacheTime = 5 * 60 * 1000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  const fetchData = useCallback(async (force = false) => {
    // التحقق من التخزين المؤقت
    if (!force && data && lastFetch && (Date.now() - lastFetch) < cacheTime) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${API_BASE_URL}${url}`);
      setData(response.data);
      setLastFetch(Date.now());
    } catch (err) {
      console.error('Cached API Error:', err);
      setError(err.response?.data?.message || ERROR_MESSAGES.NETWORK_ERROR);
    } finally {
      setLoading(false);
    }
  }, [url, data, lastFetch, cacheTime]);

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [fetchData]);

  return { data, loading, error, refetch: () => fetchData(true) };
};

/**
 * Hook للتعامل مع API مع retry
 * @param {string} url - رابط API
 * @param {number} maxRetries - الحد الأقصى للمحاولات
 * @param {number} retryDelay - التأخير بين المحاولات
 * @returns {object} حالة الطلب والبيانات
 */
export const useRetryApi = (url, maxRetries = 3, retryDelay = 1000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await axios.get(`${API_BASE_URL}${url}`);
        setData(response.data);
        setRetryCount(0);
        break;
      } catch (err) {
        console.error(`API Error (attempt ${attempt + 1}):`, err);
        
        if (attempt === maxRetries) {
          setError(err.response?.data?.message || ERROR_MESSAGES.NETWORK_ERROR);
          setRetryCount(attempt);
        } else {
          setRetryCount(attempt);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
      }
    }
    
    setLoading(false);
  }, [url, maxRetries, retryDelay]);

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [fetchData]);

  return { data, loading, error, retryCount, refetch: fetchData };
};