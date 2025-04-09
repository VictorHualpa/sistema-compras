// CompraTabla.tsx
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Paper, Box } from "@mui/material";
import { Compra } from "./compra.types";

export default function CompraTabla({ compras }: { compras: Compra[] }) {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "proveedor", headerName: "Proveedor", flex: 1 },
    { field: "fecha", headerName: "Fecha", width: 130 },
    { field: "estado", headerName: "Estado", width: 100 },
  ];

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={compras}
          getRowId={(row) => row.id}
          columns={columns}
          autoHeight
          density="compact"
          pageSizeOptions={[5, 10, 20]}
        />
      </Box>
    </Paper>
  );
}
