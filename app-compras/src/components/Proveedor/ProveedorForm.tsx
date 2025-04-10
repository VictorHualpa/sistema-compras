// src/components/proveedor/ProveedorForm.tsx
import { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import InputField from "../comunes/InputField";
import { Proveedor } from "./proveedor.types";
import { createProveedor, updateProveedor } from "../../api/proveedorApi";
import useSnackbar from "../../hooks/useSnackbar";
import { proveedorSchema } from "./proveedor.schema";

interface Props {
  proveedor?: Proveedor;
  onSave: () => void;
}

const initialState: Proveedor = {
  id: 0,
  razon_social: "",
  ruc: "",
  direccion: "",
  telefono: "",
  correo: "",
  estado: true,
};

export default function ProveedorForm({ proveedor, onSave }: Props) {
  const [formData, setFormData] = useState<Proveedor>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (proveedor) setFormData(proveedor);
  }, [proveedor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const result = proveedorSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((e) => {
        fieldErrors[e.path[0]] = e.message;
      });
      setErrors(fieldErrors);
      showSnackbar("Corrige los errores del formulario", "error");
      return;
    }

    try {
      const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
      const payload = {
        ...formData,
        cod_usuario_c: usuario.id || 1,
        cod_usuario_m: usuario.id || 1,
      };

      if (formData.id) {
        await updateProveedor(formData.id, payload);
        showSnackbar("Proveedor actualizado con éxito", "success");
      } else {
        await createProveedor(payload);
        showSnackbar("Proveedor creado con éxito", "success");
      }

      onSave();
      setFormData(initialState);
      setErrors({});
    } catch (error: any) {
      const msg = error?.message || "Error al guardar proveedor";
      showSnackbar(msg, "error");
    }
  };

  return (
    <Box component="form" noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <InputField
            name="razon_social"
            label="Razón Social"
            value={formData.razon_social}
            onChange={handleChange}
            error={Boolean(errors.razon_social)}
            helperText={errors.razon_social}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name="ruc"
            label="RUC"
            value={formData.ruc}
            onChange={handleChange}
            error={Boolean(errors.ruc)}
            helperText={errors.ruc}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name="direccion"
            label="Dirección"
            value={formData.direccion}
            onChange={handleChange}
            error={Boolean(errors.direccion)}
            helperText={errors.direccion}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name="telefono"
            label="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
            error={Boolean(errors.telefono)}
            helperText={errors.telefono}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name="correo"
            label="Correo"
            value={formData.correo}
            onChange={handleChange}
            error={Boolean(errors.correo)}
            helperText={errors.correo}
          />
        </Grid>
      </Grid>

      <Box mt={3} textAlign="right">
        <Button variant="contained" onClick={handleSubmit}>
          {formData.id ? "Actualizar" : "Guardar"}
        </Button>
      </Box>
    </Box>
  );
}
