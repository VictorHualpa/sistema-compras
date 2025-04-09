import { Snackbar, Alert, AlertColor } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: AlertColor; // "success" | "error" | "info" | "warning"
  duration?: number;
}

export default function CustomSnackbar({
  open,
  onClose,
  message,
  severity = "success",
  duration = 3000,
}: Props) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity={severity} variant="standard">
        {message}
      </Alert>
    </Snackbar>
  );
}


 