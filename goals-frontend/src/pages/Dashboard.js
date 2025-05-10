import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h2>Painel Principal</h2>
      <button onClick={handleLogout}>Sair</button>
      <button onClick={() => navigate('/criar-meta')}>Criar Meta</button>
    </div>
  );
}

export default Dashboard;
