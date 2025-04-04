// 📁 routes/perfilRoutes.ts
import { Router } from "express";
import { verificarToken } from "../middleware/auth";

const router = Router();

router.get("/", verificarToken, (req, res) => {
  res.json({ mensaje: "Bienvenido a tu perfil privado", usuario: (req as any).usuario });
});

export default router;
