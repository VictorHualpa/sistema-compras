// src/components/proveedor/ProveedorTable.tsx
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { Proveedor } from "./proveedor.types";
import { getProveedores, deleteProveedor } from "../../api/proveedorApi";
import { getProveedorColumns } from "./proveedor.columns";

import CustomDataGrid from "../comunes/CustomDataGrid";
import ConfirmDialog from "../comunes/ConfirmDialog";
import CustomModal from "../comunes/CustomModal";
import ProveedorForm from "./ProveedorForm";
import IconButtonWithTooltip from "../comunes/IconButtonWithTooltip";
import useSnackbar from "../../hooks/useSnackbar";

export default function ProveedorTable() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [selectedProveedor, setSelectedProveedor] = useState<Proveedor | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [proveedorAEliminar, setProveedorAEliminar] = useState<Proveedor | null>(null);

  const { showSnackbar, SnackbarComponent } = useSnackbar();

  const cargarProveedores = async () => {
    try {
      const data = await getProveedores();
      setProveedores(data);
    } catch (error) {
      showSnackbar("Error al cargar proveedores", "error");
    }
  };

  useEffect(() => {
    cargarProveedores();
  }, []);

  const handleAgregar = () => {
    setSelectedProveedor(null);
    setOpenModal(true);
  };

  const handleEditar = (proveedor: Proveedor) => {
    setSelectedProveedor(proveedor);
    setOpenModal(true);
  };

  const handleEliminar = (proveedor: Proveedor) => {
    setProveedorAEliminar(proveedor);
    setOpenConfirm(true);
  };

  const confirmarEliminar = async () => {
    if (!proveedorAEliminar) return;
    try {
      await deleteProveedor(proveedorAEliminar.id);
      showSnackbar("Proveedor eliminado correctamente", "success");
      cargarProveedores();
    } catch {
      showSnackbar("Error al eliminar proveedor", "error");
    }
    setOpenConfirm(false);
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">
          Gestión de Proveedores
        </Typography>

        <IconButtonWithTooltip
          title="Crear nuevo proveedor"
          icon={<AddCircleIcon />}
          onClick={handleAgregar}
        />
      </Box>

      <CustomDataGrid
        rows={proveedores}
        columns={getProveedorColumns({ onEditar: handleEditar, onEliminar: handleEliminar })}
        showToolbar={false}
        title="Listado de Proveedores"
      />

      <CustomModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={selectedProveedor ? "Editar Proveedor" : "Nuevo Proveedor"}
      >
        <ProveedorForm
          proveedor={selectedProveedor ?? undefined}
          onSave={() => {
            setOpenModal(false);
            cargarProveedores();
          }}
        />
      </CustomModal>

      <ConfirmDialog
        open={openConfirm}
        title="¿Eliminar proveedor?"
        message={`¿Estás seguro de eliminar a "${proveedorAEliminar?.razon_social}"?`}
        onClose={() => setOpenConfirm(false)}
        onConfirm={confirmarEliminar}
        confirmColor="error"
      />

      <SnackbarComponent />
    </>
  );
}
