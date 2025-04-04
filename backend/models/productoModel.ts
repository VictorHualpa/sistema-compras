import { pool } from '../db';  

export const obtenerProductos = async () => {
  const result = await pool.query('SELECT * FROM "Compras".tbproducto ORDER BY id');
  return result.rows;
};

export const obtenerProductoPorId = async (id: number) => {
  const result = await pool.query('SELECT * FROM "Compras".tbproducto WHERE id = $1', [id]);
  return result.rows[0];
};

export const crearProducto = async (
  nombre: string,
  descripcion: string,
  precio: number,
  stock: number
) => {
  const result = await pool.query(
    `INSERT INTO "Compras".tbproducto (nombre, descripcion, precio, stock)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [nombre, descripcion, precio, stock]
  );
  return result.rows[0];
};

export const actualizarProducto = async (
  id: number,
  nombre: string,
  descripcion: string,
  precio: number,
  stock: number
) => {
  const result = await pool.query(
    `UPDATE "Compras".tbproducto
     SET nombre = $1, descripcion = $2, precio = $3, stock = $4
     WHERE id = $5 RETURNING *`,
    [nombre, descripcion, precio, stock, id]
  );
  return result.rows[0];
};

export const eliminarProducto = async (id: number) => {
  const result = await pool.query('DELETE FROM "Compras".tbproducto WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};
