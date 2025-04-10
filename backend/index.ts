import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan"; // 👉 Para logs de desarrollo (opcional pero útil)
 
// Rutas 
import usuarioRoutes from "./routes/usuarioRoutes";
import productoRoutes from "./routes/productoRoutes";
import unidadRoutes from "./routes/unidadRoutes";
import marcaRoutes from "./routes/marcaRoutes";
import familiaRoutes from "./routes/familiaRoutes";
import paisRoutes from "./routes/paisRoutes";
import compraRoutes from "./routes/compraRoutes";
import proveedorRoutes from "./routes/proveedorRoutes";

dotenv.config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // 👉 Recomendado en desarrollo

// Prefijo para todas las rutas
app.use("/api", usuarioRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/unidades", unidadRoutes);
app.use("/api/marcas", marcaRoutes);
app.use("/api/familias", familiaRoutes);
app.use("/api/pais", paisRoutes);
app.use("/api/compras", compraRoutes);
app.use("/api/proveedores", proveedorRoutes);

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`);
});
