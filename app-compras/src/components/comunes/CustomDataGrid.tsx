// components/comunes/CustomDataGrid.tsx
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridToolbar,
} from "@mui/x-data-grid";
import { Box, Paper, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useState } from "react";

interface Props {
  rows: any[];
  columns: GridColDef[];
  getRowId?: (row: any) => string | number;
  loading?: boolean;
  pageSizeOptions?: number[];
  showToolbar?: boolean;
  title?: string;
}

export default function CustomDataGrid({
  rows,
  columns,
  getRowId = (row) => row.id,
  loading = false,
  pageSizeOptions = [5, 10, 20],
  showToolbar = false,
  title,
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ✅ Control interno del paginado
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize:   10,
  });

  return (
    <Paper elevation={1} sx={{ p: 2, overflowX: "auto" }}>
      {title && (
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          sx={{ mb: 1, color: theme.palette.primary.main }}
        >
          {title}
        </Typography>
      )}

      {rows.length === 0 && !loading ? (
        <Typography variant="body2" sx={{ p: 2 }}>
          No hay datos disponibles.
        </Typography>
      ) : (
        <Box sx={{ width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={getRowId}
            autoHeight
            density="compact"
            disableRowSelectionOnClick
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={pageSizeOptions}
            loading={loading}
            slots={showToolbar ? { toolbar: GridToolbar } : undefined}
            sx={{
              fontSize: "0.8rem",
              border: "none",
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: theme.palette.grey[200],
                fontWeight: "bold",
                minHeight: 35,
                maxHeight: 35,
              },
              '& .MuiDataGrid-cell': {
                py: 0,
              },
              '& .MuiDataGrid-row': {
                minHeight: 28,
                maxHeight: 28,
              },
              '& .MuiDataGrid-virtualScroller': {
                overflowX: isMobile ? "auto" : "hidden",
              },
            }}
          />
        </Box>
      )}
    </Paper>
  );
}
