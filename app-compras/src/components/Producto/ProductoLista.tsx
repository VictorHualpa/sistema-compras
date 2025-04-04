import { useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Box, IconButton, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductoLista({ productos, onEditar, eliminar }: any) {
  const columnas: GridColDef[] = [
    { field: "id", headerName: "ID", width: 30 },
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "descripcion", headerName: "Descripción", flex: 1 },
    { field: "precio", headerName: "Precio", type: "number", width: 100 },
    { field: "stock", headerName: "Stock", type: "number", width: 100 },
    {
      field: "acciones",
      headerName: "Acciones",
      sortable: false,
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => onEditar(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => eliminar(params.row.id)}>
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
          rows={productos}
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
