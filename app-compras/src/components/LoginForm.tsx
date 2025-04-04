import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function LoginForm() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await login(nombre, apellido);
    if (result?.token) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("usuario", JSON.stringify(result.usuario));
      navigate("/productos");
    } else {
      alert("Nombre o apellido incorrectos");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f5f5f5" }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 4,
          borderRadius: 3,
        }}
      >
        <Box textAlign="center" mb={2}>
          <Avatar sx={{ bgcolor: "#1976d2", mx: "auto", mb: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" fontWeight={500}>
            Iniciar sesión
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            fullWidth
            required
            variant="outlined"
            size="small"
            margin="dense"
          />
          <TextField
            label="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            onKeyDown={handleKeyDown} // ✅ Enter activa el login
            fullWidth
            required
            variant="outlined"
            size="small"
            margin="dense"
          />
          <Button
            variant="contained"
            onClick={handleLogin}
            fullWidth
            sx={{
              mt: 1,
              py: 1.2,
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "0.95rem",
              borderRadius: 2,
            }}
          >
            Iniciar sesión
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
