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

app.use(cors());
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
