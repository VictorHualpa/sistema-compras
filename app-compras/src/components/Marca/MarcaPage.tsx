import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import MarcaForm from "./MarcaForm";
import MarcaTabla from "./MarcaTabla";
import { Marca } from "./marca.types";
import {
  obtenerMarcas,
  crearMarca,
  actualizarMarca,
  eliminarMarca,
} from "../../api/marcaApi";

const marcaInicial: Marca = {
  cod_familia: "",
  cod_marca: "",
  dsc_marca: "",
  flg_replica: "",
  cod_usuario_c: "",
  fch_crea: null,
  cod_usuario_m: "",
  fch_mod: null,
};

export default function MarcaPage() {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [formulario, setFormulario] = useState<Marca>({ ...marcaInicial });
  const [editando, setEditando] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);

  const cargarMarcas = async () => {
    const data = await obtenerMarcas();
    setMarcas(data);
  };

  useEffect(() => {
    cargarMarcas();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const limpiarFechas = (datos: Marca): Marca => {
    return {
      ...datos,
      fch_crea: datos.fch_crea === "" ? null : datos.fch_crea,
      fch_mod: datos.fch_mod === "" ? null : datos.fch_mod,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const datosLimpios = limpiarFechas(formulario);
    if (editando) {
      await actualizarMarca(datosLimpios.cod_marca, datosLimpios);
    } else {
      await crearMarca(datosLimpios);
    }
    setFormulario({ ...marcaInicial });
    setEditando(false);
    setModalAbierto(false);
    cargarMarcas();
  };

  const handleEditar = (marca: Marca) => {
    setFormulario({
      ...marca,
      fch_crea: marca.fch_crea ? marca.fch_crea.split("T")[0] : "",
      fch_mod: marca.fch_mod ? marca.fch_mod.split("T")[0] : "",
    });
    setEditando(true);
    setModalAbierto(true);
  };

  const handleEliminar = async (id: string) => {
    await eliminarMarca(id);
    cargarMarcas();
  };

  const abrirModalNuevo = () => {
    setFormulario({ ...marcaInicial });
    setEditando(false);
    setModalAbierto(true);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom mt={4}>
        Marcas
      </Typography>

      <Box textAlign="right" mb={2}>
        <Button variant="contained" onClick={abrirModalNuevo}>
          Crear nueva marca
        </Button>
      </Box>

      <MarcaTabla marcas={marcas} onEditar={handleEditar} eliminar={handleEliminar} />

      <Dialog open={modalAbierto} onClose={() => setModalAbierto(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editando ? "Editar Marca" : "Nueva Marca"}</DialogTitle>
        <DialogContent dividers>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <MarcaForm values={formulario} onChange={handleChange} editando={editando} />
            </Grid>
            <Box mt={2}>
              <Button variant="contained" type="submit">
                {editando ? "Actualizar" : "Guardar"}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
