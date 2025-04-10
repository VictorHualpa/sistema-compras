// src/hooks/useSnackbar.tsx
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export default function useSnackbar() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error" | "warning" | "info">("success");

  const showSnackbar = (msg: string, level: "success" | "error" | "warning" | "info" = "success") => {
    setMessage(msg);
    setSeverity(level);
    setOpen(true);
  };

  const closeSnackbar = () => setOpen(false);

  const SnackbarComponent = () => (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity={severity} onClose={closeSnackbar} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );

  return {
    showSnackbar,
    SnackbarComponent,
  };
}
