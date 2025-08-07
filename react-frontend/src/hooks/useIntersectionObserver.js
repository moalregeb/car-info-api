import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Hook للتعامل مع Intersection Observer
 * @param {object} options - خيارات المراقب
 * @returns {array} [ref, isIntersecting]
 */
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState(null);
  const elementRef = useRef(null);

  const callback = useCallback((entries) => {
    const [entry] = entries;
    setIsIntersecting(entry.isIntersecting);
    setEntry(entry);
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
      ...options
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [callback, options]);

  return [elementRef, isIntersecting, entry];
};

/**
 * Hook للتحكم في ظهور العناصر عند التمرير
 * @param {number} threshold - نسبة الظهور المطلوبة
 * @returns {array} [ref, isVisible]
 */
export const useScrollVisibility = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold]);

  return [elementRef, isVisible];
};

/**
 * Hook للتحكم في تحميل الصور عند الظهور
 * @param {string} src - رابط الصورة
 * @param {string} placeholder - رابط الصورة المؤقتة
 * @returns {object} حالة تحميل الصورة
 */
export const useLazyImage = (src, placeholder = '') => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView && src) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      img.src = src;
    }
  }, [isInView, src]);

  return { imgRef, imageSrc, isLoaded, isInView };
};

/**
 * Hook للتحكم في تحميل الفيديو عند الظهور
 * @param {string} src - رابط الفيديو
 * @returns {object} حالة تحميل الفيديو
 */
export const useLazyVideo = (src) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.load();
      setIsLoaded(true);
    }
  }, [isInView]);

  return { videoRef, isLoaded, isInView };
};

/**
 * Hook للتحكم في تحميل المحتوى عند الظهور
 * @param {boolean} enabled - تفعيل التحميل المتأخر
 * @returns {array} [ref, shouldLoad]
 */
export const useLazyLoad = (enabled = true) => {
  const [shouldLoad, setShouldLoad] = useState(!enabled);
  const elementRef = useRef(null);

  useEffect(() => {
    if (!enabled) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [enabled]);

  return [elementRef, shouldLoad];
};

/**
 * Hook للتحكم في تحميل المكونات عند الظهور
 * @param {number} delay - التأخير قبل التحميل
 * @returns {array} [ref, isVisible, hasLoaded]
 */
export const useComponentVisibility = (delay = 0) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (delay > 0) {
            setTimeout(() => setHasLoaded(true), delay);
          } else {
            setHasLoaded(true);
          }
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [delay]);

  return [elementRef, isVisible, hasLoaded];
};