import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Cadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  console.log('URL da API:', process.env.REACT_APP_API_URL);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/usuarios', { name, email, password });
      setMessage('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);

      // Verifica se há uma resposta do servidor
      if (error.response) {
        const errorMessage = error.response.data.message || 'Erro desconhecido';
        setMessage('Erro ao cadastrar: ' + errorMessage);
      } else if (error.request) {
        // Erro na comunicação com o servidor
        setMessage('Erro ao cadastrar: Servidor não respondeu.');
      } else {
        // Outro tipo de erro
        setMessage('Erro ao cadastrar: ' + error.message);
      }
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
