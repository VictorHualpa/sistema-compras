import { pool } from "../db";

export const obtenerFamilias = async () => {
  const result = await pool.query("SELECT * FROM \"Compras\".familia ORDER BY cod_familia");
  return result.rows;
};

export const obtenerFamilia = async (id: string) => {
  const result = await pool.query("SELECT * FROM \"Compras\".familia WHERE cod_familia = $1", [id]);
  return result.rows[0];
};

export const crearFamilia = async (familia: any) => {
  const {
    cod_familia, dsc_familia, cst_unit_prom, flg_sis_fam,
    corr_subfam, cst_unit_cif, flg_replica, cod_usuario_c, fch_crea
  } = familia;

  const query = `INSERT INTO "Compras".familia
    (cod_familia, dsc_familia, cst_unit_prom, flg_sis_fam, corr_subfam,
     cst_unit_cif, flg_replica, cod_usuario_c, fch_crea)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`;

  const values = [
    cod_familia, dsc_familia, cst_unit_prom, flg_sis_fam,
    corr_subfam, cst_unit_cif, flg_replica, cod_usuario_c, fch_crea
  ];

  await pool.query(query, values);
};

export const actualizarFamilia = async (id: string, familia: any) => {
  const {
    dsc_familia, cst_unit_prom, flg_sis_fam,
    corr_subfam, cst_unit_cif, flg_replica, cod_usuario_c, fch_crea
  } = familia;

  const query = `UPDATE "Compras".familia SET
    dsc_familia=$1, cst_unit_prom=$2, flg_sis_fam=$3, corr_subfam=$4,
    cst_unit_cif=$5, flg_replica=$6, cod_usuario_c=$7, fch_crea=$8
    WHERE cod_familia=$9`;

  const values = [
    dsc_familia, cst_unit_prom, flg_sis_fam,
    corr_subfam, cst_unit_cif, flg_replica, cod_usuario_c, fch_crea, id
  ];

  await pool.query(query, values);
};

export const eliminarFamilia = async (id: string) => {
  await pool.query("DELETE FROM \"Compras\".familia WHERE cod_familia = $1", [id]);
};