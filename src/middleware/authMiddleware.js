import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const autenticarToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Acesso negado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = { id: decoded.id };
    next();
  } catch (error) {
    res.status(403).json({ error: "Token inválido" });
  }
};
