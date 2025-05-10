import React, { useState } from 'react';
import api from '../services/api';

function Cadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(''); // Limpar mensagem anterior

    try {
      console.log("Enviando dados:", { name, email, password });
      const response = await api.post('/usuarios', { name, email, password });
      setMessage('Usuário cadastrado com sucesso!');
      console.log('Resposta do cadastro:', response.data);
    } catch (error) {
      console.error('Erro ao cadastrar:', error.response ? error.response.data : error.message);
      setMessage('Erro ao cadastrar: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleRegister}>
        <input 
          type="text" 
          placeholder="Nome" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Cadastrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Cadastro;
