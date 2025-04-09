import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<{ nombre: string; apellido: string } | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("usuario");
    if (data) {
      try {
        const usuarioParseado = JSON.parse(data);
        setUsuario(usuarioParseado);
      } catch (e) {
        console.error("Usuario mal formateado en localStorage");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
        height: 56, // altura reducida
        justifyContent: 'center'
      }}
    >
      <Toolbar variant="dense">
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Sistema de Compras
        </Typography>
        <Button color="inherit" component={Link} to="/productos">
          Productos
        </Button>
        <Button color="inherit" component={Link} to="/perfil">
          Perfil
        </Button>
        <Button color="inherit" component={Link} to="/unidades">
          Unidades de Medida
        </Button>

        <Box ml={2}>
          <Typography variant="body2">
            Usuario: {usuario?.nombre} {usuario?.apellido}
          </Typography>
        </Box>
        <Button color="inherit" onClick={handleLogout}>
          Salir
        </Button>
      </Toolbar>
    </AppBar>

    
  );
}
