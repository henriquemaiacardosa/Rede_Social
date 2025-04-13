import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const autenticarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded; // adiciona dados ao request
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido ou expirado" });
  }
};
