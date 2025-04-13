import { supabase } from "../config/supabaseClient.js";


export const createUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const { data, error } = await supabase
        .from("usuario")
        .insert([{ nome, email, senha }])
        .select();

    if (error) {
        console.error("Erro ao criar usuário:", error);
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: "Usuário criado com sucesso", data });
};


export const getUsers = async (req, res) => {
    const { data, error } = await supabase.from("usuario").select("*");

    if (error) {
        console.error("Erro ao buscar usuários:", error);
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    console.log("ID recebido:", id); // Log para debug

    const { data, error } = await supabase
        .from("usuario") // Verifique se o nome da tabela está correto
        .select("*")
        .eq("id", id)
        .single(); 

    if (error) {
        console.error("Erro ao buscar usuário:", error.message);
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
};


export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    if (!id) {
        return res.status(400).json({ error: "ID do usuário é obrigatório" });
    }

    const { data, error } = await supabase
        .from("usuario")
        .update({ nome, email, senha })
        .eq("id", id)
        .select();

    if (error) {
        console.error("Erro ao atualizar usuário:", error);
        return res.status(500).json({ error: error.message });
    }

    res.json({ message: "Usuário atualizado com sucesso", data });
};


export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "ID do usuário é obrigatório" });
    }

    const { error } = await supabase.from("usuario").delete().eq("id", id);

    if (error) {
        console.error("Erro ao deletar usuário:", error);
        return res.status(500).json({ error: error.message });
    }

    res.json({ message: "Usuário deletado com sucesso" });
};

