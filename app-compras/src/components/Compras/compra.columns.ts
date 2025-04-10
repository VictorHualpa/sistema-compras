import { GridColDef } from "@mui/x-data-grid";

export const compraColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "proveedor", headerName: "Proveedor", flex: 1 },
  { field: "fecha", headerName: "Fecha", width: 130 },
  { field: "estado", headerName: "Estado", width: 100 },
];
