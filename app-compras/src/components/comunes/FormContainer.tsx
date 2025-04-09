// src/components/comunes/FormContainer.tsx
import { Box, Button } from "@mui/material";
import { ReactNode } from "react";

interface FormContainerProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitLabel?: string;
  fullWidth?: boolean;
}

export default function FormContainer({
  children,
  onSubmit,
  submitLabel = "Guardar",
  fullWidth = false,
}: FormContainerProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
      method="post"
    >
      <Box display="flex" flexDirection="column" gap={2}>
        {children}

        <Box mt={1} textAlign="right">
          <Button
            variant="contained"
            type="submit"
            fullWidth={fullWidth}
            sx={{ minWidth: 120 }}
          >
            {submitLabel}
          </Button>
        </Box>
      </Box>
    </form>
  );
}
