import { useEffect, useState } from "react";
import { Container, Typography, Dialog, DialogTitle, DialogContent } from "@mui/material";
import FamiliaForm from "./FamiliaForm";
import FamiliaTabla from "./FamiliaTabla";
import { Familia } from "./familia.types";
import {
  obtenerFamilias,
  crearFamilia,
  actualizarFamilia,
  eliminarFamilia,
} from "../../api/familiaApi";

const familiaInicial: Familia = {
  cod_familia: "",
  dsc_familia: "",
  cst_unit_prom: "",
  flg_sis_fam: "",
  corr_subfam: "",
  cst_unit_cif: "",
  flg_replica: "",
  cod_usuario_c: "",
  fch_crea: null,
};

export default function FamiliaPage() {
  const [familias, setFamilias] = useState<Familia[]>([]);
  const [formulario, setFormulario] = useState<Familia>({ ...familiaInicial });
  const [editando, setEditando] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const cargarFamilias = async () => {
    const data = await obtenerFamilias();
    setFamilias(data);
  };

  useEffect(() => {
    cargarFamilias();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const limpiarFechas = (datos: Familia): Familia => {
    return {
      ...datos,
      fch_crea: datos.fch_crea === "" ? null : datos.fch_crea,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const datosLimpios = limpiarFechas(formulario);
    if (editando) {
      await actualizarFamilia(formulario.cod_familia, datosLimpios);
    }
    setFormulario({ ...familiaInicial });
    setEditando(false);
    setOpenEdit(false);
    cargarFamilias();
  };

  const handleCrear = async (familia: Familia) => {
    const datosLimpios = limpiarFechas(familia);
    await crearFamilia(datosLimpios);
    cargarFamilias();
  };

  const handleEditar = (familia: Familia) => {
    setFormulario({
      ...familia,
      fch_crea: familia.fch_crea ? familia.fch_crea.split("T")[0] : "",
    });
    setEditando(true);
    setOpenEdit(true);
  };

  const handleEliminar = async (id: string) => {
    await eliminarFamilia(id);
    cargarFamilias();
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom mt={4}>
        Familias
      </Typography>

      <FamiliaTabla
        familias={familias}
        onEdit={handleEditar}
        onDelete={handleEliminar}
        onCrear={handleCrear}
      />

    <Dialog open={openEdit} onClose={() => setOpenEdit(false)} maxWidth="md" fullWidth>
      <DialogTitle>Editar Familia</DialogTitle>
      <DialogContent dividers>
        <form onSubmit={handleSubmit}>
          <FamiliaForm values={formulario} onChange={handleChange} editando={editando} />
        </form>
      </DialogContent>
    </Dialog>
    </Container>
  );
}
