import { supabase } from "../config/supabaseClient.js";

// Criar incentivo (protegido contra duplicação)
export const createIncentive = async (req, res) => {
  const { meta_id } = req.body;
  const usuario_id = req.usuario.id;

  if (!meta_id) {
    return res.status(400).json({ error: "meta_id é obrigatório" });
  }

  // Verifica se já existe incentivo
  const { data: existente, error: errorBusca } = await supabase
    .from("incentivo")
    .select("*")
    .eq("usuario_id", usuario_id)
    .eq("meta_id", meta_id)
    .single();

  if (errorBusca && errorBusca.code !== "PGRST116") {
    return res.status(500).json({ error: "Erro ao verificar incentivo existente" });
  }

  if (existente) {
    return res.status(400).json({ error: "Você já apoiou esta meta" });
  }

  const { data, error } = await supabase
    .from("incentivo")
    .insert([{ usuario_id, meta_id }])
    .select();

  if (error) {
    console.error("Erro ao criar incentivo:", error);
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ message: "Incentivo criado com sucesso", data });
};

// Listar todos os incentivos
export const getIncentives = async (req, res) => {
  const { data, error } = await supabase
    .from("incentivo")
    .select("*");

  if (error) {
    console.error("Erro ao buscar incentivos:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

// Buscar incentivos por meta
export const getIncentivesByMeta = async (req, res) => {
  const { meta_id } = req.params;

  const { data, error } = await supabase
    .from("incentivo")
    .select("usuario_id")
    .eq("meta_id", meta_id);

  if (error) {
    console.error("Erro ao buscar incentivos da meta:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
};

// Deletar incentivo (opcional)
export const deleteIncentive = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("incentivo")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Erro ao deletar incentivo:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: "Incentivo deletado com sucesso" });
};
