import { supabase } from './supabase.js';

async function testConnection() {
  const { data, error } = await supabase.from('usuario').select('*');

  if (error) {
    console.error('Erro ao conectar ao banco:', error.message);
  } else {
    console.log('Conexão bem-sucedida! Usuários:', data);
  }
}

