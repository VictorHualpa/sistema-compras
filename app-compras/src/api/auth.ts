const API_URL = "http://192.168.39.137:5000/api";

export const login = async (nombre: string, apellido: string) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, apellido }),
  });
  return await response.json();
};

export const getPerfil = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/perfil`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};
