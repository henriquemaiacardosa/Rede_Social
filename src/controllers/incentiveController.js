import { supabase } from "../config/supabaseClient.js";


export const createIncentive = async (req, res) => {
    const { usuario_id, meta_id, data_criacao } = req.body;

    if (!usuario_id || !meta_id) {
        return res.status(400).json({ error: "usuario_id e meta_id são obrigatórios" });
    }

    const { data, error } = await supabase
        .from("incentivo")
        .insert([{ usuario_id, meta_id, data_criacao }])
        .select();

    if (error) {
        console.error("Erro ao criar incentivo:", error);
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: "Incentivo criado com sucesso", data });
};


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


export const getIncentivesByMeta = async (req, res) => {
    const { meta_id } = req.params;

    const { data, error } = await supabase
        .from("incentivo")
        .select("*")
        .eq("meta_id", meta_id);

    if (error) {
        console.error("Erro ao buscar incentivos da meta:", error);
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
};


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
