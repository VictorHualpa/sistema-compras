import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    useTheme,
    useMediaQuery,
  } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";
  import { ReactNode } from "react";
  
  interface Props {
    open: boolean;
    title: string;
    children: ReactNode;
    onClose: () => void;
  }
  
  export default function CustomModal({ open, title, children, onClose }: Props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  
    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        fullScreen={fullScreen}
      >
        <DialogTitle
          sx={{
            m: 0,
            px: 3,
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          {title}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
  
        <DialogContent dividers sx={{ p: 3 }}>
          {children}
        </DialogContent>
      </Dialog>
    );
  }