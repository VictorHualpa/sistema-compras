import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
  Typography,
  TableContainer,
  Paper,
  TablePagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Producto } from "./compra.types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (producto: Producto) => void;
}

export default function ProductoModal({ open, onClose, onSelect }: Props) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [filtro, setFiltro] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (open) {
      fetch("http://localhost:5000/api/productos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then(setProductos)
        .catch((err) => console.error("Error al obtener productos", err));
    }
  }, [open]);

  const productosFiltrados = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      p.id.toString().includes(filtro) ||
      p.descripcion?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen} maxWidth="md" fullWidth>
      <DialogTitle>Seleccionar Producto</DialogTitle>
      <DialogContent>
        <TextField
          label="Buscar producto"
          variant="outlined"
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />

        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Precio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productosFiltrados
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((producto) => (
                  <TableRow
                    key={producto.id}
                    hover
                    onClick={() => {
                      onSelect(producto);
                      onClose();
                    }}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{producto.id}</TableCell>
                    <TableCell>{producto.nombre}</TableCell>
                    <TableCell>{producto.descripcion}</TableCell>
                    <TableCell>{producto.precio}</TableCell>
                  </TableRow>
                ))}
              {productosFiltrados.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography variant="body2" align="center">
                      No se encontraron productos
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={productosFiltrados.length}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[5, 10, 20]}
          />
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
}
