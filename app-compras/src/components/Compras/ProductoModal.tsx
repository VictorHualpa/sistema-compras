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
  
  interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
  }
  
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
          .then(setProductos);
      }
    }, [open]);
  
    const productosFiltrados = productos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
        p.id.toString().includes(filtro) ||
        p.descripcion?.toLowerCase().includes(filtro.toLowerCase())
    );
  
    const handleChangePage = (_event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    return (
      <Dialog open={open} onClose={onClose} fullScreen={fullScreen} fullWidth maxWidth="md">
        <DialogTitle>Seleccionar Producto</DialogTitle>
        <DialogContent>
          <TextField
            label="Buscar producto"
            fullWidth
            margin="normal"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          {productosFiltrados.length > 0 ? (
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Seleccionar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productosFiltrados.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((producto) => (
                    <TableRow key={producto.id} hover>
                      <TableCell>{producto.id}</TableCell>
                      <TableCell>{producto.nombre}</TableCell>
                      <TableCell>{producto.descripcion}</TableCell>
                      <TableCell>
                        <Typography
                          sx={{ cursor: "pointer", color: "primary.main" }}
                          onClick={() => {
                            onSelect(producto);
                            onClose();
                          }}
                        >
                          Elegir
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={productosFiltrados.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No se encontraron productos.
            </Typography>
          )}
        </DialogContent>
      </Dialog>
    );
  }
  