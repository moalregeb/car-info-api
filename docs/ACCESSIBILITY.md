# دليل إمكانية الوصول - Accessibility Guide

هذا الدليل يغطي معايير إمكانية الوصول وتطبيقها في تطبيق حاسبة الرسوم الجمركية.

## 🎯 نظرة عامة على إمكانية الوصول

### معايير WCAG 2.1

- **مستوى A**: الحد الأدنى المطلوب
- **مستوى AA**: المستوى الموصى به (نهدف إليه)
- **مستوى AAA**: المستوى الأعلى (طموح)

### المبادئ الأربعة

1. **قابل للإدراك (Perceivable)** - يمكن إدراك المحتوى بطرق مختلفة
2. **قابل للتشغيل (Operable)** - يمكن تشغيل واجهة المستخدم
3. **قابل للفهم (Understandable)** - يمكن فهم المحتوى والواجهة
4. **قوي (Robust)** - متوافق مع التقنيات المساعدة

## 🎨 إمكانية الوصول البصرية

### 1. التباين اللوني

```css
/* تباين عالي للألوان */
:root {
  --primary-color: #6366f1; /* تباين 4.5:1 */
  --secondary-color: #8b5cf6; /* تباين 4.5:1 */
  --accent-color: #06b6d4; /* تباين 4.5:1 */
  --text-color: #f8fafc; /* تباين 15:1 على خلفية داكنة */
  --background-color: #0f172a;
  --surface-color: #1e293b;
  --border-color: #334155;
}

/* دعم الوضع عالي التباين */
@media (prefers-contrast: high) {
  :root {
    --primary-color: #ffffff;
    --text-color: #000000;
    --background-color: #ffffff;
  }
}
```

### 2. أحجام الخطوط

```css
/* أحجام خطوط قابلة للتغيير */
html {
  font-size: 16px; /* الحجم الأساسي */
}

body {
  font-size: 1rem;
  line-height: 1.6;
}

/* دعم تكبير الخط */
@media (prefers-reduced-motion: no-preference) {
  .text-zoom {
    transition: font-size 0.3s ease;
  }
}

/* أحجام خطوط متدرجة */
.text-xs { font-size: 0.75rem; }
.text-sm { font-size: 0.875rem; }
.text-base { font-size: 1rem; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }
.text-2xl { font-size: 1.5rem; }
```

### 3. التركيز المرئي

```css
/* مؤشرات التركيز الواضحة */
:focus {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
  border-radius: 4px;
}

/* إخفاء مؤشر التركيز عند النقر */
:focus:not(:focus-visible) {
  outline: none;
}

/* مؤشر تركيز مخصص */
.focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.2);
}
```

## ⌨️ إمكانية الوصول بالكيبورد

### 1. ترتيب التبويب

```javascript
// ترتيب منطقي للتبويب
const TabOrder = () => {
  return (
    <div>
      <select tabIndex="1" aria-label="فئة السيارة">
        {/* خيارات الفئات */}
      </select>
      
      <select tabIndex="2" aria-label="العلامة التجارية">
        {/* خيارات العلامات */}
      </select>
      
      <select tabIndex="3" aria-label="الموديل">
        {/* خيارات الموديلات */}
      </select>
      
      <input 
        tabIndex="4" 
        type="number" 
        aria-label="القيمة المعلنة"
        placeholder="أدخل القيمة المعلنة"
      />
      
      <button tabIndex="5" aria-label="احسب الرسوم الجمركية">
        احسب
      </button>
    </div>
  );
};
```

### 2. التنقل بالكيبورد

```javascript
// دعم مفاتيح التنقل
const handleKeyDown = (event) => {
  switch (event.key) {
    case 'Enter':
      event.preventDefault();
      handleCalculate();
      break;
    case 'Escape':
      event.preventDefault();
      resetForm();
      break;
    case 'Tab':
      // التنقل الطبيعي
      break;
  }
};

// مكون مع دعم الكيبورد
const CalculatorForm = () => {
  return (
    <form 
      onKeyDown={handleKeyDown}
      role="form"
      aria-label="نموذج حساب الرسوم الجمركية"
    >
      {/* محتوى النموذج */}
    </form>
  );
};
```

### 3. اختصارات الكيبورد

```javascript
// اختصارات مفيدة
const KeyboardShortcuts = () => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Ctrl/Cmd + Enter للحساب
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        handleCalculate();
      }
      
      // Ctrl/Cmd + R لإعادة تعيين
      if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
        event.preventDefault();
        resetForm();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);
};
```

## 🗣️ إمكانية الوصول الصوتية

### 1. ARIA Labels

```javascript
// استخدام ARIA labels
const CalculatorForm = () => {
  return (
    <div role="main" aria-label="حاسبة الرسوم الجمركية">
      <h1 id="calculator-title">حاسبة الرسوم الجمركية</h1>
      
      <form role="form" aria-labelledby="calculator-title">
        <label htmlFor="category-select">فئة السيارة:</label>
        <select 
          id="category-select"
          aria-describedby="category-help"
          aria-required="true"
        >
          <option value="">اختر فئة السيارة</option>
          <option value="1">سيارة عادية</option>
          <option value="2">سيارة كهربائية</option>
        </select>
        <div id="category-help" className="help-text">
          اختر نوع السيارة لحساب الرسوم المناسبة
        </div>
        
        <label htmlFor="declared-value">القيمة المعلنة:</label>
        <input
          id="declared-value"
          type="number"
          min="0"
          step="1000"
          aria-describedby="value-help"
          aria-required="true"
          placeholder="أدخل القيمة بالدينار"
        />
        <div id="value-help" className="help-text">
          أدخل القيمة المعلنة للسيارة بالدينار الأردني
        </div>
      </form>
    </div>
  );
};
```

### 2. Live Regions

```javascript
// مناطق حية للتحديثات
const CalculatorResults = ({ results }) => {
  return (
    <div 
      role="region" 
      aria-live="polite" 
      aria-atomic="true"
      aria-label="نتائج الحساب"
    >
      {results && (
        <div>
          <h2>نتائج الحساب</h2>
          <p aria-live="assertive">
            تم حساب الرسوم الجمركية بنجاح
          </p>
          <ul>
            <li>رسوم الجمرك: {results.duty_amount} دينار</li>
            <li>الضريبة الخاصة: {results.special_tax_amount} دينار</li>
            <li>ضريبة القيمة المضافة: {results.vat_amount} دينار</li>
            <li>المجموع الكلي: {results.total_amount} دينار</li>
            <li>السعر النهائي: {results.final_price} دينار</li>
          </ul>
        </div>
      )}
    </div>
  );
};
```

### 3. Screen Reader Support

```javascript
// دعم قارئات الشاشة
const ScreenReaderSupport = () => {
  return (
    <div>
      {/* إخفاء العناصر البصرية من قارئات الشاشة */}
      <div className="sr-only">
        هذه حاسبة الرسوم الجمركية للأردن
      </div>
      
      {/* إضافة وصف للصور */}
      <img 
        src="/logo.png" 
        alt="شعار حاسبة الرسوم الجمركية"
        aria-describedby="logo-description"
      />
      <div id="logo-description" className="sr-only">
        شعار التطبيق يظهر آلة حاسبة مع علم الأردن
      </div>
      
      {/* إضافة وصف للرسوم البيانية */}
      <div role="img" aria-label="رسم بياني للرسوم الجمركية">
        {/* محتوى الرسم البياني */}
      </div>
    </div>
  );
};
```

## 🎭 إمكانية الوصول الحركية

### 1. تقليل الحركة

```css
/* احترام تفضيلات تقليل الحركة */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* حركات محسنة للمستخدمين الحساسين */
@media (prefers-reduced-motion: no-preference) {
  .fade-in {
    animation: fadeIn 0.3s ease-out;
  }
  
  .slide-in {
    animation: slideIn 0.3s ease-out;
  }
}
```

### 2. أحجام الأزرار

```css
/* أحجام أزرار مناسبة للمس */
button {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
}

/* مسافات مناسبة بين العناصر */
.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}
```

### 3. دعم اللمس

```javascript
// تحسين تجربة اللمس
const TouchFriendlyInput = () => {
  return (
    <input
      type="number"
      inputMode="numeric"
      pattern="[0-9]*"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      style={{
        fontSize: '16px', // منع التكبير في iOS
        minHeight: '44px',
        padding: '12px',
      }}
    />
  );
};
```

## 🧠 إمكانية الوصول المعرفية

### 1. وضوح اللغة

```javascript
// استخدام لغة واضحة وبسيطة
const ClearLanguage = () => {
  return (
    <div>
      <h1>حاسبة الرسوم الجمركية</h1>
      <p>
        احسب الرسوم الجمركية والضرائب على سيارتك في الأردن
      </p>
      
      <div className="instructions">
        <h2>كيفية الاستخدام:</h2>
        <ol>
          <li>اختر نوع السيارة</li>
          <li>اختر العلامة التجارية</li>
          <li>اختر الموديل</li>
          <li>أدخل القيمة المعلنة</li>
          <li>اضغط "احسب" للحصول على النتائج</li>
        </ol>
      </div>
    </div>
  );
};
```

### 2. رسائل الخطأ الواضحة

```javascript
// رسائل خطأ مفيدة
const ErrorMessages = () => {
  const [error, setError] = useState(null);
  
  const getErrorMessage = (errorType) => {
    switch (errorType) {
      case 'INVALID_VALUE':
        return 'يرجى إدخال قيمة صحيحة أكبر من صفر';
      case 'REQUIRED_FIELD':
        return 'هذا الحقل مطلوب';
      case 'NETWORK_ERROR':
        return 'حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى';
      default:
        return 'حدث خطأ غير متوقع';
    }
  };
  
  return (
    <div>
      {error && (
        <div 
          role="alert" 
          aria-live="assertive"
          className="error-message"
        >
          <span className="error-icon" aria-hidden="true">⚠️</span>
          {getErrorMessage(error)}
        </div>
      )}
    </div>
  );
};
```

### 3. المساعدة والسياق

```javascript
// توفير مساعدة وسياق
const HelpfulContext = () => {
  return (
    <div>
      <div className="help-section">
        <h3>معلومات مفيدة:</h3>
        <ul>
          <li>السيارات الكهربائية معفاة من رسوم الجمرك</li>
          <li>الضريبة الخاصة تختلف حسب نوع السيارة</li>
          <li>ضريبة القيمة المضافة 16% على جميع السيارات</li>
        </ul>
      </div>
      
      <div className="tooltip" role="tooltip">
        <span className="tooltip-trigger" tabIndex="0">
          ما هي القيمة المعلنة؟
          <span className="tooltip-icon" aria-hidden="true">?</span>
        </span>
        <div className="tooltip-content">
          القيمة المعلنة هي السعر المعلن للسيارة في بلد المنشأ
        </div>
      </div>
    </div>
  );
};
```

## 🔧 أدوات الاختبار

### 1. اختبارات إمكانية الوصول

```javascript
// اختبارات Jest لإمكانية الوصول
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Accessibility Tests', () => {
  test('has proper heading structure', () => {
    render(<CalculatorForm />);
    
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });
  
  test('has proper form labels', () => {
    render(<CalculatorForm />);
    
    expect(screen.getByLabelText(/فئة السيارة/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/القيمة المعلنة/i)).toBeInTheDocument();
  });
  
  test('has proper ARIA attributes', () => {
    render(<CalculatorForm />);
    
    const form = screen.getByRole('form');
    expect(form).toHaveAttribute('aria-labelledby');
  });
});
```

### 2. أدوات الفحص

```bash
# تثبيت أدوات فحص إمكانية الوصول
npm install --save-dev axe-core @axe-core/react

# تشغيل فحص إمكانية الوصول
npx axe http://localhost:3000

# فحص في المتصفح
# تثبيت إضافة axe DevTools
```

### 3. اختبارات يدوية

```javascript
// قائمة فحص إمكانية الوصول
const AccessibilityChecklist = () => {
  const checklist = [
    '✓ جميع الصور لها alt text',
    '✓ جميع النماذج لها labels',
    '✓ يمكن التنقل بالكيبورد',
    '✓ مؤشرات التركيز مرئية',
    '✓ التباين اللوني مناسب',
    '✓ النصوص قابلة للتكبير',
    '✓ الرسوم المتحركة يمكن إيقافها',
    '✓ قارئات الشاشة تعمل بشكل صحيح',
  ];
  
  return (
    <div>
      <h3>قائمة فحص إمكانية الوصول:</h3>
      <ul>
        {checklist.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
```

## 📱 إمكانية الوصول للأجهزة المحمولة

### 1. تحسين اللمس

```css
/* تحسين تجربة اللمس */
.touch-friendly {
  min-height: 44px;
  min-width: 44px;
  padding: 12px;
  margin: 8px;
  border-radius: 8px;
}

/* منع التكبير غير المرغوب */
input, select, textarea {
  font-size: 16px;
  max-width: 100%;
}
```

### 2. دعم الشاشات الصغيرة

```css
/* تحسين للشاشات الصغيرة */
@media (max-width: 768px) {
  .calculator-form {
    padding: 1rem;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  button {
    width: 100%;
    height: 48px;
  }
}
```

## 🎯 أهداف إمكانية الوصول

### أهداف WCAG 2.1 AA

- [x] **1.4.3** - تباين لوني 4.5:1 للنص العادي
- [x] **2.1.1** - دعم الكيبورد الكامل
- [x] **2.4.6** - عناوين واضحة ووصفية
- [x] **3.3.2** - رسائل خطأ واضحة
- [x] **4.1.2** - دعم ARIA صحيح

### أهداف إضافية

- [ ] **2.2.2** - إيقاف الحركة عند الطلب
- [ ] **2.4.7** - مؤشرات تركيز مرئية
- [ ] **3.1.5** - لغة بسيطة وواضحة
- [ ] **4.1.3** - دعم قارئات الشاشة

## 📚 المراجع

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Accessibility](https://reactjs.org/docs/accessibility.html)
- [ARIA Best Practices](https://www.w3.org/TR/wai-aria-practices/)
- [Web Accessibility Initiative](https://www.w3.org/WAI/)
- [Axe Core](https://github.com/dequelabs/axe-core)