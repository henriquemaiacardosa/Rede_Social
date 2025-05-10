import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Dashboard() {
  const [metas, setMetas] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMetas = async () => {
      try {
        const response = await api.get('/metas'); // Verifique se está correto
        setMetas(response.data);
        console.log('Metas carregadas:', response.data);
      } catch (error) {
        console.error('Erro ao carregar metas:', error);
        setMessage('Erro ao carregar metas');
      }
    };

    fetchMetas();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {message && <p>{message}</p>}
      <div>
        <h3>Metas</h3>
        <ul>
          {metas.map((meta) => (
            <li key={meta.id}>
              <h4>{meta.titulo}</h4>
              <p>{meta.descricao}</p>
              <p>Data de Criação: {meta.data_criacao}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
