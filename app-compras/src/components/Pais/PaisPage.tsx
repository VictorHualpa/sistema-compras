// PaisPage.tsx con validación de campos y confirmación profesional
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; 

import { Pais } from "./pais.types";
import {
  obtenerPaises,
  crearPais,
  actualizarPais,
  eliminarPais,
} from "../../api/paisApi";
import PaisForm from "./PaisForm";
import PaisTabla from "./PaisTabla";
import ConfirmDialog from "../comunes/ConfirmDialog";
import CustomSnackbar from "../comunes/CustomSnackbar";
import useSnackbar from "../../hooks/useSnackbar";
import BotonRedondo from "../comunes/BotonRedondo";
  
import AddCircleIcon from '@mui/icons-material/AddCircle';

const paisInicial: Pais = {
  cod_pais: "",
  nom_pais: "",
  flg_replica: "",
  cod_usuario_c: "",
  fch_crea: null,
  cod_usuario_m: "",
  fch_mod: null,
  nom_pais_en_ingles: "",
  flg_estado: "",
};

export default function PaisPage() {
  const [paises, setPaises] = useState<Pais[]>([]);
  const [formulario, setFormulario] = useState<Pais>({ ...paisInicial });
  const [editando, setEditando] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [confirmarEliminar, setConfirmarEliminar] = useState(false);
  const [paisAEliminar, setPaisAEliminar] = useState<string | null>(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [accionPendiente, setAccionPendiente] = useState<"crear" | "editar">("crear");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const theme = useTheme();
  const esMovil = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    open,
    message,
    severity,
    showSnackbar,
    closeSnackbar,
  } = useSnackbar();

  const cargarPaises = async () => {
    const data = await obtenerPaises();
    setPaises(data);
  };

  useEffect(() => {
    cargarPaises();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const limpiarFechas = (datos: Pais): Pais => {
    return {
      ...datos,
      fch_crea: datos.fch_crea === "" ? null : datos.fch_crea,
      fch_mod: datos.fch_mod === "" ? null : datos.fch_mod,
    };
  };

  const validarFormulario = (): boolean => {
    const nuevosErrores: { [key: string]: string } = {};
    if (!formulario.cod_pais.trim()) nuevosErrores.cod_pais = "Código obligatorio";
    if (!formulario.nom_pais.trim()) nuevosErrores.nom_pais = "Nombre obligatorio";
    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleConfirmarAccion = async () => {
    const datosLimpios = limpiarFechas(formulario);

    if (accionPendiente === "editar") {
      await actualizarPais(formulario.cod_pais, datosLimpios);
      showSnackbar("Registro actualizado correctamente", "success");
    } else {
      await crearPais(datosLimpios);
      showSnackbar("País creado exitosamente", "success");
    }

    setFormulario({ ...paisInicial });
    setErrors({});
    setEditando(false);
    setModalAbierto(false);
    setMostrarConfirmacion(false);
    cargarPaises();
  };

  const abrirConfirmacion = () => {
    if (!validarFormulario()) {
      showSnackbar("Por favor completa los campos obligatorios", "error");
      return;
    }
    setAccionPendiente(editando ? "editar" : "crear");
    setMostrarConfirmacion(true);
  };

  const handleEditar = (pais: Pais) => {
    setFormulario({
      ...pais,
      fch_crea: pais.fch_crea ? pais.fch_crea.split("T")[0] : "",
      fch_mod: pais.fch_mod ? pais.fch_mod.split("T")[0] : "",
    });
    setErrors({});
    setEditando(true);
    setModalAbierto(true);
  };

  const confirmarEliminarPais = (id: string) => {
    setPaisAEliminar(id);
    setConfirmarEliminar(true);
  };

  const handleEliminar = async () => {
    if (paisAEliminar) {
      await eliminarPais(paisAEliminar);
      showSnackbar("Registro eliminado correctamente", "success");
      cargarPaises();
    }
    setConfirmarEliminar(false);
    setPaisAEliminar(null);
  };

  const abrirModalNuevo = () => {
    setFormulario({ ...paisInicial });
    setErrors({});
    setEditando(false);
    setModalAbierto(true);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={esMovil ? "start" : "center"}
        flexDirection={esMovil ? "column" : "row"}
        gap={1}
        mb={1}      // Menor separación abajo del título
        mt={0.1}    // Menor espacio arriba
      >
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 0.1 }}>
          Gestión de Países
        </Typography>
          

        <BotonRedondo
          onClick={abrirModalNuevo}
          icon={<AddCircleIcon />} 
          tooltip="Crear nuevo país"
        />


      </Box>

      <PaisTabla
        paises={paises}
        onEditar={handleEditar}
        onEliminar={confirmarEliminarPais}
      />

      <Dialog
        open={modalAbierto}
        onClose={() => setModalAbierto(false)}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        <DialogTitle>{editando ? "Editar País" : "Nuevo País"}</DialogTitle>
        <DialogContent dividers sx={{ maxHeight: "80vh" }}>
          <Box>
            <Grid container spacing={2}>
              <PaisForm
                values={formulario}
                onChange={handleChange}
                editando={editando}
                errors={errors}
              />
            </Grid>
            <Box mt={3} textAlign="right">
              <Button variant="contained" onClick={abrirConfirmacion}>
                {editando ? "Actualizar" : "Guardar"}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={mostrarConfirmacion}
        title={accionPendiente === "crear" ? "¿Crear país?" : "¿Actualizar país?"}
        message="¿Estás seguro de que deseas continuar con esta acción?"
        icon={<AddCircleIcon color="primary" />}
        confirmColor="primary"
        confirmText="Sí, confirmar"
        cancelText="Cancelar"
        onClose={() => setMostrarConfirmacion(false)}
        onConfirm={handleConfirmarAccion}
      />

      <ConfirmDialog
        open={confirmarEliminar}
        title="¿Eliminar país?"
        message="Esta acción no se puede deshacer. ¿Estás seguro de eliminar este país?"
        icon={<DeleteIcon color="error" />}
        confirmColor="error"
        confirmText="Eliminar"
        cancelText="Cancelar"
        onClose={() => setConfirmarEliminar(false)}
        onConfirm={handleEliminar}
      />

      <CustomSnackbar
        open={open}
        onClose={closeSnackbar}
        message={message}
        severity={severity}
      />
    </Container>
  );
} 
