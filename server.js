import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js"; 
import userRoutes from "./src/routes/userRoutes.js"; 
import goalRoutes from "./src/routes/goalRoutes.js";
import incentiveRoutes from "./src/routes/incentiveRoutes.js";
import commentRoutes from "./src/routes/commentRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: ["http://localhost:3000", "http://127.0.0.1:5500", "http://localhost:5500"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/incentive", incentiveRoutes);
app.use("/api/comment", commentRoutes);


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
export default app;
