const API_URL = "http://192.168.39.137:5000/api/compras";

export const getCompras = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export const getCompraById = async (id: number) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
};

export const createCompra = async (data: any) => {
  const token = localStorage.getItem("token");
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};
