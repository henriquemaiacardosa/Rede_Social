import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Perfil() {
  const [metas, setMetas] = useState([]);

  const fetchUserMetas = async () => {
    try {
      const response = await api.get('/goals/user');
      setMetas(response.data);
    } catch (error) {
      console.error('Erro ao carregar metas do usuário:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  useEffect(() => {
    fetchUserMetas();
  }, []);

  return (
    <div>
      <h2>Perfil - Minhas Metas</h2>
      <button onClick={handleLogout} style={{ margin: '10px' }}>Sair</button>
      <ul>
        {metas.map((meta) => (
          <li key={meta.id}>{meta.titulo}</li>
        ))}
      </ul>
    </div>
  );
}

export default Perfil;
