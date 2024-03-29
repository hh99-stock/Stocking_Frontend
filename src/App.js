import './App.css';

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ChartPage from './pages/chartPage.js';
import Icon from './components/Icon.js';
function App() {
  return (
    <Router>
      <Icon type="MainPage" />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chart" element={<ChartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
