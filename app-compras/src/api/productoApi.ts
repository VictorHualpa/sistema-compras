const API_URL = 'http://192.168.1.49:5000/api/productos';

export const obtenerProductos = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const crearProducto = async (producto: any) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });
  return res.json();
};

export const actualizarProducto = async (id: number, producto: any) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });
  return res.json();
};

export const eliminarProducto = async (id: number) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
