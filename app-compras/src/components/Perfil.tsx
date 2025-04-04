import { useEffect, useState } from "react";
import { getPerfil } from "../api/auth";

export default function Perfil() {
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    getPerfil().then((data) => setUsuario(data.usuario));
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Perfil de Usuario</h2>
      {usuario ? (
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(usuario, null, 2)}</pre>
      ) : (
        <p className="text-gray-600">Cargando perfil...</p>
      )}
    </div>
  );
}
