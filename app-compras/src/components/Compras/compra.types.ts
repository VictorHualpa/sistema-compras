// compra.types.ts
export interface CompraDetalle {
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
}

export interface Compra {
  id?: number;
  proveedor: string;
  fecha: string;
  estado: string;
  usuario_crea: string;
  fch_crea: string | null;
  detalles: CompraDetalle[];
}

export interface Producto {
  id: number;
  nombre: string;
}
