import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import { createCompra } from "../../api/compraApi";
import CompraDetalleRow from "./CompraDetalleRow";
import { CompraCabecera, CompraDetalle } from "./compra.types";
import { compraSchema } from "./compra.schema";
import useSnackbar from "../../hooks/useSnackbar";
import dayjs from "dayjs";

interface Props {
  onCompraRegistrada: () => void;
}

export default function CompraForm({ onCompraRegistrada }: Props) {
  const { showSnackbar, SnackbarComponent } = useSnackbar();

  const [cabecera, setCabecera] = useState<CompraCabecera>({
    cod_proveedor: "",
    num_documento: "",
    fec_emision: "",
    fec_entrega: "",
  });

  const [detalle, setDetalle] = useState<CompraDetalle[]>([
    { cod_producto: "", descripcion_producto: "", cantidad: 1, precio_unitario: 0 },
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChangeCabecera = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCabecera({ ...cabecera, [e.target.name]: e.target.value });
  };

  const handleChangeFecha = (field: string, value: any) => {
    setCabecera({ ...cabecera, [field]: value?.format("YYYY-MM-DD") || "" });
  };

  const handleChangeDetalle = (index: number, field: keyof CompraDetalle, value: any) => {
    const newDetalle = [...detalle];
    newDetalle[index][field] = ["cantidad", "precio_unitario"].includes(field)
      ? Number(value)
      : value;
    setDetalle(newDetalle);
  };

  const handleAddDetalle = () => {
    setDetalle([...detalle, { cod_producto: "", descripcion_producto: "", cantidad: 1, precio_unitario: 0 }]);
  };

  const handleRemoveDetalle = (index: number) => {
    setDetalle(detalle.filter((_, i) => i !== index));
  };

  const getUsuarioFromToken = (): string => {
    const token = localStorage.getItem("token");
    if (!token) return "desconocido";
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload?.id?.toString() || "desconocido";
    } catch {
      return "desconocido";
    }
  };

  const handleSubmit = async () => {
    const validation = compraSchema.safeParse({ cabecera, detalle });
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((e) => {
        const path = e.path.join(".");
        fieldErrors[path] = e.message;
      });
      setErrors(fieldErrors);
      console.error("Errores de validación:", validation.error.format());
      showSnackbar("Corrige los errores del formulario", "error");
      return;
    }

    try {
      const data = {
        cabecera: {
          ...cabecera,
          cod_usuario_c: getUsuarioFromToken(),
        },
        detalle,
      };

      console.log("🟡 Enviando a backend:", JSON.stringify(data, null, 2));

      await createCompra(data);
      showSnackbar("Compra registrada con éxito", "success");
      onCompraRegistrada();
    } catch (error) {
      console.error("Error al registrar la compra:", error);
      showSnackbar("Error al registrar la compra", "error");
    }
  };

  return (
    <>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Registrar Compra</Typography>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} md={3}>
            <TextField
              label="Proveedor"
              name="cod_proveedor"
              value={cabecera.cod_proveedor}
              onChange={handleChangeCabecera}
              error={Boolean(errors["cabecera.cod_proveedor"])}
              helperText={errors["cabecera.cod_proveedor"] || ""}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <TextField
              label="N° Documento"
              name="num_documento"
              value={cabecera.num_documento}
              onChange={handleChangeCabecera}
              error={Boolean(errors["cabecera.num_documento"])}
              helperText={errors["cabecera.num_documento"] || ""}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <DatePicker
              label="Fecha Emisión"
              value={cabecera.fec_emision ? dayjs(cabecera.fec_emision) : null}
              onChange={(value) => handleChangeFecha("fec_emision", value)}
            />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <DatePicker
              label="Fecha Entrega"
              value={cabecera.fec_entrega ? dayjs(cabecera.fec_entrega) : null}
              onChange={(value) => handleChangeFecha("fec_entrega", value)}
            />
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="subtitle1">Detalle de Productos</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Precio Unitario</TableCell>
                <TableCell>Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {detalle.map((item, index) => (
                <CompraDetalleRow
                  key={index}
                  item={item}
                  index={index}
                  onChange={handleChangeDetalle}
                  onRemove={handleRemoveDetalle}
                />
              ))}
            </TableBody>
          </Table>
          <Button onClick={handleAddDetalle} sx={{ mt: 2 }}>Agregar Producto</Button>
        </Box>

        <Box mt={4} textAlign="right">
          <Button variant="contained" onClick={handleSubmit}>Guardar Compra</Button>
        </Box>
      </Paper>

      <SnackbarComponent />
    </>
  );
}
