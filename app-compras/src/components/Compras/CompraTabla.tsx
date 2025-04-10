import { DataGrid } from "@mui/x-data-grid";
import { Paper, Box } from "@mui/material";
import { Compra } from "./compra.types";
import { compraColumns } from "./compra.columns";

interface Props {
  compras: Compra[];
}

export default function CompraTabla({ compras }: Props) {
  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={compras}
          getRowId={(row) => row.id!}
          columns={compraColumns}
          autoHeight
          density="compact"
          pageSizeOptions={[5, 10, 20]}
        />
      </Box>
    </Paper>
  );
}
