import { useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Box, IconButton, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Unidad } from "./unidad.types";

interface Props {
  unidades: Unidad[];
  onEdit: (unidad: Unidad) => void;
  onDelete: (id: string) => void;
}

export default function UnidadTabla({ unidades, onEdit, onDelete }: Props) {
  const columnas: GridColDef[] = [
    { field: "cod_unidad", headerName: "Código", width: 100 },
    { field: "dsc_unidad", headerName: "Descripción", flex: 1 },
    { field: "pso_refenc", headerName: "Peso", width: 100 },
    { field: "cnt_bultos", headerName: "Bultos", width: 100 },
    { field: "flg_replica", headerName: "Replica", width: 100 },
    {
      field: "acciones",
      headerName: "Acciones",
      sortable: false,
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => onEdit(params.row)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(params.row.cod_unidad)} color="error">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 5,
    page: 0,
  });

  return (
    <Paper elevation={2}>
      <Box sx={{ width: "100%", p: 2 }}>
        <DataGrid
          rows={unidades}
          getRowId={(row) => row.cod_unidad}
          columns={columnas}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
          autoHeight
        />
      </Box>
    </Paper>
  );
}
