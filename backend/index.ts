import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usuarioRoutes from "./routes/usuarioRoutes";
import productoRoutes from './routes/productoRoutes';
import unidadRoutes from './routes/unidadRoutes';
import marcaRoutes from './routes/marcaRoutes';
import familiaRoutes from './routes/familiaRoutes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", usuarioRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/unidades', unidadRoutes);
app.use('/api/marcas', marcaRoutes);
app.use('/api/familias', familiaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
