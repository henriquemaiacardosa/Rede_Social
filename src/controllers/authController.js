import { supabase } from "../config/supabaseClient.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }

  const { data: usuario, error } = await supabase
    .from("usuario")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !usuario) {
    return res.status(401).json({ error: "Usuário não encontrado" });
  }

  if (usuario.senha !== senha) {
    return res.status(401).json({ error: "Senha incorreta" });
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.status(200).json({ message: "Login realizado com sucesso!", token });
};