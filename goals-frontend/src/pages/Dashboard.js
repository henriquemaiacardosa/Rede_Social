import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Dashboard() {
  const [metas, setMetas] = useState([]);

  const fetchMetas = async () => {
    try {
      const response = await api.get('/goals');
      setMetas(response.data);
    } catch (error) {
      console.error('Erro ao carregar metas:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  useEffect(() => {
    fetchMetas();
  }, []);

  return (
    <div>
      <h2>Dashboard - Todas as Metas</h2>
      <button onClick={handleLogout} style={{ margin: '10px' }}>Sair</button>
      <ul>
        {metas.map((meta) => (
          <li key={meta.id}>{meta.titulo}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
