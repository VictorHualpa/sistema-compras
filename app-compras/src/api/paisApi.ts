import { Pais } from "../components/Pais/pais.types";

const API_URL = "http://192.168.1.49:5000/api/pais";

const headers = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

export const obtenerPaises = async (): Promise<Pais[]> => {
  const res = await fetch(API_URL, { headers: headers() });
  const data = await res.json();
  return data.map((p: any) => ({
    ...p,
    cod_pais: p.cod_pais?.trim(),
    nom_pais: p.nom_pais?.trim(),
    nom_pais_en_ingles: p.nom_pais_en_ingles?.trim(),
    flg_replica: p.flg_replica?.trim(),
    cod_usuario_c: p.cod_usuario_c?.trim(),
    cod_usuario_m: p.cod_usuario_m?.trim(),
    flg_estado: p.flg_estado?.trim(),
  }));
};

export const crearPais = async (pais: Pais) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(pais),
  });
  return res.json();
};

export const actualizarPais = async (id: string, pais: Pais) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(pais),
  });
  return res.json();
};

export const eliminarPais = async (id: string) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: headers(),
  });
};