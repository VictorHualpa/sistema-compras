import { TextField, TextFieldProps } from "@mui/material";

export default function InputField(props: TextFieldProps) {
  return (
    <TextField
      variant="outlined"
      size="small"
      margin="dense"
      fullWidth
      sx={{
        '& .MuiInputBase-input': {
          padding: '6px 6px',
        },
      }}
      {...props} // permite sobrescribir si necesitas algo diferente
    />
  );
}

 