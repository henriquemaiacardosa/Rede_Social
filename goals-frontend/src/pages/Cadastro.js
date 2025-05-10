import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

function Cadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Log para verificar a URL da API
  console.log('URL da API:', process.env.REACT_APP_API_URL);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Enviando os dados no formato correto
      const response = await api.post('/usuarios', {
        name: name,
        email: email,
        password: password,
      });

      console.log('Resposta do cadastro:', response.data);
      setMessage('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);

      if (error.response) {
        // Verifica se há uma mensagem de erro específica
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
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Cadastro</h2>
      <form onSubmit={handleRegister} style={{ display: 'inline-block' }}>
        <div>
          <input 
            type="text" 
            placeholder="Nome" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            style={{ margin: '5px', padding: '8px', width: '250px' }}
          />
        </div>
        <div>
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ margin: '5px', padding: '8px', width: '250px' }}
          />
        </div>
        <div>
          <input 
            type="password" 
            placeholder="Senha" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ margin: '5px', padding: '8px', width: '250px' }}
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
