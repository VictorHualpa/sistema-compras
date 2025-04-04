import { useState } from "react";
import {
  Box, IconButton, Paper, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, Typography
} from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import FamiliaForm from "./FamiliaForm";
import { Familia } from "./familia.types";

interface Props {
  familias: Familia[];
  onEdit: (familia: Familia) => void;
  onDelete: (id: string) => void;
  onCrear: (familia: Familia) => void;
}

export default function FamiliaTabla({ familias, onEdit, onDelete, onCrear }: Props) {
  const columnas: GridColDef[] = [
    { field: "cod_familia", headerName: "Código", width: 100 },
    { field: "dsc_familia", headerName: "Descripción", flex: 1 },
    { field: "cst_unit_prom", headerName: "Costo Prom.", width: 120 },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => onEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleConfirmOpen(params.row.cod_familia)}>
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

  const [open, setOpen] = useState(false);
  const [nuevaFamilia, setNuevaFamilia] = useState<Familia>({
    cod_familia: "",
    dsc_familia: "",
    cst_unit_prom: "",
    flg_sis_fam: "",
    corr_subfam: "",
    cst_unit_cif: "",
    flg_replica: "",
    cod_usuario_c: "",
    fch_crea: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNuevaFamilia({ ...nuevaFamilia, [e.target.name]: e.target.value });
  };

  const handleCrear = (e: React.FormEvent) => {
    e.preventDefault();
    onCrear(nuevaFamilia);
    setNuevaFamilia({
      cod_familia: "",
      dsc_familia: "",
      cst_unit_prom: "",
      flg_sis_fam: "",
      corr_subfam: "",
      cst_unit_cif: "",
      flg_replica: "",
      cod_usuario_c: "",
      fch_crea: null,
    });
    setOpen(false);
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [idEliminar, setIdEliminar] = useState<string | null>(null);

  const handleConfirmOpen = (id: string) => {
    setIdEliminar(id);
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
    setIdEliminar(null);
  };

  const handleEliminarConfirmado = () => {
    if (idEliminar) onDelete(idEliminar);
    handleConfirmClose();
  };

  return (
    <Paper elevation={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
        <Box fontWeight="bold">Listado de Familias</Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
          Crear nueva familia
        </Button>
      </Box>

      <DataGrid
        rows={familias}
        getRowId={(row) => row.cod_familia}
        columns={columnas}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20]}
        disableRowSelectionOnClick
        autoHeight
      />

      {/* Modal para crear */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Nueva Familia</DialogTitle>
        <DialogContent dividers>
          <Box component="form" onSubmit={handleCrear}>
            <FamiliaForm values={nuevaFamilia} onChange={handleChange} editando={false} />
          </Box>
        </DialogContent>
      </Dialog>

      {/* Modal de confirmación de eliminación */}
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>¿Estás seguro?</DialogTitle>
        <DialogContent dividers>
          <Typography>Esta acción eliminará la familia seleccionada y no se puede deshacer.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEliminarConfirmado} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>


    </Paper>
  );
}
