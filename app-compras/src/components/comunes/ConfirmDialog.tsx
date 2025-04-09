// ConfirmDialog.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { ReactNode } from "react";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message?: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
  confirmColor?: "primary" | "error" | "warning" | "info" | "success";
  icon?: ReactNode;
  fullWidth?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}

export default function ConfirmDialog({
  open,
  title = "¿Estás seguro?",
  message = "Esta acción no se puede deshacer.",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onClose,
  confirmColor = "error",
  icon,
  fullWidth = true,
  maxWidth = "xs",
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth={fullWidth} maxWidth={maxWidth}>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          {icon && <Box>{icon}</Box>}
          <Typography variant="h6">{title}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        {typeof message === "string" ? (
          <DialogContentText>{message}</DialogContentText>
        ) : (
          message
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelText}</Button>
        <Button onClick={onConfirm} variant="contained" color={confirmColor}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
