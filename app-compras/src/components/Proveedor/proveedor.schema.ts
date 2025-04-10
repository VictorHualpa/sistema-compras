// src/components/Proveedor/proveedor.schema.ts
import { z } from "zod";

export const proveedorSchema = z.object({
  razon_social: z.string().min(3, "La razón social es obligatoria"),
  ruc: z.string().min(11, "El RUC debe tener 11 caracteres"),
  direccion: z.string().optional(),
  telefono: z.string().optional(),
  correo: z.string().email("Correo no válido").optional(),
  estado: z.boolean().optional(),
});
