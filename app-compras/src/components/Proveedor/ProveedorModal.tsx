// src/components/proveedor/ProveedorModal.tsx
import { DialogTitle, DialogContent } from "@mui/material";
import CustomModal from "../comunes/CustomModal";
import ProveedorForm from "./ProveedorForm";
import { Proveedor } from "./proveedor.types";

interface Props {
  open: boolean;
  onClose: () => void;
  proveedor?: Proveedor | null;
  onSave: () => void;
}

export default function ProveedorModal({ open, onClose, proveedor, onSave }: Props) {
  return (
    <CustomModal open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>
        {proveedor?.id ? "Editar Proveedor" : "Registrar Proveedor"}
      </DialogTitle>
      <DialogContent dividers>
        <ProveedorForm proveedor={proveedor} onSave={onSave} />
      </DialogContent>
    </CustomModal>
  );
}
