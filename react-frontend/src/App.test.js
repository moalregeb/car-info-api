import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app without crashing', () => {
  render(<App />);
  // The app should render without throwing any errors
});

test('app has correct title', () => {
  render(<App />);
  // Check if the main title is present
  expect(document.title).toBe('حاسبة الرسوم الجمركية - الأردن');
});

test('app has Arabic direction', () => {
  render(<App />);
  // Check if the document has RTL direction
  expect(document.documentElement.dir).toBe('rtl');
});

test('app has Arabic language', () => {
  render(<App />);
  // Check if the document has Arabic language
  expect(document.documentElement.lang).toBe('ar');
});