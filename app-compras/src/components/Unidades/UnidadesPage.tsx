import { useEffect, useState } from "react";
import { Container, Typography, Paper, Box, Grid, Button } from "@mui/material";
import UnidadForm from "./UnidadForm";
import UnidadTabla from "./UnidadTabla";
import { Unidad } from "./unidad.types";
import { obtenerUnidades, crearUnidad, actualizarUnidad, eliminarUnidad } from "../../api/unidadApi";

const unidadInicial: Unidad = {
  cod_unidad: "",
  dsc_unidad: "",
  pso_refenc: "",
  cnt_bultos: "",
  flg_replica: "",
  cod_usuario_c: "",
  fch_crea: null,
  cod_usuario_m: "",
  fch_mod: null,
};

export default function UnidadesPage() {
  const [unidades, setUnidades] = useState<Unidad[]>([]);
  const [formulario, setFormulario] = useState<Unidad>({ ...unidadInicial });
  const [editando, setEditando] = useState(false);

  const cargarUnidades = async () => {
    const data = await obtenerUnidades();
    setUnidades(data);
  };

  useEffect(() => {
    cargarUnidades();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const limpiarFechas = (datos: Unidad): Unidad => {
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
      await actualizarUnidad(datosLimpios.cod_unidad, datosLimpios);
    } else {
      await crearUnidad(datosLimpios);
    }
    setFormulario({ ...unidadInicial });
    setEditando(false);
    cargarUnidades();
  };

  const handleEditar = (unidad: Unidad) => {
    setFormulario({
      ...unidad,
      fch_crea: unidad.fch_crea ? unidad.fch_crea.split("T")[0] : "",
      fch_mod: unidad.fch_mod ? unidad.fch_mod.split("T")[0] : "",
    });
    setEditando(true);
  };

  const handleEliminar = async (id: string) => {
    await eliminarUnidad(id);
    cargarUnidades();
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom mt={4}>
        Unidades de Medida
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          {editando ? "Editar unidad" : "Nueva unidad"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <UnidadForm values={formulario} onChange={handleChange} editando={editando} />
          </Grid>
          <Box mt={2}>
            <Button variant="contained" type="submit">
              {editando ? "Actualizar" : "Guardar"}
            </Button>
          </Box>
        </Box>
      </Paper>

      <UnidadTabla unidades={unidades} onEdit={handleEditar} onDelete={handleEliminar} />
      
    </Container>
  );
}