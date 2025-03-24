import { supabase } from "../config/supabaseClient.js";

// Criação do usuário
export const createUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const { data, error } = await supabase
        .from("usuario") // Nome da tabela corrigido
        .insert([{ nome, email, senha }]);

    if (error) {
        console.error("Erro ao criar usuário:", error);
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ message: "Usuário criado com sucesso", data });
};

// listagem de usuarios apenas pelo nome
export const getUsers = async (req, res) => {
    const { nome } = req.query; //pPega o parâmetro "nome" da URL

    let query = supabase.from("usuario").select("*");

    if (nome) {
        query = query.ilike("nome", `%${nome}%`); // busca nomes que contenham o termo
    }

    const { data, error } = await query;

    if (error) {
        console.error("Erro ao buscar usuários:", error);
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
};


// Atualiza usuário
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    if (!id) {
        return res.status(400).json({ error: "ID do usuário é obrigatório" });
    }

    const { data, error } = await supabase
        .from("usuario") // Nome da tabela corrigido
        .update({ nome, email, senha })
        .eq("id", id);

    if (error) {
        console.error("Erro ao atualizar usuário:", error);
        return res.status(500).json({ error: error.message });
    }

    res.json({ message: "Usuário atualizado com sucesso", data });
};

// Deleta usuário pelo ID
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
