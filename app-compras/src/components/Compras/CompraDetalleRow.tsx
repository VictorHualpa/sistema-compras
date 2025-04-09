import { TextField, IconButton, TableCell, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ProductoModal from "./ProductoModal";
import { useState } from "react";

export default function CompraDetalleRow({ item, index, onChange, onRemove }: any) {
  const [openModal, setOpenModal] = useState(false);

  const handleSelectProducto = (producto: any) => {
    onChange(index, "cod_producto", producto.id);
    onChange(index, "descripcion_producto", producto.descripcion);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <TextField
              size="small"
              name="cod_producto"
              value={item.cod_producto}
              onChange={(e) => onChange(index, "cod_producto", e.target.value)}
              label="Código"
            />
            <IconButton color="primary" onClick={() => setOpenModal(true)}>
              <SearchIcon />
            </IconButton>
          </div>
        </TableCell>
        <TableCell>
          <TextField
            size="small"
            name="descripcion_producto"
            value={item.descripcion_producto || ""}
            label="Descripción"
            InputProps={{ readOnly: true }}
            fullWidth
          />
        </TableCell>
        <TableCell>
          <TextField
            size="small"
            type="number"
            name="cantidad"
            value={item.cantidad}
            onChange={(e) => onChange(index, "cantidad", e.target.value)}
            label="Cantidad"
          />
        </TableCell>
        <TableCell>
          <TextField
            size="small"
            type="number"
            name="precio_unitario"
            value={item.precio_unitario}
            onChange={(e) => onChange(index, "precio_unitario", e.target.value)}
            label="Precio"
          />
        </TableCell>
        <TableCell>
          {(item.cantidad * item.precio_unitario).toFixed(2)}
        </TableCell>
        <TableCell>
          <IconButton color="error" onClick={() => onRemove(index)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <ProductoModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSelect={handleSelectProducto}
      />
    </>
  );
}