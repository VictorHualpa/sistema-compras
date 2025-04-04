import { Request, Response } from "express";
import * as Familia from "../models/familiaModel";

export const listar = async (_req: Request, res: Response) => {
  const data = await Familia.obtenerFamilias();
  res.json(data);
};

export const obtener = async (req: Request, res: Response): Promise<void> => {
  const data = await Familia.obtenerFamilia(req.params.id);
  if (!data) {
    res.status(404).json({ mensaje: "Unidad no encontrada" });
    return;
  }
  res.json(data);
};
 
export const crear = async (req: Request, res: Response) => {
  try {
    await Familia.crearFamilia(req.body);
    res.json({ mensaje: "Familia creada" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear familia", error });
  }
};

export const actualizar = async (req: Request, res: Response) => {
  try {
    await Familia.actualizarFamilia(req.params.id, req.body);
    res.json({ mensaje: "Familia actualizada" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar familia", error });
  }
};

export const eliminar = async (req: Request, res: Response) => {
  try {
    await Familia.eliminarFamilia(req.params.id);
    res.json({ mensaje: "Familia eliminada" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar familia", error });
  }
};