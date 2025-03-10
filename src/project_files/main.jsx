import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/Home.css';
import '../css/About.css';
import "../css/Visualize.css";
import App from './App.jsx';
import Home from './Home.jsx';
import About from './about.jsx';  // Updated to match the component name
import Visualize from './Visualize.jsx';
import React from 'react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/visualize" element={<Visualize />} />
      </Routes>
    </Router>
  </StrictMode>
);
