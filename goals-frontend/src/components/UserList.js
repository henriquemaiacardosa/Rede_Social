import React, { useEffect, useState } from 'react';
import api from '../services/api';

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log("🚀 Fazendo requisição para buscar usuários...");
    api.get('/usuarios')
      .then((response) => {
        console.log("✅ Usuários recebidos:", response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("❌ Erro ao buscar usuários:", error.message);
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h2>Lista de Usuários</h2>
      {error && <p style={{ color: 'red' }}>Erro: {error}</p>}
      {users.length > 0 ? (
        users.map((user) => (
          <p key={user.id}>{user.name}</p>
        ))
      ) : (
        <p>Nenhum usuário encontrado.</p>
      )}
    </div>
  );
}

export default UserList;
