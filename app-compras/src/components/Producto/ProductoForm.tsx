// ProductoForm.tsx mejorado
import { TextField, Button, Box, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import InputField from "../comunes/InputField";
import IconButtonWithTooltip from "../comunes/IconButtonWithTooltip";

interface Props {
  onSubmit: (producto: any) => void;
  productoEditar: any;
}

export default function ProductoForm({ onSubmit, productoEditar }: Props) {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
  });

  useEffect(() => {
    if (productoEditar) setProducto(productoEditar);
  }, [productoEditar]);

  const handleChange = (e: any) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(producto);
    setProducto({ nombre: "", descripcion: "", precio: "", stock: "" });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        backgroundColor: "#ffffff",
        //backgroundColor: "#f9f9f9",
        padding: 2,
        borderRadius: 2,
        boxShadow: 1,
        mb: 4,
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <InputField
            label="Nombre"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputField
            label="Descripcion"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
        <InputField
          label="Precio"
          name="precio"
          type="number"
          value={producto.precio}
          onChange={handleChange}
        />
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputField
            label="Stock"
            name="stock"
            type="number"
            value={producto.stock}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <IconButtonWithTooltip
            type="submit"
            title={productoEditar ? "Actualizar" : "Guardar"}
            icon={<SaveIcon />}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
