import { Unidad } from "../components/Unidades/unidad.types";
const API_URL = "http://192.168.39.137:5000/api/unidades";

export const obtenerUnidades = async (): Promise<Unidad[]> => {
  const res = await fetch(API_URL);
  return res.json();
};

export const crearUnidad = async (unidad: Unidad) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(unidad),
  });
  return res.json();
};

export const actualizarUnidad = async (id: string, unidad: Unidad) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(unidad),
  });
  return res.json();
};

export const eliminarUnidad = async (id: string) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};