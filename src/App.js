import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminScreen from './pages/Admin';
import UserScreen from './pages/User';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserScreen />} />
        <Route path="/admin" element={<AdminScreen />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;