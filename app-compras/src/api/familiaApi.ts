import { Familia } from "../components/Familia/familia.types";
 
const API_URL = 'http://192.168.1.49:5000/api/familias';

export const obtenerFamilias = async (): Promise<Familia[]> => {
  const token = localStorage.getItem("token");
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const crearFamilia = async (familia: Familia) => {
  const token = localStorage.getItem("token");
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(familia),
  });
  return res.json();
};

export const actualizarFamilia = async (id: string, familia: Familia) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(familia),
  });
  return res.json();
};

export const eliminarFamilia = async (id: string) => {
  const token = localStorage.getItem("token");
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
