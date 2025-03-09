import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../css/Home.css'
import '../css/About.css'
import App from './App.jsx'
import "../css/Visualize.css"
import Home from './Home.jsx'
import React from 'react';

import About from './About.jsx'
import Visualize from './Visualize.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Router>
      <Routes>
        <Route exact path="/" element={<Home />}>  </Route>
      </Routes>
      
      <Routes>
        <Route exact path="/about" element={<About/>}>  </Route>
      </Routes>
      <Routes>
        <Route exact path="/visualize" element={<Visualize/>}>  </Route>
      </Routes>
    </Router>
    </StrictMode>
)
