const API_URL = "http://192.168.1.49:5000/api/proveedores";

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

  if (!res.ok) {
    const body = await res.json();
    console.error("❌ Error del backend:", body);
    throw new Error(body.mensaje || "Error al registrar proveedor");
  }

  const resultado = await res.json();
  console.log("✅ Resultado JSON:", resultado);
  return resultado;
};


/*
export const createProveedor = async (data: any) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // Intenta leer el cuerpo de respuesta si existe
  const responseBody = await res
    .json()
    .catch(() => ({ mensaje: "Proveedor creado pero sin cuerpo de respuesta" }));

  if (!res.ok) {
    throw new Error(responseBody?.mensaje || "Error al registrar proveedor");
  }

  return responseBody;
};
*/
/*
export const createProveedor = async (data: any) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const mensaje = errorData.mensaje || "Error al registrar proveedor";
    throw new Error(mensaje);
  }

  return await res.json();
};
*/

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
