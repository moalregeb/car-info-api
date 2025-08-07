# Development Guide

This guide covers the development workflow, coding standards, and best practices for the Customs Calculator project.

## Getting Started

### Prerequisites

- Node.js 16 or later
- npm or yarn
- Git
- Code editor (VS Code recommended)
- Browser developer tools

### Development Environment Setup

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/customs-calculator.git
cd customs-calculator
```

2. **Install dependencies:**
```bash
npm install
cd react-frontend && npm install && cd ..
```

3. **Set up environment variables:**
```bash
# Root .env
cp .env.example .env

# React .env
cd react-frontend
cp .env.example .env
cd ..
```

4. **Start development servers:**
```bash
npm run dev
```

## Project Structure

```
customs-calculator/
├── server.js                 # Backend server
├── package.json              # Root dependencies
├── react-frontend/           # React application
│   ├── public/              # Static assets
│   ├── src/                 # Source code
│   │   ├── components/      # React components
│   │   ├── hooks/          # Custom hooks
│   │   ├── utils/          # Utility functions
│   │   └── App.js          # Main app component
│   └── package.json         # Frontend dependencies
├── docs/                    # Documentation
├── scripts/                 # Build/deployment scripts
└── docker-compose.yml       # Docker configuration
```

## Coding Standards

### JavaScript/React

#### Naming Conventions

- **Components:** PascalCase (`CustomsCalculator`)
- **Files:** PascalCase for components, camelCase for utilities
- **Variables:** camelCase (`declaredValue`)
- **Constants:** UPPER_SNAKE_CASE (`CUSTOMS_RATES`)
- **Functions:** camelCase (`calculateCustoms`)

#### Code Style

```javascript
// Good
const calculateCustoms = (declaredValue, dutyRate) => {
  const dutyAmount = (declaredValue * dutyRate) / 100;
  return dutyAmount;
};

// Bad
const calculate_customs = (declared_value, duty_rate) => {
  const duty_amount = (declared_value * duty_rate) / 100;
  return duty_amount;
};
```

#### Component Structure

```javascript
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';

// PropTypes (if not using TypeScript)
import PropTypes from 'prop-types';

const CustomsCalculator = ({ initialValue, onCalculate }) => {
  // 1. State declarations
  const [value, setValue] = useState(initialValue);
  
  // 2. Effects
  useEffect(() => {
    // Effect logic
  }, [value]);
  
  // 3. Event handlers
  const handleCalculate = () => {
    // Handler logic
  };
  
  // 4. Render
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="calculator-container"
    >
      {/* Component content */}
    </motion.div>
  );
};

CustomsCalculator.propTypes = {
  initialValue: PropTypes.number,
  onCalculate: PropTypes.func.isRequired,
};

CustomsCalculator.defaultProps = {
  initialValue: 0,
};

export default CustomsCalculator;
```

### CSS/Styling

#### CSS Variables

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #06b6d4;
  --background-color: #0f172a;
  --surface-color: #1e293b;
  --text-color: #f8fafc;
  --border-color: #334155;
}
```

#### Component Styling

```css
.calculator-container {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 24px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.calculator-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}
```

## Development Workflow

### Git Workflow

1. **Create feature branch:**
```bash
git checkout -b feature/customs-calculation
```

2. **Make changes and commit:**
```bash
git add .
git commit -m "feat: add customs calculation functionality

- Implement duty calculation logic
- Add special tax calculation
- Include VAT calculation
- Update UI to display results"
```

3. **Push and create PR:**
```bash
git push origin feature/customs-calculation
```

### Commit Message Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Build/tooling changes

### Code Review Checklist

- [ ] Code follows project standards
- [ ] No console.log statements in production code
- [ ] Error handling implemented
- [ ] Loading states handled
- [ ] Responsive design tested
- [ ] Accessibility considerations
- [ ] Performance optimized
- [ ] Tests written (if applicable)

## Testing

### Unit Testing

```javascript
// CustomsCalculator.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import CustomsCalculator from './CustomsCalculator';

describe('CustomsCalculator', () => {
  test('calculates customs correctly', () => {
    render(<CustomsCalculator />);
    
    const input = screen.getByLabelText(/declared value/i);
    fireEvent.change(input, { target: { value: '10000' } });
    
    const calculateButton = screen.getByText(/calculate/i);
    fireEvent.click(calculateButton);
    
    expect(screen.getByText(/duty amount/i)).toBeInTheDocument();
  });
});
```

### Integration Testing

```javascript
// API.test.js
import axios from 'axios';

describe('API Integration', () => {
  test('calculate customs endpoint', async () => {
    const response = await axios.post('/api/calculate-customs', {
      model_id: 1,
      declared_value: 10000
    });
    
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('duty_amount');
  });
});
```

### Manual Testing Checklist

- [ ] All form inputs work correctly
- [ ] Calculations are accurate
- [ ] Error messages display properly
- [ ] Loading states work
- [ ] Responsive design on all screen sizes
- [ ] Accessibility features work
- [ ] Browser compatibility

## Debugging

### Frontend Debugging

1. **React Developer Tools:**
   - Install browser extension
   - Inspect component state
   - Monitor props changes

2. **Console Debugging:**
```javascript
// Temporary debugging
console.log('State:', state);
console.log('Props:', props);

// Remove before committing
```

3. **Network Tab:**
   - Monitor API calls
   - Check request/response data
   - Verify headers

### Backend Debugging

1. **Server Logs:**
```javascript
// Add logging
console.log('Request:', req.body);
console.log('Response:', response);
```

2. **API Testing:**
```bash
# Test endpoints
curl -X POST http://localhost:3001/api/calculate-customs \
  -H "Content-Type: application/json" \
  -d '{"model_id": 1, "declared_value": 10000}'
```

## Performance Optimization

### Frontend Optimization

1. **Code Splitting:**
```javascript
// Lazy load components
const CustomsCalculator = lazy(() => import('./CustomsCalculator'));
```

2. **Memoization:**
```javascript
const memoizedValue = useMemo(() => {
  return expensiveCalculation(value);
}, [value]);
```

3. **Bundle Analysis:**
```bash
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

### Backend Optimization

1. **Caching:**
```javascript
// Implement caching for static data
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

2. **Compression:**
```javascript
const compression = require('compression');
app.use(compression());
```

## Security Best Practices

### Frontend Security

1. **Input Validation:**
```javascript
const validateInput = (value) => {
  if (typeof value !== 'number' || value < 0) {
    throw new Error('Invalid input');
  }
  return value;
};
```

2. **XSS Prevention:**
```javascript
// Use React's built-in XSS protection
// Avoid dangerouslySetInnerHTML
```

### Backend Security

1. **Input Sanitization:**
```javascript
const sanitizeInput = (input) => {
  return input.replace(/[<>]/g, '');
};
```

2. **Rate Limiting:**
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## Documentation

### Code Documentation

```javascript
/**
 * Calculates customs duty for a given declared value and duty rate
 * @param {number} declaredValue - The declared value of the vehicle
 * @param {number} dutyRate - The duty rate percentage
 * @returns {number} The calculated duty amount
 * @example
 * calculateDuty(10000, 15) // returns 1500
 */
const calculateDuty = (declaredValue, dutyRate) => {
  return (declaredValue * dutyRate) / 100;
};
```

### API Documentation

Update `docs/API.md` when adding new endpoints.

### Component Documentation

```javascript
/**
 * CustomsCalculator Component
 * 
 * A form component for calculating customs duties and taxes
 * 
 * @component
 * @example
 * <CustomsCalculator
 *   initialValue={10000}
 *   onCalculate={(result) => console.log(result)}
 * />
 */
```

## Troubleshooting

### Common Issues

1. **Port conflicts:**
```bash
# Check what's using the port
lsof -i :3000
# Kill the process
kill -9 <PID>
```

2. **Module not found:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

3. **Build errors:**
```bash
# Clear build cache
npm run build -- --reset-cache
```

### Development Tools

- **VS Code Extensions:**
  - ESLint
  - Prettier
  - Auto Rename Tag
  - Bracket Pair Colorizer

- **Browser Extensions:**
  - React Developer Tools
  - Redux DevTools (if using Redux)
  - Lighthouse

## Resources

- [React Documentation](https://reactjs.org/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Lucide React Icons](https://lucide.dev/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)