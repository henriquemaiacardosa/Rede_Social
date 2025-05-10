import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Cadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const response = await api.post('/auth/register', {  // Corrigido aqui
      nome: name,
      email: email,
      senha: password,
    });

    console.log('Cadastro realizado com sucesso:', response.data);
    setMessage('Cadastro realizado com sucesso!');
    navigate('/login');
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
    setMessage('Erro ao cadastrar: ' + (error.response?.data?.message || 'Erro desconhecido'));
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
      <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
    </div>
  );
}

export default Cadastro;
