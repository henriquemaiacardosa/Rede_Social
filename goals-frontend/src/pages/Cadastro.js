import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Log para verificar a URL da API
  console.log('URL da API:', process.env.REACT_APP_API_URL);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Log para verificar os dados antes do envio
      console.log('Dados enviados:', { nome, email, senha });

      // Enviando os dados no formato correto para o backend
      const response = await api.post('/usuarios', {
        nome: nome,
        email: email,
        senha: senha,
      });

      console.log('Resposta do cadastro:', response.data);
      setMessage('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);

      if (error.response) {
        // Verificar a resposta detalhada do erro
        console.error('Erro detalhado:', error.response.data);
        const errorMessage = error.response.data.error || 'Erro desconhecido';
        setMessage('Erro ao cadastrar: ' + errorMessage);
      } else if (error.request) {
        setMessage('Erro ao cadastrar: Servidor não respondeu.');
      } else {
        setMessage('Erro ao cadastrar: ' + error.message);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Cadastro</h2>
      <form onSubmit={handleRegister} style={{ display: 'inline-block' }}>
        <div>
          <input 
            type="text" 
            placeholder="Nome" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            style={{ margin: '5px', padding: '8px', width: '250px' }}
            required
          />
        </div>
        <div>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ margin: '5px', padding: '8px', width: '250px' }}
            required
          />
        </div>
        <div>
          <input 
            type="password" 
            placeholder="Senha" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            style={{ margin: '5px', padding: '8px', width: '250px' }}
            required
          />
        </div>
        <button 
          type="submit" 
          style={{ margin: '10px', padding: '8px 16px', cursor: 'pointer' }}
        >
          Cadastrar
        </button>
      </form>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
    </div>
  );
}

export default Cadastro;
