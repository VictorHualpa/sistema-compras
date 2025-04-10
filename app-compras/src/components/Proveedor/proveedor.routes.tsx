import { lazy } from "react";

const ProveedorPage = lazy(() => import("./ProveedorPage"));

export default [
  {
    path: "/proveedores",
    element: <ProveedorPage />,
  },
];
