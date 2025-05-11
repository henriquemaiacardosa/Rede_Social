import { supabase } from "../config/supabaseClient.js";

export const createGoal = async (req, res) => {
  const { titulo, descricao } = req.body;
  const usuario_id = req.usuario.id;

  if (!titulo || !descricao) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const { data, error } = await supabase
    .from("meta")
    .insert([{ titulo, descricao, usuario_id }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ message: "Meta criada com sucesso!", data });
};

export const getGoals = async (req, res) => {
  const { data, error } = await supabase.from("meta").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

export const getUserGoals = async (req, res) => {
  const usuario_id = req.usuario.id;

  const { data, error } = await supabase
    .from("meta")
    .select("*")
    .eq("usuario_id", usuario_id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

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

export const updateGoal = async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao } = req.body;

  const { data, error } = await supabase
    .from("meta")
    .update({ titulo, descricao })
    .eq("id", id)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: "Meta atualizada com sucesso", data });
};

export const deleteGoal = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from("meta").delete().eq("id", id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: "Meta deletada com sucesso" });
};
