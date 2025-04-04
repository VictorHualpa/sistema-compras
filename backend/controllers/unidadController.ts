import { Request, Response } from 'express';
import * as model from '../models/unidadModel';
 
export const listar = async (_req: Request, res: Response): Promise<void> => {
    const data = await model.listarUnidades();
    res.json(data);
  };

  // GET /api/unidades/:id
export const obtener = async (req: Request, res: Response): Promise<void> => {
    const data = await model.obtenerUnidad(req.params.id);
    if (!data) {
      res.status(404).json({ mensaje: "Unidad no encontrada" });
      return;
    }
    res.json(data);
  };
  
  // POST /api/unidades

  export const crear = async (req: Request, res: Response): Promise<void> => {
    try {
      const nuevaUnidad = await model.crearUnidad(req.body);
      res.status(201).json(nuevaUnidad);
    } catch (error) {
      console.error("Error al crear unidad:", error); // 👈 esto lo verás en consola
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  };

  
  // PUT /api/unidades/:id
  export const actualizar = async (req: Request, res: Response): Promise<void> => {
    const actualizada = await model.actualizarUnidad(req.params.id, req.body);
    if (!actualizada) {
      res.status(404).json({ mensaje: "Unidad no encontrada para actualizar" });
      return;
    }
    res.json(actualizada);
  };
  
  // DELETE /api/unidades/:id
  export const eliminar = async (req: Request, res: Response): Promise<void> => {
    const eliminada = await model.eliminarUnidad(req.params.id);
    if (!eliminada) {
      res.status(404).json({ mensaje: "Unidad no encontrada para eliminar" });
      return;
    }
    res.json(eliminada);
  };

 