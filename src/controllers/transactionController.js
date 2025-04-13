import { supabase } from "../config/supabaseClient.js";

export const comentarEAtualizarMeta = async (req, res) => {
  const { meta_id, conteudo } = req.body;
  const usuario_id = req.usuario.id;

  if (!conteudo || !meta_id) {
    return res.status(400).json({ error: "Conteúdo e meta_id são obrigatórios" });
  }

  try {
    //  Criar comentário
    const { error: commentError } = await supabase
      .from("comentario")
      .insert([{ conteudo, usuario_id, meta_id }]);

    if (commentError) throw commentError;

    // Chamar a função do Supabase para incrementar contador
    const { error: updateError } = await supabase
      .rpc("incrementa_comentarios", { metaid: meta_id });

    if (updateError) throw updateError;

    res.status(201).json({ message: "Comentário adicionado e meta atualizada!" });
  } catch (error) {
    console.error("Erro na transação:", error);
    res.status(500).json({ error: error.message || "Erro desconhecido" });
  }
};
