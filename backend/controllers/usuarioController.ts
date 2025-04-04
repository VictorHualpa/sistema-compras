import { Request, Response } from "express";
import { pool } from "../db";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { nombre, apellido } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM "Compras"."tbusuario" WHERE nombre = $1 AND apellido = $2',
      [nombre, apellido]
    );

    if (result.rows.length === 0) {
      res.status(401).json({ mensaje: "Usuario no encontrado" });
      return;
    }

    const usuario = result.rows[0];
    const token = jwt.sign(
      { 
        id: usuario.id, 
        nombre: usuario.nombre },
        process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    //res.status(200).json({ token });
    res.status(200).json({
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
      },
    });
    
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
