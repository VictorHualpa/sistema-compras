import { pool } from '../db';

export const obtenerCompras = async () => {
  const result = await pool.query('SELECT * FROM "Compras".tbcompra_cabecera ORDER BY id DESC');
  return result.rows;
};

export const obtenerCompraPorId = async (id: number) => {
  const cabecera = await pool.query(
    'SELECT * FROM "Compras".tbcompra_cabecera WHERE id = $1',
    [id]
  );
  const detalle = await pool.query(
    'SELECT * FROM "Compras".tbcompra_detalle WHERE id_cabecera = $1',
    [id]
  );
  return {
    cabecera: cabecera.rows[0],
    detalle: detalle.rows,
  };
};

export const crearCompra = async (data: any) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const { cabecera, detalle } = data;

    // Inserta la cabecera de la compra
    const insertCab = await client.query(
      `INSERT INTO "Compras".tbcompra_cabecera
        (cod_proveedor, num_documento, fec_emision, fec_entrega, cod_usuario_c)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [
        Number(cabecera.cod_proveedor),
        cabecera.num_documento,
        cabecera.fec_emision,
        cabecera.fec_entrega,
        Number(cabecera.cod_usuario_c)
      ]
    );

    const id_cabecera = insertCab.rows[0].id;

    // Inserta el detalle
    for (const item of detalle) {
      await client.query(
        `INSERT INTO "Compras".tbcompra_detalle
          (id_cabecera, cod_producto, cantidad, precio_unitario)
         VALUES ($1, $2, $3, $4)`,
        [
          id_cabecera,
          Number(item.cod_producto),
          Number(item.cantidad),
          Number(item.precio_unitario)
        ]
      );
    }

    await client.query('COMMIT');
    return { id: id_cabecera };
  } catch (error: any) {
    console.error("Error detallado en backend:", error.message, error.stack);
    await client.query('ROLLBACK');
    throw error;
  }
   finally {
    client.release();
  }
};

export const eliminarCompra = async (id: number) => {
  await pool.query('DELETE FROM "Compras".tbcompra_cabecera WHERE id = $1', [id]);
};
