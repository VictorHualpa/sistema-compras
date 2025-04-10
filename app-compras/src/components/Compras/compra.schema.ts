import { z } from "zod";

export const cabeceraSchema = z.object({
  cod_proveedor: z.string().min(1, "El proveedor es requerido"),
  num_documento: z.string().min(1, "Número de documento es requerido"),
  fec_emision: z.string().min(1, "Fecha de emisión es requerida"),
  fec_entrega: z.string().min(1, "Fecha de entrega es requerida"),
});

export const detalleSchema = z.object({
  cod_producto: z.string().min(1, "Producto requerido"),
  cantidad: z.number().positive("Debe ser mayor a cero"),
  precio_unitario: z.number().nonnegative("Debe ser un número positivo"),
});

export const compraSchema = z.object({
  cabecera: cabeceraSchema,
  detalle: z.array(detalleSchema).min(1, "Debe tener al menos un producto"),
});
