import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./src/routes/userRoutes.js";
import goalRoutes from "./src/routes/goalRoutes.js"; // Importa as rotas de metas
import commentRoutes from "./src/routes/commentRoutes.js";
import incentiveRoutes from "./src/routes/incentiveRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas da API
app.use("/api/usuarios", userRoutes);  // CRUD de usuários
app.use("/api/metas", goalRoutes);     // CRUD de metas (goals)
app.use("/api/comentarios", commentRoutes);
app.use("/api/incentivos", incentiveRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
