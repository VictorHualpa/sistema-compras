import { pool } from '../db';

const limpiarCampo = (valor: any) => (valor === "" ? null : valor);

//Listar todas las marcas
export const listarMarcas = async () =>
  (await pool.query('SELECT * FROM "Compras".marca ORDER BY cod_marca')).rows;

//Obtener una marca por código
export const obtenerMarca = async (cod: string) =>
  (await pool.query('SELECT * FROM "Compras".marca WHERE cod_marca = $1', [cod])).rows[0];

//Crear una nueva marca
export const crearMarca = async (data: any) => {
  const result = await pool.query(
    `INSERT INTO "Compras".marca (
      cod_familia, cod_marca, dsc_marca, flg_replica,
      cod_usuario_c, fch_crea, cod_usuario_m, fch_mod
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [
      data.cod_familia,
      data.cod_marca,
      data.dsc_marca,
      data.flg_replica,
      data.cod_usuario_c,
      limpiarCampo(data.fch_crea),
      data.cod_usuario_m,
      limpiarCampo(data.fch_mod),
    ]
  );
  return result.rows[0];
};

//Actualizar una marca
export const actualizarMarca = async (cod: string, data: any) =>
  (await pool.query(
    `UPDATE "Compras".marca
     SET cod_familia = $1,
         dsc_marca = $2,
         flg_replica = $3,
         cod_usuario_m = $4,
         fch_mod = $5
     WHERE cod_marca = $6 RETURNING *`,
    [
      data.cod_familia,
      data.dsc_marca,
      data.flg_replica,
      data.cod_usuario_m,
      limpiarCampo(data.fch_mod),
      cod,
    ]
  )).rows[0];

//Eliminar una marca
export const eliminarMarca = async (cod: string) =>
  (await pool.query('DELETE FROM "Compras".marca WHERE cod_marca = $1 RETURNING *', [cod])).rows[0];
