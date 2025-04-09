import { Request, Response } from 'express';
import * as CompraModel from '../models/compraModel';

export const listar = async (_req: Request, res: Response) => {
  const compras = await CompraModel.obtenerCompras();
  res.json(compras);
};

export const obtener = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id);
  const compra = await CompraModel.obtenerCompraPorId(id);

  if (!compra.cabecera) {
    res.status(404).json({ mensaje: 'Compra no encontrada' });
    return; // 🔁 Aquí aseguras que la función termina
  }

  res.json(compra);
};


export const crear = async (req: Request, res: Response) => {
  try {
    const usuario = (req as any).usuario?.id || 'anon';
    const nuevaCompra = await CompraModel.crearCompra({
      ...req.body,
      cabecera: {
        ...req.body.cabecera,
        cod_usuario_c: usuario,
      },
    });
    res.status(201).json(nuevaCompra);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al registrar la compra', error: err });
  }
};

export const eliminar = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await CompraModel.eliminarCompra(id);
  res.status(204).send();
};