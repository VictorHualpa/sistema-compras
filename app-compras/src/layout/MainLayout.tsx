import { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import PublicIcon from "@mui/icons-material/Public";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate, Link } from "react-router-dom";

const drawerWidth = 240;

interface Props {
  children: React.ReactNode;
}

const menuItems = [
  { text: "Inicio", icon: <HomeIcon />, path: "/perfil" },
  { text: "Productos", icon: <InventoryIcon />, path: "/productos" },
  { text: "Unidades", icon: <CategoryIcon />, path: "/unidades" },
  { text: "Marcas", icon: <CategoryIcon />, path: "/marcas" },
  { text: "Familias", icon: <PeopleIcon />, path: "/familias" },
  { text: "Países", icon: <PublicIcon />, path: "/paises" },
  { text: "Compras", icon: <InventoryIcon />, path: "/compras" },
  { text: "Proveedores", icon: <PeopleIcon />, path: "/proveedores" },

  
];

export default function MainLayout({ children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Menú
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map(({ text, icon, path }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={path} onClick={() => isMobile && setMobileOpen(false)}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, background: "#2c387e" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Sistema de Compras
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Usuario: {usuario?.nombre || "Invitado"}
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Cerrar sesión
          </Button>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        key={isMobile ? "mobile" : "desktop"} // Forzar redibujado al redimensionar
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1, sm: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
