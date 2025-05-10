import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Perfil() {
  const [metas, setMetas] = useState([]);

  const fetchUserMetas = async () => {
    try {
      const response = await api.get('/metas/user');
      setMetas(response.data);
    } catch (error) {
      console.error('Erro ao carregar metas do usuário:', error);
    }
  };

  useEffect(() => {
    fetchUserMetas();
  }, []);

  return (
    <div>
      <h2>Minhas Metas</h2>
      <ul>
        {metas.map((meta) => (
          <li key={meta.id}>{meta.titulo}</li>
        ))}
      </ul>
    </div>
  );
}

export default Perfil;
