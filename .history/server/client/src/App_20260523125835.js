import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // 1. Router-ai import pannunga
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  return (
    // 2. Pazhaya code-ai azhikkama, intha Router tag-kulla podunga
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      
      {/* Unga pazhaya code (App.js-la irunthathu) innum irukkum na, 
          adhu intha Routes tag-kku mela illa kela irukkaalam. */}
    </Router>
  );
}

export default App;