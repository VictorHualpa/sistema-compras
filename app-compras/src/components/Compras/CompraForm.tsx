import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { createCompra } from "../../api/compraApi";
import CompraDetalleRow from "./CompraDetalleRow";

export default function CompraForm({ onCompraRegistrada }: { onCompraRegistrada: () => void }) {
  const [cabecera, setCabecera] = useState({
    cod_proveedor: "",
    num_documento: "",
    fec_emision: "",
    fec_entrega: "",
  });

  const [detalle, setDetalle] = useState([
    { cod_producto: "", cantidad: 1, precio_unitario: 0 },
  ]);

  const handleChangeCabecera = (e: any) => {
    setCabecera({ ...cabecera, [e.target.name]: e.target.value });
  };

  const handleChangeDetalle = (index: number, field: string, value: any) => {
    const newDetalle = [...detalle];
    newDetalle[index][field] = field.includes("cantidad") || field.includes("precio") ? Number(value) : value;
    setDetalle(newDetalle);
  };

  const handleAddDetalle = () => {
    setDetalle([...detalle, { cod_producto: "", cantidad: 1, precio_unitario: 0 }]);
  };

  const handleRemoveDetalle = (index: number) => {
    const newDetalle = [...detalle];
    newDetalle.splice(index, 1);
    setDetalle(newDetalle);
  };

  const handleSubmit = async () => {
    await createCompra({ cabecera, detalle });
    alert("Compra registrada con éxito");
    setCabecera({ cod_proveedor: "", num_documento: "", fec_emision: "", fec_entrega: "" });
    setDetalle([{ cod_producto: "", cantidad: 1, precio_unitario: 0 }]);
    onCompraRegistrada();
  };

  return (
    <Box>
      <Typography variant="h6">Registrar Compra</Typography>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Proveedor"
            name="cod_proveedor"
            value={cabecera.cod_proveedor}
            onChange={handleChangeCabecera}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="N° Documento"
            name="num_documento"
            value={cabecera.num_documento}
            onChange={handleChangeCabecera}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="date"
            label="Fec. Emisión"
            name="fec_emision"
            value={cabecera.fec_emision}
            onChange={handleChangeCabecera}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="date"
            label="Fec. Entrega"
            name="fec_entrega"
            value={cabecera.fec_entrega}
            onChange={handleChangeCabecera}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      <Typography variant="subtitle1">Detalle</Typography>
      <Paper variant="outlined" sx={{ mt: 1, mb: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio Unitario</TableCell>
              <TableCell>Subtotal</TableCell>
              <TableCell></TableCell>
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
      </Paper>
      <Button onClick={handleAddDetalle}>+ Añadir producto</Button>

      <Box mt={2}>
        <Button variant="contained" onClick={handleSubmit}>Registrar Compra</Button>
      </Box>
    </Box>
  );
}