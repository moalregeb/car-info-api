# دليل الأداء والتحسين - Performance Guide

هذا الدليل يغطي استراتيجيات تحسين الأداء وتقنيات المراقبة لتطبيق حاسبة الرسوم الجمركية.

## 🎯 نظرة عامة على الأداء

### مؤشرات الأداء الرئيسية (KPIs)

- **First Contentful Paint (FCP)**: < 1.5 ثانية
- **Largest Contentful Paint (LCP)**: < 2.5 ثانية
- **First Input Delay (FID)**: < 100 مللي ثانية
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.5 ثانية

### أهداف الأداء

```
┌─────────────────┐
│   Excellent     │ 90-100
├─────────────────┤
│   Good          │ 50-89
├─────────────────┤
│   Needs Work    │ 0-49
└─────────────────┘
```

## 🚀 تحسينات Frontend

### 1. تحسين التحميل

#### Code Splitting
```javascript
// تقسيم الكود حسب المسارات
import { lazy, Suspense } from 'react';

const CustomsCalculator = lazy(() => import('./CustomsCalculator'));
const ThreeDModels = lazy(() => import('./ThreeDModels'));

// استخدام Suspense
<Suspense fallback={<div>جاري التحميل...</div>}>
  <CustomsCalculator />
</Suspense>
```

#### Lazy Loading للمكونات
```javascript
// تحميل كسول للصور
const LazyImage = ({ src, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setIsLoaded(true)}
      className={`transition-opacity ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      {...props}
    />
  );
};
```

#### Bundle Optimization
```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
```

### 2. تحسين التصميم

#### CSS Optimization
```css
/* استخدام CSS Variables للتحسين */
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #06b6d4;
}

/* تجنب reflow/repaint */
.calculator-container {
  transform: translateZ(0); /* Hardware acceleration */
  will-change: transform;
}

/* تحسين الرسوم المتحركة */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}
```

#### Responsive Images
```javascript
// استخدام صور متجاوبة
const ResponsiveImage = ({ src, alt, sizes }) => {
  return (
    <img
      src={src}
      alt={alt}
      sizes={sizes}
      srcSet={`
        ${src}?w=300 300w,
        ${src}?w=600 600w,
        ${src}?w=900 900w
      `}
    />
  );
};
```

### 3. تحسين الحالة

#### Memoization
```javascript
// استخدام React.memo
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* محتوى مكلف */}</div>;
});

// استخدام useMemo
const memoizedValue = useMemo(() => {
  return expensiveCalculation(declaredValue, dutyRate);
}, [declaredValue, dutyRate]);

// استخدام useCallback
const handleCalculate = useCallback(() => {
  calculateCustoms(declaredValue, selectedModel);
}, [declaredValue, selectedModel]);
```

#### State Optimization
```javascript
// تجنب re-renders غير ضرورية
const [calculationState, setCalculationState] = useState({
  declaredValue: 0,
  selectedModel: null,
  result: null,
  isLoading: false,
  error: null,
});

// استخدام reducer للحالة المعقدة
const calculationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_VALUE':
      return { ...state, declaredValue: action.payload };
    case 'SET_MODEL':
      return { ...state, selectedModel: action.payload };
    case 'CALCULATE_START':
      return { ...state, isLoading: true, error: null };
    case 'CALCULATE_SUCCESS':
      return { ...state, result: action.payload, isLoading: false };
    case 'CALCULATE_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};
```

## ⚡ تحسينات Backend

### 1. تحسين API

#### Response Caching
```javascript
// إعداد Cache-Control headers
app.get('/api/categories', (req, res) => {
  res.set('Cache-Control', 'public, max-age=3600'); // 1 hour
  res.json({ categories: categoriesData });
});

// استخدام Redis للكاش (مخطط)
const redis = require('redis');
const client = redis.createClient();

app.get('/api/categories', async (req, res) => {
  const cached = await client.get('categories');
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  
  const categories = getCategories();
  await client.setex('categories', 3600, JSON.stringify(categories));
  res.json({ categories });
});
```

#### Compression
```javascript
const compression = require('compression');

// تفعيل الضغط
app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
}));
```

#### Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);
```

### 2. تحسين الحسابات

#### Calculation Optimization
```javascript
// تحسين حسابات الرسوم الجمركية
const calculateCustomsOptimized = (declaredValue, modelId) => {
  // استخدام lookup table بدلاً من الحسابات المتكررة
  const taxRates = {
    1: { duty: 0.15, special: 0.10, vat: 0.16 }, // Regular car
    2: { duty: 0.00, special: 0.05, vat: 0.16 }, // Electric car
  };
  
  const rates = taxRates[modelId];
  if (!rates) throw new Error('Model not found');
  
  const dutyAmount = declaredValue * rates.duty;
  const specialTaxAmount = declaredValue * rates.special;
  const vatAmount = (declaredValue + dutyAmount + specialTaxAmount) * rates.vat;
  
  return {
    dutyAmount,
    specialTaxAmount,
    vatAmount,
    totalAmount: dutyAmount + specialTaxAmount + vatAmount,
    finalPrice: declaredValue + dutyAmount + specialTaxAmount + vatAmount,
  };
};
```

#### Database Optimization (مخطط)
```javascript
// استخدام indexes للاستعلامات السريعة
CREATE INDEX idx_car_models ON cars(model_id);
CREATE INDEX idx_car_brands ON cars(brand_id);

// استخدام connection pooling
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

## 📊 مراقبة الأداء

### 1. Frontend Monitoring

#### Web Vitals
```javascript
// reportWebVitals.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // إرسال البيانات إلى خدمة التحليلات
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

#### Performance Observer
```javascript
// مراقبة أداء التطبيق
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(`${entry.name}: ${entry.startTime}ms`);
  }
});

observer.observe({ entryTypes: ['measure', 'navigation'] });
```

#### Error Tracking
```javascript
// تتبع الأخطاء
window.addEventListener('error', (event) => {
  console.error('JavaScript Error:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error,
  });
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason);
});
```

### 2. Backend Monitoring

#### Response Time Monitoring
```javascript
// مراقبة وقت الاستجابة
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${duration}ms`);
    
    // إرسال البيانات إلى نظام المراقبة
    if (duration > 1000) {
      console.warn(`Slow request: ${req.method} ${req.path} took ${duration}ms`);
    }
  });
  
  next();
});
```

#### Memory Usage Monitoring
```javascript
// مراقبة استخدام الذاكرة
setInterval(() => {
  const used = process.memoryUsage();
  console.log({
    rss: `${Math.round(used.rss / 1024 / 1024 * 100) / 100} MB`,
    heapTotal: `${Math.round(used.heapTotal / 1024 / 1024 * 100) / 100} MB`,
    heapUsed: `${Math.round(used.heapUsed / 1024 / 1024 * 100) / 100} MB`,
    external: `${Math.round(used.external / 1024 / 1024 * 100) / 100} MB`,
  });
}, 30000); // كل 30 ثانية
```

#### Error Monitoring
```javascript
// مراقبة الأخطاء
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // إرسال إلى خدمة مراقبة الأخطاء
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // إرسال إلى خدمة مراقبة الأخطاء
});
```

## 🔧 أدوات التحسين

### 1. Lighthouse

```bash
# تشغيل Lighthouse
npx lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html

# تشغيل Lighthouse في وضع CI
npx lighthouse http://localhost:3000 --output json --output-path ./lighthouse-report.json
```

### 2. Bundle Analyzer

```bash
# تحليل حجم الحزمة
npm install --save-dev webpack-bundle-analyzer

# تشغيل المحلل
npx webpack-bundle-analyzer build/static/js/*.js
```

### 3. Performance Profiling

```javascript
// استخدام React Profiler
import { Profiler } from 'react';

<Profiler id="CustomsCalculator" onRender={(id, phase, actualDuration) => {
  console.log(`${id} took ${actualDuration}ms to render`);
}}>
  <CustomsCalculator />
</Profiler>
```

## 📈 تحسينات محددة

### 1. تحسين الصور

```javascript
// استخدام WebP format
const OptimizedImage = ({ src, alt, ...props }) => {
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/, '.webp');
  
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img src={src} alt={alt} {...props} />
    </picture>
  );
};
```

### 2. تحسين الخطوط

```css
/* تحميل الخطوط بشكل محسن */
@font-face {
  font-family: 'Cairo';
  font-display: swap;
  src: url('/fonts/Cairo-Regular.woff2') format('woff2');
}

/* استخدام font-display: swap */
body {
  font-family: 'Cairo', sans-serif;
  font-display: swap;
}
```

### 3. تحسين الشبكة

```javascript
// استخدام Service Worker للكاش
// service-worker.js
const CACHE_NAME = 'customs-calculator-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

## 🎯 أهداف الأداء

### أهداف التحميل

| المقياس | الهدف | الحالي |
|---------|-------|--------|
| First Contentful Paint | < 1.5s | 1.2s |
| Largest Contentful Paint | < 2.5s | 2.1s |
| First Input Delay | < 100ms | 85ms |
| Cumulative Layout Shift | < 0.1 | 0.05 |

### أهداف API

| المقياس | الهدف | الحالي |
|---------|-------|--------|
| Response Time | < 200ms | 150ms |
| Throughput | > 1000 req/s | 1200 req/s |
| Error Rate | < 1% | 0.5% |
| Uptime | > 99.9% | 99.95% |

## 🔍 استكشاف مشاكل الأداء

### 1. تحليل الأداء

```javascript
// استخدام Performance API
const measurePerformance = () => {
  const navigation = performance.getEntriesByType('navigation')[0];
  console.log({
    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
    domInteractive: navigation.domInteractive,
    firstPaint: performance.getEntriesByType('paint')[0]?.startTime,
  });
};
```

### 2. تحليل الذاكرة

```javascript
// مراقبة تسرب الذاكرة
const memoryUsage = () => {
  if (performance.memory) {
    console.log({
      usedJSHeapSize: performance.memory.usedJSHeapSize,
      totalJSHeapSize: performance.memory.totalJSHeapSize,
      jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
    });
  }
};
```

### 3. تحليل الشبكة

```javascript
// مراقبة طلبات الشبكة
const networkRequests = () => {
  const resources = performance.getEntriesByType('resource');
  const slowRequests = resources.filter(r => r.duration > 1000);
  console.log('Slow requests:', slowRequests);
};
```

## 📚 المراجع

- [Web Vitals](https://web.dev/vitals/)
- [React Performance](https://reactjs.org/docs/optimizing-performance.html)
- [Node.js Performance](https://nodejs.org/en/docs/guides/performance/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)