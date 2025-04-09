import { useEffect, useState } from "react";
import { getCompras } from "../../api/compraApi";
import CompraForm from "./CompraForm";

export default function ComprasPage() {
  const [compras, setCompras] = useState([]);

  const cargarCompras = () => {
    getCompras().then(data => setCompras(data));
  };

  useEffect(() => {
    cargarCompras();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <CompraForm onCompraRegistrada={cargarCompras} />
      <h2>Compras registradas</h2>
      <ul>
        {compras.map((compra: any) => (
          <li key={compra.id}>
            N° Doc: {compra.num_documento} — Fecha: {compra.fec_emision}
          </li>
        ))}
      </ul>
    </div>
  );
}
