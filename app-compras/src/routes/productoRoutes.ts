import { Router } from "express";
import {
  listarProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from "../controllers/productoController";
import { verificarToken } from "../middlewares/auth";

const router = Router();

router.get("/productos", verificarToken, listarProductos);
router.post("/productos", verificarToken, crearProducto);
router.put("/productos/:id", verificarToken, actualizarProducto);
router.delete("/productos/:id", verificarToken, eliminarProducto);

export default router;
