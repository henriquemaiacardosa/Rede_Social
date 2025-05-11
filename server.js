import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"; 
import userRoutes from "./routes/userRoutes.js"; 
import goalRoutes from "./routes/goalRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ["http://localhost:3000", "https://goals-eta.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/goals", goalRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
