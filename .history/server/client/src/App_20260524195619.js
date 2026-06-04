import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Questions from './components/Questions';
import QuestionPage from './components/QuestionPage';
function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/questions" element={<Questions />} />

        <Route path="/questionPge" element={<Questio}
      </Routes>

    </BrowserRouter>

  );

}

export default App;