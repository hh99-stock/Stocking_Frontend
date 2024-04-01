import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OrderPage from './pages/OrderPage';
import ChartPage from './pages/chartPage';
import Header from './components/header';
import SimpleHeader from './components/headerSimple';

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  let location = useLocation();
  let isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {isAuthPage ? <SimpleHeader /> : <Header />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/company/:companyid" element={<ChartPage />} />
      </Routes>
    </>
  );
}

export default AppWrapper;
