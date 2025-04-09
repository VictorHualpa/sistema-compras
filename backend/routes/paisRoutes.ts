import { Router } from "express";
import * as controller from "../controllers/paisController";
import { verificarToken } from "../middleware/auth";

const router = Router();

// Todas las rutas protegidas con JWT
router.get("/", verificarToken, controller.obtenerTodos);
router.get("/:id", verificarToken, controller.obtenerPorId);
router.post("/", verificarToken, controller.crear);
router.put("/:id", verificarToken, controller.actualizar);
router.delete("/:id", verificarToken, controller.eliminar);

export default router;