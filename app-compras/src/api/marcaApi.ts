import { Marca } from "../components/Marca/marca.types";
const API_URL = 'http://192.168.39.137:5000/api/marcas';

export const obtenerMarcas = async (): Promise<Marca[]> => {
  const res = await fetch(API_URL);
  return res.json();
};

export const crearMarca = async (marca: Marca) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(marca),
  });
  return res.json();
};

export const actualizarMarca = async (id: string, marca: Marca) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(marca),
  });
  return res.json();
};

export const eliminarMarca = async (id: string) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};