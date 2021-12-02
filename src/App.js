import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppWrapper from './components/AppWrapper';
import RouteDetailPage from './components/RouteDetailPage';
// import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';

function App() {
  return (
    <BrowserRouter basename="/">
      <AppWrapper>
        <Routes>
          <Route path='/' element={<SearchPage />} />
          <Route path='/:routeId' element={<RouteDetailPage />} />
          <Route path="/*" element={<Navigate replace to="/" />} />
        </Routes>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;
