# البنية المعمارية - Architecture Guide

هذا الدليل يوضح البنية المعمارية الشاملة لتطبيق حاسبة الرسوم الجمركية.

## 🏗️ نظرة عامة على البنية

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Infrastructure │
│   (React)       │◄──►│   (Node.js)     │◄──►│   (Docker/Nginx) │
│   Port: 3000    │    │   Port: 3001    │    │   Port: 80/443   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 هيكل المشروع المفصل

```
customs-calculator/
├── 📄 server.js                    # خادم Express الرئيسي
├── 📄 package.json                 # تبعيات المشروع الرئيسي
├── 📄 docker-compose.yml           # إعدادات Docker
├── 📄 Dockerfile                   # صورة Docker
├── 📄 nginx.conf                   # إعدادات Nginx
├── 📄 .env.example                 # مثال متغيرات البيئة
├── 📄 .gitignore                   # ملفات Git المستثناة
├── 📄 README.md                    # الوثائق الرئيسية
├── 📄 LICENSE                      # رخصة MIT
├── 📄 CHANGELOG.md                 # سجل التغييرات
├── 📄 CONTRIBUTING.md              # دليل المساهمة
├── 📄 SECURITY.md                  # سياسة الأمان
├── 📄 CODE_OF_CONDUCT.md          # قواعد السلوك
├── 📁 docs/                        # الوثائق
│   ├── 📄 README.md               # دليل الوثائق
│   ├── 📄 API.md                  # وثائق API
│   ├── 📄 DEPLOYMENT.md           # دليل النشر
│   ├── 📄 DEVELOPMENT.md          # دليل التطوير
│   ├── 📄 TROUBLESHOOTING.md      # حل المشاكل
│   ├── 📄 ARCHITECTURE.md         # هذا الملف
│   └── 📄 CHANGELOG.md            # سجل التغييرات
├── 📁 scripts/                     # سكريبتات النشر
│   ├── 📄 deploy.sh               # سكريبت النشر
│   ├── 📄 backup.sh               # سكريبت النسخ الاحتياطي
│   ├── 📄 monitor.sh              # سكريبت المراقبة
│   └── 📄 install.sh              # سكريبت التثبيت
└── 📁 react-frontend/              # تطبيق React
    ├── 📄 package.json            # تبعيات React
    ├── 📄 .env                    # متغيرات بيئة React
    ├── 📄 .env.production         # متغيرات الإنتاج
    ├── 📄 tailwind.config.js      # إعدادات Tailwind
    ├── 📄 postcss.config.js       # إعدادات PostCSS
    ├── 📄 jsconfig.json           # إعدادات JavaScript
    ├── 📁 public/                 # الملفات الثابتة
    │   ├── 📄 index.html          # HTML الرئيسي
    │   ├── 📄 manifest.json       # PWA Manifest
    │   ├── 📄 robots.txt          # SEO
    │   ├── 📄 sitemap.xml         # SEO
    │   ├── 📄 favicon.ico         # أيقونة الموقع
    │   ├── 📄 logo192.png         # أيقونة PWA
    │   └── 📄 logo512.png         # أيقونة PWA
    └── 📁 src/                    # الكود المصدري
        ├── 📄 index.js            # نقطة الدخول
        ├── 📄 App.js              # المكون الرئيسي
        ├── 📄 App.css             # أنماط التطبيق
        ├── 📄 App.test.js         # اختبارات التطبيق
        ├── 📄 setupTests.js       # إعداد الاختبارات
        ├── 📄 reportWebVitals.js  # قياس الأداء
        ├── 📄 logo.svg            # شعار التطبيق
        ├── 📄 index.css           # الأنماط العامة
        ├── 📁 components/         # مكونات React
        │   ├── 📄 index.js        # تصدير المكونات
        │   ├── 📄 Header.jsx      # Header عائم
        │   ├── 📄 Home.jsx        # الصفحة الرئيسية
        │   ├── 📄 CustomsCalculator.jsx # حاسبة الرسوم
        │   ├── 📄 ThreeDModels.jsx # نماذج 3D
        │   └── 📄 Footer.jsx      # Footer
        ├── 📁 hooks/              # خطافات مخصصة
        │   ├── 📄 index.js        # تصدير الخطافات
        │   ├── 📄 useLocalStorage.js # خطاف التخزين
        │   ├── 📄 useApi.js       # خطاف API
        │   └── 📄 useIntersectionObserver.js # خطاف المراقبة
        └── 📁 utils/              # دوال مساعدة
            ├── 📄 index.js        # تصدير الدوال
            ├── 📄 constants.js    # الثوابت
            └── 📄 helpers.js      # الدوال المساعدة
```

## 🔄 تدفق البيانات

### 1. تدفق الطلب من المستخدم

```
المستخدم → React Component → Axios → Express Server → Response
```

### 2. تدفق حساب الرسوم الجمركية

```
1. اختيار فئة السيارة
   ↓
2. اختيار العلامة التجارية
   ↓
3. اختيار الموديل
   ↓
4. إدخال القيمة المعلنة
   ↓
5. إرسال طلب POST إلى /api/calculate-customs
   ↓
6. حساب الرسوم في الخادم
   ↓
7. إرجاع النتائج
   ↓
8. عرض النتائج في الواجهة
```

## 🏛️ طبقات التطبيق

### 1. طبقة العرض (Presentation Layer)

**التكنولوجيا:** React 18, Framer Motion, CSS3

**المسؤوليات:**
- عرض واجهة المستخدم
- إدارة حالة المكونات
- معالجة التفاعلات
- الرسوم المتحركة والانتقالات

**المكونات الرئيسية:**
```javascript
// Header.jsx - Header عائم وزجاجي
const Header = () => {
  // إدارة حالة التمرير
  // تأثيرات زجاجية
  // قائمة التنقل
};

// CustomsCalculator.jsx - الحاسبة الرئيسية
const CustomsCalculator = () => {
  // إدارة النماذج
  // طلبات API
  // عرض النتائج
};
```

### 2. طبقة المنطق التجاري (Business Logic Layer)

**التكنولوجيا:** Express.js, JavaScript

**المسؤوليات:**
- معالجة طلبات API
- حسابات الرسوم الجمركية
- التحقق من صحة البيانات
- إدارة الأخطاء

**النقاط النهائية الرئيسية:**
```javascript
// GET /api/categories - فئات السيارات
app.get('/api/categories', (req, res) => {
  // إرجاع قائمة الفئات
});

// POST /api/calculate-customs - حساب الرسوم
app.post('/api/calculate-customs', (req, res) => {
  // حساب الرسوم الجمركية
  // حساب الضريبة الخاصة
  // حساب ضريبة القيمة المضافة
  // إرجاع النتائج
});
```

### 3. طبقة البيانات (Data Layer)

**التكنولوجيا:** JavaScript Objects (حالياً), Database (مخطط)

**المسؤوليات:**
- تخزين بيانات السيارات
- إدارة الكاش
- استعلام البيانات

**هيكل البيانات:**
```javascript
const carDetails = {
  1: {
    market_value: 17000,
    customs: {
      duty_rate: 15,
      special_tax: 10,
      vat_rate: 16,
      total_tax_rate: 41
    }
  }
};
```

## 🔧 المكونات التقنية

### Frontend Architecture

#### 1. إدارة الحالة (State Management)
```javascript
// استخدام React Hooks
const [selectedCategory, setSelectedCategory] = useState(null);
const [selectedBrand, setSelectedBrand] = useState(null);
const [selectedModel, setSelectedModel] = useState(null);
const [declaredValue, setDeclaredValue] = useState(0);
const [calculationResult, setCalculationResult] = useState(null);
```

#### 2. إدارة الطلبات (API Management)
```javascript
// استخدام Axios مع خطاف مخصص
const useApi = () => {
  const get = async (url) => {
    // طلبات GET
  };
  
  const post = async (url, data) => {
    // طلبات POST
  };
};
```

#### 3. الرسوم المتحركة (Animations)
```javascript
// استخدام Framer Motion
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* محتوى المكون */}
</motion.div>
```

### Backend Architecture

#### 1. إدارة الطلبات (Request Handling)
```javascript
// Middleware للتحقق من CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com'],
  credentials: true
}));

// Middleware لتحليل JSON
app.use(express.json());
```

#### 2. إدارة الأخطاء (Error Handling)
```javascript
// معالج الأخطاء العام
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'خطأ في الخادم' });
});
```

#### 3. التحقق من صحة البيانات (Validation)
```javascript
// التحقق من المدخلات
const validateCalculationInput = (req, res, next) => {
  const { model_id, declared_value } = req.body;
  
  if (!model_id || !declared_value) {
    return res.status(400).json({ error: 'بيانات مطلوبة' });
  }
  
  if (declared_value <= 0) {
    return res.status(400).json({ error: 'قيمة غير صحيحة' });
  }
  
  next();
};
```

## 🐳 بنية Docker

### 1. Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
      - "3001:3001"
    environment:
      - NODE_ENV=production
    volumes:
      - ./logs:/app/logs
    restart: unless-stopped
```

### 2. Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000 3001
CMD ["npm", "run", "dev"]
```

## 🔒 بنية الأمان

### 1. حماية CORS
```javascript
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};
```

### 2. التحقق من المدخلات
```javascript
const sanitizeInput = (input) => {
  return input.replace(/[<>]/g, '');
};

const validateNumber = (value) => {
  return typeof value === 'number' && value > 0;
};
```

### 3. Rate Limiting (مخطط)
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 100 // حد أقصى 100 طلب لكل IP
});
```

## 📊 بنية الأداء

### 1. تحسين Frontend
```javascript
// Code Splitting
const CustomsCalculator = lazy(() => import('./CustomsCalculator'));

// Memoization
const memoizedCalculation = useMemo(() => {
  return expensiveCalculation(value);
}, [value]);
```

### 2. تحسين Backend
```javascript
// Caching
const cache = new Map();

app.get('/api/categories', (req, res) => {
  if (cache.has('categories')) {
    return res.json(cache.get('categories'));
  }
  
  const categories = getCategories();
  cache.set('categories', categories);
  res.json(categories);
});
```

### 3. تحسين الشبكة
```nginx
# Nginx Configuration
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

## 🔄 بنية النشر

### 1. بيئة التطوير
```bash
# تشغيل محلي
npm run dev

# تشغيل Docker
docker-compose up -d
```

### 2. بيئة الإنتاج
```bash
# بناء التطبيق
npm run build

# تشغيل مع PM2
pm2 start ecosystem.config.js

# تشغيل Docker
docker-compose -f docker-compose.prod.yml up -d
```

## 📈 بنية المراقبة

### 1. مراقبة الأداء
```javascript
// قياس وقت الاستجابة
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${duration}ms`);
  });
  next();
});
```

### 2. مراقبة الأخطاء
```javascript
// تسجيل الأخطاء
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});
```

## 🔮 التطوير المستقبلي

### 1. قاعدة البيانات
- **PostgreSQL** لتخزين بيانات السيارات
- **Redis** للتخزين المؤقت
- **MongoDB** للبيانات غير المنظمة

### 2. المصادقة والتفويض
- **JWT** للمصادقة
- **OAuth2** للدخول الاجتماعي
- **Role-based Access Control**

### 3. التحليلات
- **Google Analytics** لتتبع المستخدمين
- **Sentry** لتتبع الأخطاء
- **Custom Analytics** للتحليلات المخصصة

### 4. التوسع
- **Load Balancer** لتوزيع الحمل
- **CDN** للملفات الثابتة
- **Microservices** لفصل الخدمات

## 📚 المراجع

- [React Architecture Patterns](https://reactjs.org/docs/thinking-in-react.html)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practices-performance.html)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [Node.js Performance](https://nodejs.org/en/docs/guides/performance/)