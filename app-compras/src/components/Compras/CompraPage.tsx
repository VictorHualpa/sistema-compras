import { useEffect, useState } from "react";
import { getCompras } from "../../api/compraApi";
import CompraForm from "./CompraForm";
import CompraTabla from "./CompraTabla";
import { Compra } from "./compra.types";
import { Box, Typography } from "@mui/material";
 


export default function CompraPage() {
  const [compras, setCompras] = useState<Compra[]>([]);

  const cargarCompras = () => {
    getCompras().then(data => setCompras(data));
  };

  useEffect(() => {
    cargarCompras();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <CompraForm onCompraRegistrada={cargarCompras} />
      <Typography variant="h6" mt={4} mb={2}>Compras registradas</Typography>
      <CompraTabla compras={compras} />
    </Box>
  );
}
