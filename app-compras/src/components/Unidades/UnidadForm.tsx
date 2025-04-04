import { Grid, TextField } from "@mui/material";
import { Unidad } from "./unidad.types";

export default function UnidadForm({ values, onChange, editando }: {
  values: Unidad;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editando: boolean;
}) {
  return (
    <>
      <Grid item xs={12} sm={4}>
        <TextField name="cod_unidad" label="Código" value={values.cod_unidad} onChange={onChange} fullWidth required disabled={editando} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <TextField name="dsc_unidad" label="Descripción" value={values.dsc_unidad} onChange={onChange} fullWidth />
      </Grid>
      <Grid item xs={6} sm={4}>
        <TextField name="pso_refenc" label="Peso" value={values.pso_refenc} onChange={onChange} fullWidth />
      </Grid>
      <Grid item xs={6} sm={4}>
        <TextField name="cnt_bultos" label="Bultos" value={values.cnt_bultos} onChange={onChange} fullWidth />
      </Grid>
      <Grid item xs={6} sm={4}>
        <TextField name="flg_replica" label="Replica" value={values.flg_replica} onChange={onChange} fullWidth />
      </Grid>
      <Grid item xs={6} sm={4}>
        <TextField name="cod_usuario_c" label="Usuario Creador" value={values.cod_usuario_c} onChange={onChange} fullWidth />
      </Grid>
      <Grid item xs={6} sm={4}>
        <TextField name="fch_crea" label="Fecha Creación" type="date" value={values.fch_crea || ""} onChange={onChange} InputLabelProps={{ shrink: true }} fullWidth />
      </Grid>
      <Grid item xs={6} sm={4}>
        <TextField name="cod_usuario_m" label="Usuario Modificador" value={values.cod_usuario_m} onChange={onChange} fullWidth />
      </Grid>
      <Grid item xs={6} sm={4}>
        <TextField name="fch_mod" label="Fecha Modificación" type="date" value={values.fch_mod || ""} onChange={onChange} InputLabelProps={{ shrink: true }} fullWidth />
      </Grid>
    </>
  );
}
