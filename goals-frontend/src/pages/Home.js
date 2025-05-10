import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Home() {
  const [metas, setMetas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetas = async () => {
      try {
        const response = await api.get('/metas');
        setMetas(response.data);
      } catch (error) {
        console.error('Erro ao carregar metas:', error);
      }
    };

    fetchMetas();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Bem-vindo ao GOALS!</h2>
      <button onClick={() => navigate('/perfil')}>Perfil</button>
      <button onClick={() => navigate('/criar-meta')}>Criar Meta</button>
      <button onClick={handleLogout}>Sair</button>
      <h3>Metas Compartilhadas</h3>
      {metas.length === 0 ? (
        <p>Nenhuma meta encontrada.</p>
      ) : (
        <ul>
          {metas.map((meta) => (
            <li key={meta.id}>{meta.titulo} - {meta.descricao}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
