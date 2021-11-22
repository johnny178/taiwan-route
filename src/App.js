import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path='/' element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
