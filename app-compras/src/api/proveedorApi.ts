const API_URL = "http://192.168.39.137:5000/api/proveedores";

const getToken = () => localStorage.getItem("token") || "";

export const getProveedores = async () => {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return await res.json();
};

export const getProveedorById = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return await res.json();
};

export const createProveedor = async (data: any) => {
  console.log("📤 Enviando POST a:", API_URL);
  console.log("📤 Datos:", data);

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log("📥 Respuesta de backend:", res);

  const body = await res.json();

  if (!res.ok) {
    console.error("❌ Error del backend:", body);
    throw body; // ✅ Lanza el objeto completo con errores y mensaje
  }

  console.log("✅ Resultado JSON:", body);
  return body;
};


export const updateProveedor = async (id: number, data: any) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar proveedor");
  return await res.json();
};


export const deleteProveedor = async (id: number) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!res.ok) throw new Error("Error al eliminar proveedor");
  return await res;
};
