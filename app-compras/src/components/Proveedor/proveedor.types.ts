export interface Proveedor {
  id?: number;
  razon_social: string;
  ruc: string;
  direccion?: string;
  telefono?: string;
  correo?: string;
  estado?: boolean;
}