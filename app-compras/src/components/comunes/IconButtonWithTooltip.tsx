import { IconButton, Tooltip, IconButtonProps } from "@mui/material";
import { ReactNode } from "react";

interface Props extends IconButtonProps {
  title: string;
  icon: ReactNode;
}

export default function IconButtonWithTooltip({ title, icon, ...rest }: Props) {
  return (
    <Tooltip title={title} arrow>
      <IconButton
        {...rest}
        sx={{
          borderRadius: '50%',
          backgroundColor: '#1976d2',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#115293',
          },
          ...rest.sx,
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}
