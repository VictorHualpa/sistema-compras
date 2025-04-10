// src/components/proveedor/ProveedorPage.tsx
import { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import ProveedorTable from "./ProveedorTable";
import { getProveedores } from "../../api/proveedorApi";
import { Proveedor } from "./proveedor.types";

export default function ProveedorPage() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);

  const cargarProveedores = async () => {
    const data = await getProveedores();
    setProveedores(data);
  };

  useEffect(() => {
    cargarProveedores();
  }, []);

  return (

      <CardContent>
        <ProveedorTable rows={proveedores} />
      </CardContent>
 
  );
}
