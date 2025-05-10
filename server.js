import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./src/routes/userRoutes.js";
import goalRoutes from "./src/routes/goalRoutes.js"; 
import commentRoutes from "./src/routes/commentRoutes.js";
import incentiveRoutes from "./src/routes/incentiveRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import transactionRoutes from "./src/routes/transactionRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',  
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],  
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use(express.json());

app.use("/api/usuarios", userRoutes); 
app.use("/api/metas", goalRoutes);     
app.use("/api/comentarios", commentRoutes);
app.use("/api/incentivos", incentiveRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/transacoes", transactionRoutes);

app.get("/", (req, res) => {
  res.send("API GOALS está rodando!");
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

app.use((err, req, res, next) => {
  console.error("Erro no servidor:", err.message);
  res.status(500).json({ message: "Erro no servidor" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
