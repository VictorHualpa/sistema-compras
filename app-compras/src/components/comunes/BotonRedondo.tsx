import { IconButton, Tooltip } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  onClick: () => void;
  icon: ReactNode;
  tooltip: string;
  color?: "primary" | "secondary" | "error" | "inherit" | "default";
}

export default function BotonRedondo({ onClick, icon, tooltip, color = "primary" }: Props) {
  return (
    <Tooltip title={tooltip} arrow>
      <IconButton
        onClick={onClick}
        color={color}
        size="large"
        sx={{
          border: `1px solid`,
          borderColor: `${color}.main`,
          backgroundColor: "#fff",
          ":hover": {
            backgroundColor: `${color}.light`,
          },
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}
