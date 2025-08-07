# دليل الاختبارات - Testing Guide

هذا الدليل يغطي استراتيجيات الاختبار الشاملة لتطبيق حاسبة الرسوم الجمركية.

## 🎯 نظرة عامة على الاختبارات

### هرم الاختبارات

```
    E2E Tests
       ▲
   Integration Tests
       ▲
    Unit Tests
       ▲
   Static Analysis
```

### أنواع الاختبارات

1. **الاختبارات الوحدية (Unit Tests)** - اختبار المكونات الفردية
2. **الاختبارات التكاملية (Integration Tests)** - اختبار التفاعل بين المكونات
3. **الاختبارات الشاملة (E2E Tests)** - اختبار التطبيق بالكامل
4. **التحليل الثابت (Static Analysis)** - فحص الكود بدون تشغيله

## 🧪 إعداد بيئة الاختبار

### تثبيت الأدوات

```bash
# تثبيت أدوات الاختبار
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event

# تثبيت Jest للاختبارات
npm install --save-dev jest

# تثبيت أدوات E2E
npm install --save-dev cypress

# تثبيت أدوات التحليل الثابت
npm install --save-dev eslint prettier
```

### إعداد Jest

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

## 🧩 الاختبارات الوحدية

### اختبار مكونات React

```javascript
// CustomsCalculator.test.js
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomsCalculator from './CustomsCalculator';

describe('CustomsCalculator', () => {
  test('renders calculator form', () => {
    render(<CustomsCalculator />);
    
    expect(screen.getByText(/حاسبة الرسوم الجمركية/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/القيمة المعلنة/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /احسب/i })).toBeInTheDocument();
  });

  test('calculates customs correctly', async () => {
    const user = userEvent.setup();
    render(<CustomsCalculator />);
    
    // اختيار فئة السيارة
    const categorySelect = screen.getByLabelText(/فئة السيارة/i);
    await user.selectOptions(categorySelect, '1');
    
    // اختيار العلامة التجارية
    const brandSelect = screen.getByLabelText(/العلامة التجارية/i);
    await user.selectOptions(brandSelect, '1');
    
    // اختيار الموديل
    const modelSelect = screen.getByLabelText(/الموديل/i);
    await user.selectOptions(modelSelect, '1');
    
    // إدخال القيمة المعلنة
    const valueInput = screen.getByLabelText(/القيمة المعلنة/i);
    await user.type(valueInput, '10000');
    
    // الضغط على زر الحساب
    const calculateButton = screen.getByRole('button', { name: /احسب/i });
    await user.click(calculateButton);
    
    // التحقق من النتائج
    await waitFor(() => {
      expect(screen.getByText(/رسوم الجمرك/i)).toBeInTheDocument();
      expect(screen.getByText(/1500/i)).toBeInTheDocument(); // 15% من 10000
    });
  });

  test('displays error for invalid input', async () => {
    const user = userEvent.setup();
    render(<CustomsCalculator />);
    
    const valueInput = screen.getByLabelText(/القيمة المعلنة/i);
    await user.type(valueInput, '-1000');
    
    const calculateButton = screen.getByRole('button', { name: /احسب/i });
    await user.click(calculateButton);
    
    expect(screen.getByText(/قيمة غير صحيحة/i)).toBeInTheDocument();
  });
});
```

### اختبار الدوال المساعدة

```javascript
// helpers.test.js
import { calculateCustoms, formatCurrency, validateInput } from './helpers';

describe('Helper Functions', () => {
  describe('calculateCustoms', () => {
    test('calculates duty correctly', () => {
      const result = calculateCustoms(10000, 15);
      expect(result).toBe(1500);
    });

    test('handles zero value', () => {
      const result = calculateCustoms(0, 15);
      expect(result).toBe(0);
    });

    test('handles decimal rates', () => {
      const result = calculateCustoms(1000, 7.5);
      expect(result).toBe(75);
    });
  });

  describe('formatCurrency', () => {
    test('formats currency correctly', () => {
      expect(formatCurrency(1000)).toBe('1,000 دينار');
      expect(formatCurrency(1000000)).toBe('1,000,000 دينار');
    });

    test('handles zero', () => {
      expect(formatCurrency(0)).toBe('0 دينار');
    });
  });

  describe('validateInput', () => {
    test('validates positive numbers', () => {
      expect(validateInput(1000)).toBe(true);
      expect(validateInput(0)).toBe(false);
      expect(validateInput(-100)).toBe(false);
    });
  });
});
```

### اختبار الخطافات المخصصة

```javascript
// useApi.test.js
import { renderHook, waitFor } from '@testing-library/react';
import { useApi } from './useApi';

// Mock axios
jest.mock('axios');

describe('useApi', () => {
  test('makes GET request successfully', async () => {
    const { result } = renderHook(() => useApi());
    
    const mockData = { categories: ['سيارة عادية', 'سيارة كهربائية'] };
    axios.get.mockResolvedValueOnce({ data: mockData });
    
    const response = await result.current.get('/api/categories');
    
    expect(response).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith('/api/categories');
  });

  test('handles API errors', async () => {
    const { result } = renderHook(() => useApi());
    
    axios.get.mockRejectedValueOnce(new Error('Network error'));
    
    await expect(result.current.get('/api/categories')).rejects.toThrow('Network error');
  });
});
```

## 🔗 الاختبارات التكاملية

### اختبار API Endpoints

```javascript
// api.test.js
import request from 'supertest';
import app from '../server';

describe('API Endpoints', () => {
  describe('GET /api/categories', () => {
    test('returns categories list', async () => {
      const response = await request(app)
        .get('/api/categories')
        .expect(200);
      
      expect(response.body).toHaveProperty('categories');
      expect(Array.isArray(response.body.categories)).toBe(true);
    });
  });

  describe('GET /api/brands', () => {
    test('returns brands for category', async () => {
      const response = await request(app)
        .get('/api/brands?category_id=1')
        .expect(200);
      
      expect(response.body).toHaveProperty('brands');
      expect(Array.isArray(response.body.brands)).toBe(true);
    });

    test('returns 400 for invalid category_id', async () => {
      await request(app)
        .get('/api/brands?category_id=invalid')
        .expect(400);
    });
  });

  describe('POST /api/calculate-customs', () => {
    test('calculates customs correctly', async () => {
      const response = await request(app)
        .post('/api/calculate-customs')
        .send({
          model_id: 1,
          declared_value: 10000
        })
        .expect(200);
      
      expect(response.body).toHaveProperty('duty_amount');
      expect(response.body).toHaveProperty('special_tax_amount');
      expect(response.body).toHaveProperty('vat_amount');
      expect(response.body).toHaveProperty('total_amount');
      expect(response.body).toHaveProperty('final_price');
    });

    test('returns 400 for invalid input', async () => {
      await request(app)
        .post('/api/calculate-customs')
        .send({
          model_id: 1,
          declared_value: -1000
        })
        .expect(400);
    });

    test('returns 404 for non-existent model', async () => {
      await request(app)
        .post('/api/calculate-customs')
        .send({
          model_id: 999,
          declared_value: 10000
        })
        .expect(404);
    });
  });
});
```

### اختبار التفاعل مع قاعدة البيانات

```javascript
// database.test.js
import { getCarDetails, calculateCustoms } from '../server/database';

describe('Database Functions', () => {
  test('retrieves car details', () => {
    const carDetails = getCarDetails(1);
    
    expect(carDetails).toHaveProperty('market_value');
    expect(carDetails).toHaveProperty('customs');
    expect(carDetails.customs).toHaveProperty('duty_rate');
  });

  test('calculates customs for regular car', () => {
    const result = calculateCustoms(1, 10000);
    
    expect(result.duty_amount).toBe(1500); // 15%
    expect(result.special_tax_amount).toBe(1000); // 10%
    expect(result.vat_amount).toBe(4160); // 16% of (10000 + 1500 + 1000)
    expect(result.total_amount).toBe(6660);
    expect(result.final_price).toBe(16660);
  });

  test('calculates customs for electric car', () => {
    const result = calculateCustoms(2, 10000); // Electric car
    
    expect(result.duty_amount).toBe(0); // 0%
    expect(result.special_tax_amount).toBe(500); // 5%
    expect(result.vat_amount).toBe(1680); // 16% of (10000 + 0 + 500)
    expect(result.total_amount).toBe(2180);
    expect(result.final_price).toBe(12180);
  });
});
```

## 🌐 الاختبارات الشاملة (E2E)

### إعداد Cypress

```javascript
// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
```

### اختبار سيناريوهات المستخدم

```javascript
// cypress/e2e/calculator.cy.js
describe('Customs Calculator', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should calculate customs for regular car', () => {
    // اختيار فئة السيارة
    cy.get('[data-testid="category-select"]').select('سيارة عادية');
    
    // اختيار العلامة التجارية
    cy.get('[data-testid="brand-select"]').select('تويوتا');
    
    // اختيار الموديل
    cy.get('[data-testid="model-select"]').select('كورولا');
    
    // إدخال القيمة المعلنة
    cy.get('[data-testid="declared-value-input"]').type('10000');
    
    // الضغط على زر الحساب
    cy.get('[data-testid="calculate-button"]').click();
    
    // التحقق من النتائج
    cy.get('[data-testid="duty-amount"]').should('contain', '1,500');
    cy.get('[data-testid="special-tax-amount"]').should('contain', '1,000');
    cy.get('[data-testid="vat-amount"]').should('contain', '4,160');
    cy.get('[data-testid="total-amount"]').should('contain', '6,660');
    cy.get('[data-testid="final-price"]').should('contain', '16,660');
  });

  it('should calculate customs for electric car', () => {
    // اختيار سيارة كهربائية
    cy.get('[data-testid="category-select"]').select('سيارة كهربائية');
    cy.get('[data-testid="brand-select"]').select('BYD');
    cy.get('[data-testid="model-select"]').select('Seal');
    cy.get('[data-testid="declared-value-input"]').type('20000');
    cy.get('[data-testid="calculate-button"]').click();
    
    // التحقق من الإعفاء من رسوم الجمرك
    cy.get('[data-testid="duty-amount"]').should('contain', '0');
    cy.get('[data-testid="special-tax-amount"]').should('contain', '1,000');
  });

  it('should display error for invalid input', () => {
    cy.get('[data-testid="declared-value-input"]').type('-1000');
    cy.get('[data-testid="calculate-button"]').click();
    
    cy.get('[data-testid="error-message"]').should('contain', 'قيمة غير صحيحة');
  });

  it('should be responsive on mobile', () => {
    cy.viewport('iphone-6');
    cy.visit('/');
    
    // التحقق من أن العناصر مرئية على الهاتف
    cy.get('[data-testid="category-select"]').should('be.visible');
    cy.get('[data-testid="calculate-button"]').should('be.visible');
  });
});
```

### اختبار الأداء

```javascript
// cypress/e2e/performance.cy.js
describe('Performance Tests', () => {
  it('should load within 3 seconds', () => {
    const startTime = Date.now();
    
    cy.visit('/', { timeout: 10000 });
    
    cy.get('[data-testid="calculator-form"]').should('be.visible');
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).to.be.lessThan(3000);
  });

  it('should calculate within 1 second', () => {
    cy.visit('/');
    
    cy.get('[data-testid="category-select"]').select('سيارة عادية');
    cy.get('[data-testid="brand-select"]').select('تويوتا');
    cy.get('[data-testid="model-select"]').select('كورولا');
    cy.get('[data-testid="declared-value-input"]').type('10000');
    
    const startTime = Date.now();
    cy.get('[data-testid="calculate-button"]').click();
    cy.get('[data-testid="calculation-results"]').should('be.visible');
    
    const calculationTime = Date.now() - startTime;
    expect(calculationTime).to.be.lessThan(1000);
  });
});
```

## 🔍 التحليل الثابت

### إعداد ESLint

```javascript
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  rules: {
    'react/prop-types': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-console': 'warn',
    'no-unused-vars': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
```

### إعداد Prettier

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

## 📊 تغطية الاختبارات

### إعداد تغطية الاختبارات

```javascript
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js',
    '!src/setupTests.js',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ['text', 'lcov', 'html'],
};
```

### تشغيل تقارير التغطية

```bash
# تشغيل الاختبارات مع التغطية
npm test -- --coverage

# عرض تقرير HTML للتغطية
open coverage/lcov-report/index.html
```

## 🚀 تشغيل الاختبارات

### سكريبتات الاختبار

```json
// package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "cypress run",
    "test:e2e:open": "cypress open",
    "test:api": "jest --testPathPattern=api",
    "test:unit": "jest --testPathPattern=unit",
    "lint": "eslint src/**/*.{js,jsx}",
    "lint:fix": "eslint src/**/*.{js,jsx} --fix",
    "format": "prettier --write src/**/*.{js,jsx,css,md}"
  }
}
```

### تشغيل الاختبارات

```bash
# تشغيل جميع الاختبارات
npm test

# تشغيل الاختبارات في وضع المراقبة
npm run test:watch

# تشغيل الاختبارات مع التغطية
npm run test:coverage

# تشغيل اختبارات E2E
npm run test:e2e

# فتح Cypress
npm run test:e2e:open

# فحص الكود
npm run lint

# تنسيق الكود
npm run format
```

## 🎯 أفضل الممارسات

### 1. كتابة اختبارات جيدة

```javascript
// ✅ جيد
test('should calculate duty correctly', () => {
  const result = calculateDuty(10000, 15);
  expect(result).toBe(1500);
});

// ❌ سيء
test('should work', () => {
  expect(calculateDuty(10000, 15)).toBe(1500);
});
```

### 2. استخدام data-testid

```javascript
// في المكون
<div data-testid="calculation-results">
  <span data-testid="duty-amount">{dutyAmount}</span>
</div>

// في الاختبار
expect(screen.getByTestId('duty-amount')).toHaveTextContent('1,500');
```

### 3. اختبار الحالات الحدية

```javascript
test('handles edge cases', () => {
  expect(calculateDuty(0, 15)).toBe(0);
  expect(calculateDuty(10000, 0)).toBe(0);
  expect(calculateDuty(-1000, 15)).toThrow();
});
```

### 4. اختبار التفاعلات

```javascript
test('user interactions', async () => {
  const user = userEvent.setup();
  
  await user.click(screen.getByRole('button'));
  await user.type(screen.getByRole('textbox'), '10000');
  
  expect(screen.getByText('1,500')).toBeInTheDocument();
});
```

## 🔧 استكشاف الأخطاء

### مشاكل شائعة

1. **اختبارات تفشل بشكل عشوائي**
   ```javascript
   // استخدم waitFor بدلاً من setTimeout
   await waitFor(() => {
     expect(screen.getByText('result')).toBeInTheDocument();
   });
   ```

2. **اختبارات بطيئة**
   ```javascript
   // استخدم mock للـ API calls
   jest.mock('axios');
   axios.get.mockResolvedValue({ data: mockData });
   ```

3. **مشاكل في التوقيت**
   ```javascript
   // استخدم fake timers
   jest.useFakeTimers();
   // ... اختبارات
   jest.useRealTimers();
   ```

## 📚 المراجع

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Cypress Documentation](https://docs.cypress.io/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)