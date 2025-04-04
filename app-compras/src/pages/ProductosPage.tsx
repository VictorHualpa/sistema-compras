import { useEffect, useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../api/productoApi";
import ProductoForm from "../components/Producto/ProductoForm";
import ProductoLista from "../components/Producto/ProductoLista";

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [editar, setEditar] = useState<any>(null);

  const cargarProductos = async () => {
    const data = await obtenerProductos();
    setProductos(data);
  };

  const guardar = async (producto: any) => {
    if (producto.id) {
      await actualizarProducto(producto.id, producto);
    } else {
      await crearProducto(producto);
    }
    setEditar(null);
    cargarProductos();
  };

  const eliminar = async (id: number) => {
    await eliminarProducto(id);
    cargarProductos();
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h7" gutterBottom mt={4}>
        Gestión de Productos
      </Typography>

      <ProductoForm onSubmit={guardar} productoEditar={editar} />

      <ProductoLista
        productos={productos}
        onEditar={setEditar}
        eliminar={eliminar}
      />
    </Container>
  );
}
