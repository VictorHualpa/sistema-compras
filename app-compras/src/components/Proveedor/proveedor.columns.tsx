import { GridColDef } from "@mui/x-data-grid";
import { IconButton, Stack, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Proveedor } from "./proveedor.types";

interface ColumnOptions {
  onEditar: (proveedor: Proveedor) => void;
  onEliminar: (proveedor: Proveedor) => void;
}

export const getProveedorColumns = ({
  onEditar,
  onEliminar,
}: ColumnOptions): GridColDef[] => [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "razon_social",
    headerName: "Razón Social",
    flex: 1,
    minWidth: 160,
  },
  {
    field: "ruc",
    headerName: "RUC",
    flex: 1,
    minWidth: 130,
  },
  {
    field: "direccion",
    headerName: "Dirección",
    flex: 1,
    minWidth: 160,
  },
  {
    field: "telefono",
    headerName: "Teléfono",
    flex: 1,
    minWidth: 130,
  },
  {
    field: "correo",
    headerName: "Correo",
    flex: 1,
    minWidth: 160,
  },
  {
    field: "estado",
    headerName: "Estado",
    width: 110,
    renderCell: (params) => (params.value ? "Activo" : "Inactivo"),
  },
  {
    field: "acciones",
    headerName: "Acciones",
    width: 130,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <Stack direction="row" spacing={1}>
        <Tooltip title="Editar proveedor">
          <IconButton
            size="small"
            color="primary"
            onClick={() => onEditar(params.row)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar proveedor">
          <IconButton
            size="small"
            color="error"
            onClick={() => onEliminar(params.row)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    ),
  },
];
