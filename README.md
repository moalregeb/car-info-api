# حاسبة الرسوم الجمركية - Customs Calculator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-red.svg)](https://expressjs.com/)

تطبيق ويب حديث لحساب الرسوم الجمركية والضرائب على السيارات في الأردن. يوفر واجهة مستخدم عصرية مع حسابات دقيقة بناءً على أحدث التشريعات الجمركية.

## ✨ المميزات

- 🚗 **حسابات دقيقة**: حسابات مبنية على أحدث التشريعات الجمركية الأردنية
- 🎨 **تصميم عصري**: واجهة مستخدم زجاجية عصرية مع تأثيرات بصرية متقدمة
- 📱 **متجاوب بالكامل**: يعمل على جميع الأجهزة والشاشات
- ⚡ **أداء عالي**: تحميل سريع وتجربة مستخدم سلسة
- 🔒 **آمن**: حماية متقدمة ضد الهجمات الإلكترونية
- 📊 **نماذج 3D**: عرض تفاعلي للسيارات (قيد التطوير)
- 🌐 **PWA**: تطبيق ويب تقدمي يمكن تثبيته على الأجهزة

## 🚀 البدء السريع

### المتطلبات

- Node.js 16 أو أحدث
- npm أو yarn
- Git

### التثبيت

1. **استنساخ المستودع:**
```bash
git clone https://github.com/your-username/customs-calculator.git
cd customs-calculator
```

2. **تثبيت التبعيات:**
```bash
npm install
cd react-frontend && npm install && cd ..
```

3. **تشغيل التطبيق:**
```bash
npm run dev
```

4. **فتح التطبيق:**
- الواجهة الأمامية: http://localhost:3001
- API الخلفية: http://localhost:3001

## 🏗️ البنية التقنية

### الواجهة الأمامية (Frontend)
- **React 18**: مكتبة واجهة المستخدم
- **Framer Motion**: الرسوم المتحركة والانتقالات
- **Lucide React**: الأيقونات العصرية
- **Axios**: طلبات HTTP
- **CSS3**: التصميم والأنماط

### الخلفية (Backend)
- **Node.js**: بيئة التشغيل
- **Express.js**: إطار عمل الخادم
- **CORS**: إدارة الطلبات عبر النطاقات
- **RESTful API**: واجهة برمجة التطبيقات

### الأدوات والخدمات
- **Docker**: حاويات التطبيق
- **Nginx**: خادم الويب العكسي
- **PM2**: إدارة العمليات
- **Git**: إدارة الإصدارات

## 📁 هيكل المشروع

```
customs-calculator/
├── server.js                 # خادم الخلفية
├── package.json              # تبعيات المشروع الرئيسي
├── react-frontend/           # تطبيق React
│   ├── public/              # الملفات الثابتة
│   ├── src/                 # الكود المصدري
│   │   ├── components/      # مكونات React
│   │   ├── hooks/          # خطافات مخصصة
│   │   ├── utils/          # دوال مساعدة
│   │   └── App.js          # المكون الرئيسي
│   └── package.json         # تبعيات الواجهة الأمامية
├── docs/                    # الوثائق
├── scripts/                 # سكريبتات النشر
└── docker-compose.yml       # إعدادات Docker
```

## 🎯 الاستخدام

### حساب الرسوم الجمركية

1. **اختر فئة السيارة** (سيارة عادية، كهربائية، تجارية)
2. **اختر الماركة** (تويوتا، هوندا، إلخ)
3. **اختر الموديل** (كورولا، سيفيك، إلخ)
4. **أدخل القيمة المعلنة** للسيارة
5. **اضغط "احسب"** للحصول على النتائج

### النتائج المعروضة

- **رسوم الجمرك**: نسبة من القيمة المعلنة
- **الضريبة الخاصة**: ضريبة إضافية على السيارات
- **ضريبة القيمة المضافة**: 16% من القيمة الإجمالية
- **المجموع الكلي**: إجمالي الرسوم والضرائب
- **السعر النهائي**: القيمة المعلنة + الرسوم والضرائب

## 📊 معدلات الرسوم الجمركية

### السيارات العادية
- **رسوم الجمرك**: 15% (تم تخفيضها من 25%)
- **الضريبة الخاصة**: 10% (تم تخفيضها من 15%)
- **ضريبة القيمة المضافة**: 16%

### السيارات الكهربائية
- **رسوم الجمرك**: 0% (معفاة)
- **الضريبة الخاصة**: 5% (تخفيض خاص)
- **ضريبة القيمة المضافة**: 16%

## 🛠️ التطوير

### تشغيل بيئة التطوير

```bash
# تشغيل الخادم والعميل معاً
npm run dev

# تشغيل الخادم فقط
npm run server

# تشغيل العميل فقط
npm run client
```

### بناء التطبيق

```bash
# بناء التطبيق للإنتاج
npm run build

# تشغيل التطبيق المبنى
npm start
```

### الاختبار

```bash
# تشغيل الاختبارات
npm test

# تشغيل الاختبارات مع التغطية
npm run test:coverage
```

## 🐳 النشر باستخدام Docker

### تشغيل باستخدام Docker Compose

```bash
# بناء وتشغيل الحاويات
docker-compose up -d

# عرض سجلات الحاويات
docker-compose logs -f

# إيقاف الحاويات
docker-compose down
```

### بناء صورة Docker يدوياً

```bash
# بناء الصورة
docker build -t customs-calculator .

# تشغيل الحاوية
docker run -p 3000:3000 -p 3001:3001 customs-calculator
```

## 📚 الوثائق

- [دليل API](docs/API.md) - وثائق واجهة برمجة التطبيقات
- [دليل النشر](docs/DEPLOYMENT.md) - إرشادات النشر
- [دليل التطوير](docs/DEVELOPMENT.md) - معايير التطوير
- [دليل حل المشاكل](docs/TROUBLESHOOTING.md) - حل المشاكل الشائعة

## 🤝 المساهمة

نرحب بمساهماتكم! يرجى قراءة [دليل المساهمة](CONTRIBUTING.md) قبل البدء.

### كيفية المساهمة

1. Fork المشروع
2. إنشاء فرع للميزة الجديدة (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى الفرع (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## 🆘 الدعم

إذا واجهت أي مشاكل أو لديك أسئلة:

- 📧 البريد الإلكتروني: support@customs-calculator.jo
- 🐛 تقرير الأخطاء: [GitHub Issues](https://github.com/your-username/customs-calculator/issues)
- 📖 الوثائق: [docs/](docs/)

## 🔄 التحديثات

انظر [CHANGELOG.md](CHANGELOG.md) لمعرفة التحديثات والإضافات الجديدة.

## 📈 الإحصائيات

- ⭐ النجوم: [![GitHub stars](https://img.shields.io/github/stars/your-username/customs-calculator.svg)](https://github.com/your-username/customs-calculator/stargazers)
- 🔀 Forks: [![GitHub forks](https://img.shields.io/github/forks/your-username/customs-calculator.svg)](https://github.com/your-username/customs-calculator/network)
- 🐛 Issues: [![GitHub issues](https://img.shields.io/github/issues/your-username/customs-calculator.svg)](https://github.com/your-username/customs-calculator/issues)

## 🙏 الشكر

- فريق React للواجهة الممتازة
- مجتمع Node.js للدعم المستمر
- جميع المساهمين في هذا المشروع

---

**ملاحظة**: هذا التطبيق مخصص للاستخدام في الأردن ويتبع التشريعات الجمركية المحلية. يرجى التحقق من صحة المعلومات مع السلطات المختصة.