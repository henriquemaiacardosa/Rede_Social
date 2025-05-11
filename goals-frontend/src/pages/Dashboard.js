import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Dashboard() {
  const [metas, setMetas] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const fetchMetas = async () => {
    try {
      const response = await api.get('/metas');
      setMetas(response.data);
    } catch (error) {
      console.error('Erro ao carregar metas:', error);
    }
  };

  useEffect(() => {
    fetchMetas();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Dashboard - Todas as Metas</h2>
      <button onClick={() => navigate('/perfil')}>Perfil</button>
      <button onClick={() => navigate('/criar-meta')}>Criar Meta</button>
      <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Sair</button>
      <ul>
        {metas.map((meta) => (
          <li key={meta.id}>{meta.titulo}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
