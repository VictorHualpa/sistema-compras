import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Perfil from "./components/Perfil";
import ProductosPage from "./pages/ProductosPage";
import MainLayout from "./layout/MainLayout"; 
import UnidadesPage from "./components/Unidades/UnidadesPage";
import MarcaPage from "./components/Marca/MarcaPage";
import FamiliaPage from "./components/Familia/FamiliaPage";
import PaisPage from "./components/Pais/PaisPage"; 
import ComprasPage from "./components/Compras/CompraPage"; 
 


function App() {
  const token = localStorage.getItem("token");

  return (

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/perfil"
          element={token ? (
            <MainLayout>
              <Perfil />
            </MainLayout>
          ) : (
            <Navigate to="/" replace />
          )}
        />
        <Route
          path="/productos"
          element={token ? (
            <MainLayout>
              <ProductosPage />
            </MainLayout>
          ) : (
            <Navigate to="/" replace />
          )}
        />
        <Route
          path="/unidades"
          element={token ? (
            <MainLayout>
              <UnidadesPage />
            </MainLayout>
          ) : (
            <Navigate to="/" replace />
          )}
        />
        <Route
          path="/marcas"
          element={token ? (
            <MainLayout>
              <MarcaPage />
            </MainLayout>
          ) : (
            <Navigate to="/" replace />
          )}
        />
        <Route
          path="/familias"
          element={token ? (
            <MainLayout>
              <FamiliaPage />
            </MainLayout>
          ) : (
            <Navigate to="/" replace />
          )}
        />
        <Route
          path="/paises"
          element={token ? (
            <MainLayout>
              <PaisPage />
            </MainLayout>
          ) : (
            <Navigate to="/" replace />
          )}
        />

      <Route
        path="/compras"
        element={token ? (
          <MainLayout>
            <ComprasPage />
          </MainLayout>
        ) : (
          <Navigate to="/" replace />
        )}
      />


      </Routes>
  );
}

export default App;