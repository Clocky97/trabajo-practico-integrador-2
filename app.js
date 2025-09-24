import express from "express";
import { connectDB } from "./src/config/database.js";
import dotenv from "dotenv";
import userRoutes from "./src/routes/user.routes.js";
import articleRoutes from "./src/routes/article.routes.js";
import commentRoutes from "./src/routes/comment.routes.js";
import tagRoutes from "./src/routes/tags.routes.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1212;

//Conectar a la base de datos
connectDB();

//Middlewares
app.use(cors());
app.use(express.json());

//Rutas
app.use("/api", userRoutes);
app.use("/api", articleRoutes);
app.use("/api", commentRoutes);
app.use("/api", tagRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});