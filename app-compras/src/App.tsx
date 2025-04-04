// src/App.tsx
import { Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Perfil from "./components/Perfil";
import ProductosPage from "./pages/ProductosPage";
import MainLayout from "./layout/MainLayout"; 
import UnidadesPage from "./components/Unidades/UnidadesPage";
import MarcaPage from "./components/Marca/MarcaPage";
import FamiliaPage from "./components/Familia/FamiliaPage";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/" element={<LoginForm />} />

      {/* Rutas protegidas con layout profesional */}
      {token && (
        <>
          <Route path="/productos" element={ <MainLayout> <ProductosPage /> </MainLayout> } />
          <Route path="/perfil" element={ <MainLayout> <Perfil /> </MainLayout> } />
          <Route path="/unidades" element={ <MainLayout> <UnidadesPage /> </MainLayout> } />
          <Route path="/marcas" element={<MainLayout><MarcaPage /></MainLayout>} />
          <Route path="/familias" element={<MainLayout><FamiliaPage /></MainLayout>} />

        </>
      )}

      {/* Redirección si no hay token */}
      {!token && <Route path="*" element={<Navigate to="/" replace />} />}
    </Routes>
  );
}

export default App;
