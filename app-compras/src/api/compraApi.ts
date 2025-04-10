const API_URL = "http://192.168.1.49:5000/api/compras";

// Utilidad para obtener token con fallback
const getToken = () => localStorage.getItem("token") || "";

// Validar respuesta del servidor
const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.mensaje || "Error en la solicitud");
  }
  return res.json();
};

// Obtener todas las compras
export const getCompras = async () => {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return await handleResponse(res);
};

// Obtener una compra por ID
export const getCompraById = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return await handleResponse(res);
};

// Crear una nueva compra
export const createCompra = async (data: any) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log("🟡 Enviando a backend:", JSON.stringify(data, null, 2));

  return await handleResponse(res);
};
