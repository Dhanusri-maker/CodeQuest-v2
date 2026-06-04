import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Questions from './components/Questions';
import Question
function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/questions" element={<Questions />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;