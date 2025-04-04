import { Router } from "express";
import { login } from "../controllers/usuarioController";
import { verificarToken } from "../middleware/auth";

const router = Router();

router.post("/login", login);

// ✅ Ruta protegida (¡Agrega esto!)
router.get("/perfil", verificarToken, (req, res) => {
  res.json({
    mensaje: "Acceso autorizado al perfil",
    usuario: (req as any).usuario,
  });
});

router.get("/protegido", verificarToken, (req, res) => {
  res.json({ mensaje: "Acceso autorizado", usuario: (req as any).usuario });
});

export default router;
