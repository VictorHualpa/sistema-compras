import { pool } from "../db";

export const obtenerProveedores = async () => {
  const result = await pool.query('SELECT * FROM "Compras".tbproveedor ORDER BY id DESC');
  return result.rows;
};

export const obtenerProveedorPorId = async (id: number) => {
  const result = await pool.query('SELECT * FROM "Compras".tbproveedor WHERE id = $1', [id]);
  return result.rows[0];
};

export const existeRuc = async (ruc: string) => {
  const result = await pool.query('SELECT 1 FROM "Compras".tbproveedor WHERE ruc = $1', [ruc]);
  return result && result.rowCount !== null && result.rowCount > 0;
};

export const crearProveedor = async (data: any) => {
  const { ruc, razon_social, direccion, telefono, correo, cod_usuario_c } = data;

  const result = await pool.query(
    `INSERT INTO "Compras".tbproveedor 
     (ruc, razon_social, direccion, telefono, correo, cod_usuario_c)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [ruc, razon_social, direccion, telefono, correo, cod_usuario_c]
  );

  return result.rows[0];
};


export const actualizarProveedor = async (id: number, data: any) => {
  const { ruc, razon_social, direccion, telefono, cod_usuario_m } = data;

  const result = await pool.query(
    `UPDATE "Compras".tbproveedor
     SET ruc = $1, razon_social = $2, direccion = $3, telefono = $4, cod_usuario_m = $5, fch_mod = NOW()
     WHERE id = $6 RETURNING *`,
    [ruc, razon_social, direccion, telefono, cod_usuario_m, id]
  );

  return result.rows[0];
};

export const eliminarProveedor = async (id: number) => {
  await pool.query('DELETE FROM "Compras".tbproveedor WHERE id = $1', [id]);
};
 