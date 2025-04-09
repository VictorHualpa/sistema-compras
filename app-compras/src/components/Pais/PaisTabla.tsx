import CustomDataGrid from "../comunes/CustomDataGrid";
import { getPaisColumns } from "./pais.columns";
import { Pais } from "./pais.types";

interface Props {
  paises: Pais[];
  onEditar: (pais: Pais) => void;
  onEliminar: (id: string) => void;
}

export default function PaisTabla({ paises, onEditar, onEliminar }: Props) {
  const columnas = getPaisColumns({ onEditar, onEliminar });

  return (
    <CustomDataGrid
      rows={paises}
      columns={columnas}
      getRowId={(row) => row.cod_pais}
      showToolbar={false}
      title="Listado de países" 
    />
  );
}
