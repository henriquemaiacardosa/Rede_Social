import { supabase } from "../config/supabaseClient.js";


export const createGoal = async (req, res) => {
  const { titulo, descricao, data_criacao } = req.body;
  const usuario_id = req.usuario.id; 

  if (!titulo || !descricao || !data_criacao) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const { data, error } = await supabase
    .from("meta")
    .insert([{ titulo, descricao, data_criacao, usuario_id }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ message: "Meta criada com sucesso!", data });
};

// 🔍 Listar todas as metas
export const getGoals = async (req, res) => {
  const { data, error } = await supabase.from("meta").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

// 🔍 Buscar meta por ID
export const getGoalById = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("meta")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

// 📝 Atualizar meta
export const updateGoal = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, data_criacao } = req.body;

  const { data, error } = await supabase
    .from("meta")
    .update({ titulo, descricao, data_criacao })
    .eq("id", id)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: "Meta atualizada com sucesso", data });
};

// 🗑️ Deletar meta
export const deleteGoal = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from("meta").delete().eq("id", id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: "Meta deletada com sucesso" });
};
