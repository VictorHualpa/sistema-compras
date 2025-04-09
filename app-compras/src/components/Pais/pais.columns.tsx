import { GridColDef } from "@mui/x-data-grid";
import { IconButton, Tooltip, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Pais } from "./pais.types";

interface ColumnOptions {
  onEditar: (pais: Pais) => void;
  onEliminar: (id: string) => void;
}

export const getPaisColumns = ({ onEditar, onEliminar }: ColumnOptions): GridColDef[] => [
  { field: "cod_pais", headerName: "Código", width: 100 },
  { field: "nom_pais", headerName: "Nombre", flex: 1, minWidth: 120 },
  { field: "nom_pais_en_ingles", headerName: "Nombre en Inglés", flex: 1, minWidth: 160, },
  { field: "flg_estado", headerName: "Estado", width: 100, renderCell: (params) => (params.value === "A" ? "Activo" : "Inactivo"), },
  {
    field: "acciones",
    headerName: "Acciones",
    sortable: false,
    width: 140,
    renderCell: (params) => (
      <Stack direction="row" spacing={1}>
        <Tooltip title="Editar país">
          <IconButton color="primary" onClick={() => onEditar(params.row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar país">
          <IconButton color="error" onClick={() => onEliminar(params.row.cod_pais)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    ),
  },
];