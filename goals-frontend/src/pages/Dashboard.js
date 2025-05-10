import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Dashboard() {
  const [metas, setMetas] = useState([]);

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
    <div>
      <h2>Dashboard - Todas as Metas</h2>
      <ul>
        {metas.map((meta) => (
          <li key={meta.id}>{meta.titulo}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
