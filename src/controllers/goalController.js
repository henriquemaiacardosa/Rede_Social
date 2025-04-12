import { supabase } from "../config/supabaseClient.js";

// Criação de uma meta
export const createGoal = async (req, res) => {
    const { titulo, descricao, data_criacao, usuario_id } = req.body;

    if (!titulo || !usuario_id) {
        return res.status(400).json({ error: "Título e usuário_id são obrigatórios" });
    }

    const { data, error } = await supabase
        .from("meta")
        .insert([{ titulo, descricao, data_criacao, usuario_id }])
        .select();

    if (error) {
        console.error("Erro ao criar meta:", error);
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: "Meta criada com sucesso", data });
};

// Lista todas as metas
export const getGoals = async (req, res) => {
    const { data, error } = await supabase.from("meta").select("*");

    if (error) {
        console.error("Erro ao buscar metas:", error);
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
};

// Busca meta por ID
export const getGoalById = async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from("meta")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Erro ao buscar meta:", error);
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
};

// Atualiza uma meta
export const updateGoal = async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, data_criacao } = req.body;

    const { data, error } = await supabase
        .from("meta")
        .update({ titulo, descricao, data_criacao })
        .eq("id", id)
        .select();

    if (error) {
        console.error("Erro ao atualizar meta:", error);
        return res.status(500).json({ error: error.message });
    }

    res.json({ message: "Meta atualizada com sucesso", data });
};

// Deleta uma meta
export const deleteGoal = async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase.from("meta").delete().eq("id", id);

    if (error) {
        console.error("Erro ao deletar meta:", error);
        return res.status(500).json({ error: error.message });
    }

    res.json({ message: "Meta deletada com sucesso" });
};
