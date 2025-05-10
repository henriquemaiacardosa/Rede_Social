import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Importa as rotas de autenticação
import authRoutes from "./src/routes/authRoutes.js"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ["http://localhost:3000", "https://goals-eta.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Permitir cookies
};

app.use(cors(corsOptions));
app.use(express.json());

// Rotas de autenticação
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
