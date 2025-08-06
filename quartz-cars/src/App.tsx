import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CarDetailsPage from './pages/CarDetailsPage';
import ComparePage from './pages/ComparePage';
import CalculatorPage from './pages/CalculatorPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gradient-to-br from-quartz-light via-white to-quartz-50 font-tajwal">
        <Header />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/car/:id" element={<CarDetailsPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
