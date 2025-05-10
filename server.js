import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Importando as rotas
import userRoutes from "./src/routes/userRoutes.js";
import goalRoutes from "./src/routes/goalRoutes.js";
import commentRoutes from "./src/routes/commentRoutes.js";
import incentiveRoutes from "./src/routes/incentiveRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import transactionRoutes from "./src/routes/transactionRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ["http://localhost:3000", "https://goals-eta.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Permitir envio de cookies e credenciais
};

app.use(cors(corsOptions));
app.use(express.json());

// Rotas da API
app.use("/api/usuarios", userRoutes);
app.use("/api/metas", goalRoutes);
app.use("/api/comentarios", commentRoutes);
app.use("/api/incentivos", incentiveRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/transacoes", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
