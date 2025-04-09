import { useState } from "react";

export default function useSnackbar() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error" | "warning" | "info">("success");

  const showSnackbar = (msg: string, level: typeof severity = "success") => {
    setMessage(msg);
    setSeverity(level);
    setOpen(true);
  };

  const closeSnackbar = () => setOpen(false);

  return {
    open,
    message,
    severity,
    showSnackbar,
    closeSnackbar,
  };
}
