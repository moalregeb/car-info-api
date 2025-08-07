# Troubleshooting Guide

This guide helps you resolve common issues encountered while developing and deploying the Customs Calculator application.

## Common Issues

### Development Issues

#### 1. Port Already in Use

**Problem:** Cannot start the development server because port 3000 or 3001 is already in use.

**Solutions:**

```bash
# Check what's using the port
lsof -i :3000
lsof -i :3001

# Kill the process
kill -9 <PID>

# Alternative: Use different ports
PORT=3002 npm start
```

**Prevention:** Always check for running processes before starting development servers.

#### 2. Module Not Found Errors

**Problem:** `Module not found: Can't resolve 'module-name'`

**Solutions:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check if package is installed
npm list module-name

# Install missing package
npm install module-name
```

**Common Missing Packages:**
- `framer-motion`
- `lucide-react`
- `axios`

#### 3. Build Failures

**Problem:** `npm run build` fails with various errors.

**Solutions:**

```bash
# Clear build cache
npm run build -- --reset-cache

# Clear all caches
rm -rf node_modules/.cache
rm -rf build

# Reinstall dependencies
npm install

# Check for syntax errors
npm run lint
```

#### 4. Hot Reload Not Working

**Problem:** Changes in code don't reflect in the browser.

**Solutions:**

```bash
# Restart development server
npm run dev

# Clear browser cache
# Ctrl+Shift+R (hard refresh)

# Check file watchers
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### API Issues

#### 1. CORS Errors

**Problem:** `Access to fetch at 'http://localhost:3001/api/...' from origin 'http://localhost:3000' has been blocked by CORS policy`

**Solutions:**

```javascript
// In server.js, ensure CORS is properly configured
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:3000', 'https://yourdomain.com'],
  credentials: true
}));
```

#### 2. API Endpoint Not Found

**Problem:** `404 Not Found` when calling API endpoints.

**Solutions:**

```bash
# Check if server is running
curl http://localhost:3001/api/categories

# Check server logs
npm run server

# Verify endpoint exists in server.js
```

#### 3. API Response Errors

**Problem:** API returns unexpected data or errors.

**Debugging Steps:**

```javascript
// Add logging to server.js
app.post('/api/calculate-customs', (req, res) => {
  console.log('Request body:', req.body);
  console.log('Request headers:', req.headers);
  
  // Your logic here
  
  console.log('Response:', response);
  res.json(response);
});
```

### Frontend Issues

#### 1. React Component Not Rendering

**Problem:** Component doesn't appear or renders incorrectly.

**Debugging Steps:**

```javascript
// Add console logs
const MyComponent = () => {
  console.log('Component rendering');
  
  useEffect(() => {
    console.log('Component mounted');
  }, []);
  
  return <div>Content</div>;
};

// Check browser console for errors
// Verify component is imported correctly
```

#### 2. State Not Updating

**Problem:** Component state doesn't update when expected.

**Solutions:**

```javascript
// Ensure state updates are handled correctly
const [value, setValue] = useState(0);

const handleChange = (newValue) => {
  console.log('Updating value:', newValue);
  setValue(newValue);
};

// Use useEffect to monitor state changes
useEffect(() => {
  console.log('Value changed:', value);
}, [value]);
```

#### 3. Styling Issues

**Problem:** CSS styles not applying correctly.

**Solutions:**

```css
/* Check CSS specificity */
.calculator-container {
  background: var(--surface-color) !important;
}

/* Verify CSS variables are defined */
:root {
  --surface-color: #1e293b;
}

/* Check for conflicting styles */
* {
  box-sizing: border-box;
}
```

### Performance Issues

#### 1. Slow Loading Times

**Problem:** Application takes too long to load.

**Solutions:**

```javascript
// Implement code splitting
const CustomsCalculator = lazy(() => import('./CustomsCalculator'));

// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* component content */}</div>;
});

// Optimize images
// Use WebP format
// Implement lazy loading
```

#### 2. Memory Leaks

**Problem:** Application memory usage increases over time.

**Solutions:**

```javascript
// Clean up event listeners
useEffect(() => {
  const handleResize = () => {
    // Handle resize
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

// Clear intervals and timeouts
useEffect(() => {
  const interval = setInterval(() => {
    // Do something
  }, 1000);
  
  return () => clearInterval(interval);
}, []);
```

### Deployment Issues

#### 1. Docker Build Failures

**Problem:** `docker build` fails with various errors.

**Solutions:**

```bash
# Clean Docker cache
docker system prune -a

# Check Dockerfile syntax
docker build --no-cache .

# Verify .dockerignore
cat .dockerignore

# Check available disk space
df -h
```

#### 2. Container Won't Start

**Problem:** Docker container exits immediately after starting.

**Solutions:**

```bash
# Check container logs
docker logs <container-id>

# Run container interactively
docker run -it customs-calculator /bin/sh

# Check if ports are exposed correctly
docker port <container-id>
```

#### 3. Environment Variables Not Loading

**Problem:** Application can't access environment variables.

**Solutions:**

```bash
# Check if .env file exists
ls -la .env*

# Verify environment variables
echo $NODE_ENV
echo $REACT_APP_API_URL

# Set environment variables manually
export NODE_ENV=production
export REACT_APP_API_URL=https://api.example.com
```

### Database Issues

#### 1. Connection Errors

**Problem:** Cannot connect to database.

**Solutions:**

```javascript
// Check database connection
const testConnection = async () => {
  try {
    await db.connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};
```

#### 2. Query Performance Issues

**Problem:** Database queries are slow.

**Solutions:**

```javascript
// Add query logging
console.time('query');
const result = await db.query('SELECT * FROM cars');
console.timeEnd('query');

// Use indexes
// Optimize query structure
// Implement caching
```

### Security Issues

#### 1. CORS Configuration

**Problem:** Security errors related to CORS.

**Solutions:**

```javascript
// Configure CORS properly
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

#### 2. Input Validation

**Problem:** Malicious input causing issues.

**Solutions:**

```javascript
// Validate input
const validateInput = (input) => {
  if (typeof input !== 'number' || input < 0) {
    throw new Error('Invalid input');
  }
  return input;
};

// Sanitize input
const sanitizeInput = (input) => {
  return input.replace(/[<>]/g, '');
};
```

## Debugging Tools

### Frontend Debugging

1. **React Developer Tools:**
   - Install browser extension
   - Inspect component hierarchy
   - Monitor state changes
   - Profile performance

2. **Browser Developer Tools:**
   - Console for errors and logs
   - Network tab for API calls
   - Elements tab for DOM inspection
   - Performance tab for profiling

3. **VS Code Extensions:**
   - React Developer Tools
   - Debugger for Chrome
   - Error Lens

### Backend Debugging

1. **Node.js Debugger:**
```bash
# Start with debugger
node --inspect server.js

# Or use nodemon
nodemon --inspect server.js
```

2. **Logging:**
```javascript
// Add comprehensive logging
const logger = {
  info: (message) => console.log(`[INFO] ${new Date().toISOString()}: ${message}`),
  error: (message) => console.error(`[ERROR] ${new Date().toISOString()}: ${message}`),
  debug: (message) => console.debug(`[DEBUG] ${new Date().toISOString()}: ${message}`)
};
```

3. **API Testing:**
```bash
# Test API endpoints
curl -X GET http://localhost:3001/api/categories
curl -X POST http://localhost:3001/api/calculate-customs \
  -H "Content-Type: application/json" \
  -d '{"model_id": 1, "declared_value": 10000}'
```

## Performance Monitoring

### Frontend Performance

1. **Lighthouse Audit:**
   - Open Chrome DevTools
   - Go to Lighthouse tab
   - Run audit for performance, accessibility, best practices

2. **React Profiler:**
```javascript
import { Profiler } from 'react';

<Profiler id="CustomsCalculator" onRender={(id, phase, actualDuration) => {
  console.log(`${id} took ${actualDuration}ms to render`);
}}>
  <CustomsCalculator />
</Profiler>
```

### Backend Performance

1. **Response Time Monitoring:**
```javascript
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${duration}ms`);
  });
  next();
});
```

2. **Memory Usage:**
```javascript
const used = process.memoryUsage();
console.log({
  rss: `${Math.round(used.rss / 1024 / 1024 * 100) / 100} MB`,
  heapTotal: `${Math.round(used.heapTotal / 1024 / 1024 * 100) / 100} MB`,
  heapUsed: `${Math.round(used.heapUsed / 1024 / 1024 * 100) / 100} MB`
});
```

## Getting Help

### Before Asking for Help

1. **Check the logs:**
   - Browser console
   - Server logs
   - Docker logs

2. **Reproduce the issue:**
   - Document steps to reproduce
   - Test on different browsers/devices
   - Check if issue is environment-specific

3. **Search existing issues:**
   - GitHub issues
   - Stack Overflow
   - Documentation

### When Asking for Help

Include the following information:

1. **Environment:**
   - Operating system
   - Node.js version
   - Browser version
   - Package versions

2. **Error details:**
   - Full error message
   - Stack trace
   - Screenshots if applicable

3. **Steps to reproduce:**
   - Detailed steps
   - Expected vs actual behavior

4. **What you've tried:**
   - Solutions attempted
   - Research done
   - Debugging steps taken

### Resources

- [React Troubleshooting](https://reactjs.org/docs/error-boundaries.html)
- [Express.js Error Handling](https://expressjs.com/en/guide/error-handling.html)
- [Node.js Debugging](https://nodejs.org/en/docs/guides/debugging-getting-started/)
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)