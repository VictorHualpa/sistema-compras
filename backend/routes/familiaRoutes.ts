import { Router } from "express";
import * as controller from "../controllers/familiaController";
import { verificarToken } from "../middleware/auth";

const router = Router();
router.use(verificarToken); // 🔒 Aplica a TODAS las rutas de familia

router.get("/", controller.listar); 
router.get("/:id", controller.obtener);  
router.post("/", controller.crear);
router.put("/:id", controller.actualizar);
router.delete("/:id", controller.eliminar);

export default router;


 
 