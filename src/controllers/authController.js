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

export const registerUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const { data: existente } = await supabase
    .from("usuario")
    .select("*")
    .eq("email", email)
    .single();

  if (existente) {
    return res.status(409).json({ error: "E-mail já cadastrado." });
  }

  const { error } = await supabase
    .from("usuario")
    .insert([{ nome, email, senha }]);

  if (error) {
    return res.status(500).json({ error: "Erro ao cadastrar usuário." });
  }

  res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
};
