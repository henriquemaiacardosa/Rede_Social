import { supabase } from "../config/supabaseClient.js";


export const createComment = async (req, res) => {
  const usuario_id = req.usuario.id;
  const { meta_id, conteudo, data_criacao } = req.body;

  if (!meta_id || !conteudo) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const { data, error } = await supabase
    .from("comentario")
    .insert([{ usuario_id, meta_id, conteudo, data_criacao }])
    .select();

  if (error) {
    console.error("Erro ao criar comentário:", error);
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ message: "Comentário criado com sucesso", data });
};


// Lista todos os comentários
export const getComments = async (req, res) => {
    const { data, error } = await supabase
        .from("comentario")
        .select("*");

    if (error) {
        console.error("Erro ao buscar comentários:", error);
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
};

// Lista comentários de uma meta
export const getCommentsByMetaId = async (req, res) => {
    const { meta_id } = req.params;

    const { data, error } = await supabase
        .from("comentario")
        .select("*")
        .eq("meta_id", meta_id);

    if (error) {
        console.error("Erro ao buscar comentários da meta:", error);
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
};

// Atualiza comentário
export const updateComment = async (req, res) => {
    const { id } = req.params;
    const { conteudo } = req.body;

    const { data, error } = await supabase
        .from("comentario")
        .update({ conteudo })
        .eq("id", id)
        .select();

    if (error) {
        console.error("Erro ao atualizar comentário:", error);
        return res.status(500).json({ error: error.message });
    }

    res.json({ message: "Comentário atualizado com sucesso", data });
};

// Deleta comentário
export const deleteComment = async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from("comentario")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Erro ao deletar comentário:", error);
        return res.status(500).json({ error: error.message });
    }

    res.json({ message: "Comentário deletado com sucesso" });
};
