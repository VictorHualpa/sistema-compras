export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
}

export interface CompraDetalle {
  cod_producto: string;
  descripcion_producto?: string;
  cantidad: number;
  precio_unitario: number;
}

export interface CompraCabecera {
  cod_proveedor: string;
  num_documento: string;
  fec_emision: string;
  fec_entrega: string;
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
