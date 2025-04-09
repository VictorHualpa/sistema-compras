import { pool } from '../db';

export const obtenerPaises = async () => {
  const result = await pool.query('SELECT * FROM "Compras".pais ORDER BY cod_pais');
  return result.rows;
};

export const obtenerPais = async (id: string) => {
  const result = await pool.query('SELECT * FROM "Compras".pais WHERE cod_pais = $1', [id]);
  return result.rows[0];
};

export const crearPais = async (data: any) => {
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
  } = data;

  const result = await pool.query(
    `INSERT INTO "Compras".pais (
      cod_pais, nom_pais, nom_pais_en_ingles, flg_replica, cod_usuario_c, fch_crea, cod_usuario_m, fch_mod, flg_estado
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [
      cod_pais,
      nom_pais,
      nom_pais_en_ingles,
      flg_replica,
      cod_usuario_c,
      fch_crea,
      cod_usuario_m,
      fch_mod,
      flg_estado
    ]
  );
  return result.rows[0];
};

export const actualizarPais = async (id: string, data: any) => {
  const {
    nom_pais,
    nom_pais_en_ingles,
    flg_replica,
    cod_usuario_c,
    fch_crea,
    cod_usuario_m,
    fch_mod,
    flg_estado,
  } = data;

  const result = await pool.query(
    `UPDATE "Compras".pais SET
      nom_pais = $1,
      nom_pais_en_ingles = $2,
      flg_replica = $3,
      cod_usuario_c = $4,
      fch_crea = $5,
      cod_usuario_m = $6,
      fch_mod = $7,
      flg_estado = $8
    WHERE cod_pais = $9 RETURNING *`,
    [
      nom_pais,
      nom_pais_en_ingles,
      flg_replica,
      cod_usuario_c,
      fch_crea,
      cod_usuario_m,
      fch_mod,
      flg_estado,
      id
    ]
  );
  return result.rows[0];
};

export const eliminarPais = async (id: string) => {
  await pool.query('DELETE FROM "Compras".pais WHERE cod_pais = $1', [id]);
};
