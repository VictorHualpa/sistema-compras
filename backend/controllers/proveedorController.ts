import { Request, Response } from "express";
import * as ProveedorModel from "../models/proveedorModel";

// ✅ Listar
export const listar = async (_req: Request, res: Response): Promise<void> => {
  try {
    const proveedores = await ProveedorModel.obtenerProveedores();
    res.status(200).json(proveedores);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al listar proveedores", error });
  }
};

// ✅ Obtener
export const obtener = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const proveedor = await ProveedorModel.obtenerProveedorPorId(Number(id));

    if (!proveedor) {
      res.status(404).json({ mensaje: "Proveedor no encontrado" });
      return;
    }

    res.status(200).json(proveedor);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener proveedor", error });
  }
};

export const crear = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ruc, telefono } = req.body;

    const errores: Record<string, string> = {};

    // Validación de RUC duplicado
    const yaExiste = await ProveedorModel.existeRuc(ruc);
    if (yaExiste) {
      errores.ruc = "Este RUC ya fue registrado";
    }

    // Validación de teléfono: debe tener exactamente 9 dígitos
    const telefonoRegex = /^\d{9}$/;
    if (!telefonoRegex.test(telefono)) {
      errores.telefono = "El teléfono debe tener exactamente 9 dígitos";
    }

    // Si hay errores, los retornamos al frontend
    if (Object.keys(errores).length > 0) {
      res.status(400).json({
        mensaje: "Error de validación",
        errores,
      });
      return;
    }

    const nuevoProveedor = await ProveedorModel.crearProveedor(req.body);
    res.status(201).json(nuevoProveedor);
  } catch (error) {
    console.error("❌ Error en crear proveedor:", error);
    res.status(500).json({ mensaje: "Error al registrar proveedor", error });
  }
};





// ✅ Actualizar
export const actualizar = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const usuario = (req as any).usuario?.id || "anon";

    const actualizado = await ProveedorModel.actualizarProveedor(id, {
      ...req.body,
      cod_usuario_m: usuario,
    });

    res.status(200).json(actualizado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar proveedor", error });
  }
};

// ✅ Eliminar
export const eliminar = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    await ProveedorModel.eliminarProveedor(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar proveedor", error });
  }
};
