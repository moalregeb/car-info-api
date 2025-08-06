import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// تحسين الأداء مع Concurrent Features
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// قياس الأداء (اختياري)
// يمكنك تمرير دالة لتسجيل النتائج (مثل: reportWebVitals(console.log))
// أو إرسالها إلى خدمة تحليلات. تعرف على المزيد: https://bit.ly/CRA-vitals
reportWebVitals();
