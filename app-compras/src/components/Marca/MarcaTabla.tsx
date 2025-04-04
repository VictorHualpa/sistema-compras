import { useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Box, IconButton, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Marca } from "./marca.types";

interface Props {
  marcas: Marca[];
  onEditar: (marca: Marca) => void;
  eliminar: (id: string) => void;
}

export default function MarcaTabla({ marcas, onEditar, eliminar }: Props) {
  const columnas: GridColDef[] = [
    { field: "cod_marca", headerName: "Código", width: 100 },
    { field: "dsc_marca", headerName: "Descripción", flex: 1 },
    { field: "cod_familia", headerName: "Familia", width: 100 },
    { field: "flg_replica", headerName: "Replica", width: 100 },
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
          <IconButton color="error" onClick={() => eliminar(params.row.cod_marca)}>
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
          rows={marcas}
          getRowId={(row) => row.cod_marca}
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
