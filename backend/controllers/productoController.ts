import { Request, Response } from 'express';
import * as modelo from '../models/productoModel';

export const listar = async (_req: Request, res: Response) => {
  const productos = await modelo.obtenerProductos();
  res.json(productos);
};

export const obtener = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      // Aquí deberías tener el modelo importado, por ejemplo:
      // const producto = await productoModel.obtenerProductoPorId(id);
      res.json({ id }); // solo para pruebas
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener producto' });
    }
  };

export const crear = async (req: Request, res: Response) => {
  const { nombre, descripcion, precio, stock } = req.body;
  const nuevo = await modelo.crearProducto(nombre, descripcion, precio, stock);
  res.status(201).json(nuevo);
};

export const actualizar = async (req: Request, res: Response) => {
  const { nombre, descripcion, precio, stock } = req.body;
  const actualizado = await modelo.actualizarProducto(Number(req.params.id), nombre, descripcion, precio, stock);
  res.json(actualizado);
};

export const eliminar = async (req: Request, res: Response) => {
  const eliminado = await modelo.eliminarProducto(Number(req.params.id));
  res.json(eliminado);
};
