import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppWrapper from './components/AppWrapper';
// import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';

function App() {
  return (
    <BrowserRouter basename="/">
      <AppWrapper>
        <Routes>
          <Route path='/' element={<SearchPage />} />
        </Routes>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;
