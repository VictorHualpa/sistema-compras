import { TextField, TextFieldProps } from "@mui/material";

export default function InputField(props: TextFieldProps) {
  return (
    <TextField
      variant="outlined"
      size="small"
      margin="dense"
      fullWidth
      InputLabelProps={{
        shrink: props.type === "date" || props.InputLabelProps?.shrink,
      }}
      sx={{
        '& .MuiInputBase-input': {
          padding: '8px 10px',
        },
        '& .MuiFormHelperText-root': {
          marginLeft: 0,
          marginTop: '4px',
        },
      }}
      {...props}
    />
  );
}
