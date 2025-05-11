import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Dashboard from './pages/Dashboard';
import Perfil from './pages/Perfil';
import CriarMeta from './pages/CriarMeta';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/perfil" element={isAuthenticated ? <Perfil /> : <Navigate to="/login" />} />
        <Route path="/criar-meta" element={isAuthenticated ? <CriarMeta /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
