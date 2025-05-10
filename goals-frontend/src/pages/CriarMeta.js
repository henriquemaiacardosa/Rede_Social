import React, { useState } from 'react';

function CriarMeta() {
  const [meta, setMeta] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Meta criada: ${meta}`);
  };

  return (
    <div>
      <h2>Criar Meta</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Descrição da Meta" 
          value={meta} 
          onChange={(e) => setMeta(e.target.value)} 
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default CriarMeta;
