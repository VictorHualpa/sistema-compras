import { Request, Response } from 'express';
import * as model from '../models/marcaModel';
 
export const listar = async (_req: Request, res: Response): Promise<void> => {
    const data = await model.listarMarcas();
    res.json(data);
  };

  // GET /api/marcas/:id
export const obtener = async (req: Request, res: Response): Promise<void> => {
    const data = await model.obtenerMarca(req.params.id);
    if (!data) {
      res.status(404).json({ mensaje: "Marca no encontrada" });
      return;
    }
    res.json(data);
  };
  
  // POST /api/marcas
  export const crear = async (req: Request, res: Response): Promise<void> => {
    try {
      const nuevaMarca = await model.crearMarca(req.body);
      res.status(201).json(nuevaMarca);
    } catch (error) {
      console.error("Error al crear marca:", error); // 👈 esto lo verás en consola
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  };

  
  // PUT /api/marcas/:id
  export const actualizar = async (req: Request, res: Response): Promise<void> => {
    const actualizada = await model.actualizarMarca(req.params.id, req.body);
    if (!actualizada) {
      res.status(404).json({ mensaje: "Marca no encontrada para actualizar" });
      return;
    }
    res.json(actualizada);
  };
  
  // DELETE /api/marcas/:id
  export const eliminar = async (req: Request, res: Response): Promise<void> => {
    const eliminada = await model.eliminarMarca(req.params.id);
    if (!eliminada) {
      res.status(404).json({ mensaje: "Marca no encontrada para eliminar" });
      return;
    }
    res.json(eliminada);
  };

 