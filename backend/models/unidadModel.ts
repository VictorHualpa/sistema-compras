import { pool } from '../db';
const limpiarCampo = (valor: any) => (valor === "" ? null : valor);

export const listarUnidades = async () =>
  (await pool.query('SELECT * FROM "Compras".unidad_medida ORDER BY cod_unidad')).rows;

export const obtenerUnidad = async (cod: string) =>
  (await pool.query('SELECT * FROM "Compras".unidad_medida WHERE cod_unidad = $1', [cod])).rows[0];

export const crearUnidad = async (data: any) => {
  const result = await pool.query(
    `INSERT INTO "Compras".unidad_medida (
      cod_unidad, dsc_unidad, pso_refenc, cnt_bultos, flg_replica,
      cod_usuario_c, fch_crea, cod_usuario_m, fch_mod
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [
      data.cod_unidad,
      data.dsc_unidad,
      data.pso_refenc,
      data.cnt_bultos,
      data.flg_replica,
      data.cod_usuario_c,
      limpiarCampo(data.fch_crea),
      data.cod_usuario_m,
      limpiarCampo(data.fch_mod),
    ]
  );
  return result.rows[0];
};




export const actualizarUnidad = async (cod: string, data: any) =>
  (await pool.query(
    `UPDATE "Compras".unidad_medida
     SET dsc_unidad=$1, pso_refenc=$2, cnt_bultos=$3, flg_replica=$4,
         cod_usuario_m=$5, fch_mod=$6
     WHERE cod_unidad=$7 RETURNING *`,
    [
      data.dsc_unidad,
      data.pso_refenc,
      data.cnt_bultos,
      data.flg_replica,
      data.cod_usuario_m,
      data.fch_mod,
      cod,
    ]
  )).rows[0];

export const eliminarUnidad = async (cod: string) =>
  (await pool.query('DELETE FROM "Compras".unidad_medida WHERE cod_unidad = $1 RETURNING *', [cod])).rows[0];
