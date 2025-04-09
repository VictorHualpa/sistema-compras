// controllers/paisController.ts corregido
import { Request, Response } from "express";
import * as model from "../models/paisModel";

export const obtenerTodos = async (_req: Request, res: Response) => {
  try {
    const data = await model.obtenerPaises();
    res.json(data);
  } catch (error) {
    console.error("Error al obtener países:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const obtenerPorId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await model.obtenerPais(id);
    if (!data) {
      res.status(404).json({ error: "País no encontrado" });
      return;
    }
    res.json(data);
  } catch (error) {
    console.error("Error al obtener país:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const crear = async (req: Request, res: Response) => {
  try {
    const {
      cod_pais,
      nom_pais,
      nom_pais_en_ingles,
      flg_replica,
      cod_usuario_c,
      fch_crea,
      cod_usuario_m,
      fch_mod,
      flg_estado,
    } = req.body;

    if (!cod_pais || !nom_pais) {
      res.status(400).json({ error: "Código y nombre del país son obligatorios." });
      return;
    }

    const nuevoPais = await model.crearPais({
      cod_pais: cod_pais.trim(),
      nom_pais: nom_pais.trim(),
      nom_pais_en_ingles: nom_pais_en_ingles?.trim() || null,
      flg_replica: flg_replica?.trim() || null,
      cod_usuario_c: cod_usuario_c?.trim() || null,
      fch_crea: fch_crea || null,
      cod_usuario_m: cod_usuario_m?.trim() || null,
      fch_mod: fch_mod || null,
      flg_estado: flg_estado?.trim() || null,
    });

    res.json(nuevoPais);
  } catch (error) {
    console.error("Error al crear país:", error);
    res.status(500).json({ error: "Error en el servidor al crear el país" });
  }
};

export const actualizar = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const {
      nom_pais,
      nom_pais_en_ingles,
      flg_replica,
      cod_usuario_c,
      fch_crea,
      cod_usuario_m,
      fch_mod,
      flg_estado,
    } = req.body;

    const actualizado = await model.actualizarPais(id, {
      nom_pais: nom_pais?.trim(),
      nom_pais_en_ingles: nom_pais_en_ingles?.trim() || null,
      flg_replica: flg_replica?.trim() || null,
      cod_usuario_c: cod_usuario_c?.trim() || null,
      fch_crea: fch_crea || null,
      cod_usuario_m: cod_usuario_m?.trim() || null,
      fch_mod: fch_mod || null,
      flg_estado: flg_estado?.trim() || null,
    });

    res.json(actualizado);
  } catch (error) {
    console.error("Error al actualizar país:", error);
    res.status(500).json({ error: "Error en el servidor al actualizar el país" });
  }
};

export const eliminar = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await model.eliminarPais(id);
    res.json({ mensaje: "País eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar país:", error);
    res.status(500).json({ error: "Error en el servidor al eliminar el país" });
  }
};