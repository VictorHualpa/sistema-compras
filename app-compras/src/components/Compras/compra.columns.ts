import { GridColDef } from "@mui/x-data-grid";

export const getCompraColumns = (): GridColDef[] => [
  { field: "id", headerName: "ID", width: 90 },
  { field: "proveedor", headerName: "Proveedor", flex: 1 },
  { field: "fecha", headerName: "Fecha", width: 120 },
  { field: "estado", headerName: "Estado", width: 120 }
];
