import React from 'react';

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Bem-vindo ao painel!</p>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default Dashboard;
