import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Si deseas acceder a los datos del usuario en req.usuario
export interface AuthRequest extends Request {
  usuario?: any;
}

// Middleware para verificar el token JWT
export const verificarToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(403).json({ mensaje: "Token requerido" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.usuario = decoded;
    next(); // continúa con la siguiente función en la ruta
  } catch (error) {
    res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
};
