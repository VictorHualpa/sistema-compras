import { Router } from "express";
import * as proveedorCtrl from "../controllers/proveedorController";
import { verificarToken } from "../middleware/auth";

const router = Router();

router.get("/", verificarToken, proveedorCtrl.listar);
router.get("/:id", verificarToken, proveedorCtrl.obtener);
router.post("/", verificarToken, proveedorCtrl.crear);
router.put("/:id", verificarToken, proveedorCtrl.actualizar);
router.delete("/:id", verificarToken, proveedorCtrl.eliminar);

export default router;
