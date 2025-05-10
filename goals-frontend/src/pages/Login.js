import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Dados enviados para login:', { email, senha });

      // Envia os dados corretamente
      const response = await api.post('/auth/login', { email, senha });
      console.log('Resposta do login:', response.data);

      localStorage.setItem('token', response.data.token);
      setMessage('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login:', error);

      if (error.response) {
        const errorMessage = error.response.data.error || 'Erro desconhecido';
        setMessage('Erro ao fazer login: ' + errorMessage);
      } else {
        setMessage('Erro ao fazer login: Servidor não respondeu.');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
        />
        <button type="submit">Entrar</button>
      </form>
      {message && <p>{message}</p>}
      <p>Não tem uma conta? <Link to="/cadastro">Cadastre-se aqui</Link></p>
    </div>
  );
}

export default Login;
