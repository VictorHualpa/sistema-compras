import { TextField, IconButton, TableCell, TableRow } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import ProductoModal from "./ProductoModal";
import { useState } from "react";
import { CompraDetalle, Producto } from "./compra.types";

interface Props {
  item: CompraDetalle;
  index: number;
  onChange: (index: number, field: string, value: any) => void;
  onRemove: (index: number) => void;
}

export default function CompraDetalleRow({ item, index, onChange, onRemove }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const handleSelectProducto = (producto: Producto) => {
    onChange(index, "cod_producto", producto.id.toString());
    onChange(index, "descripcion_producto", producto.descripcion || "");
    setOpenModal(false);
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
            disabled
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
            fullWidth
          />
        </TableCell>
        <TableCell>
          <TextField
            size="small"
            type="number"
            name="precio_unitario"
            value={item.precio_unitario}
            onChange={(e) => onChange(index, "precio_unitario", e.target.value)}
            fullWidth
          />
        </TableCell>
        <TableCell>
          <IconButton color="error" onClick={() => onRemove(index)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <ProductoModal open={openModal} onClose={() => setOpenModal(false)} onSelect={handleSelectProducto} />
    </>
  );
}
