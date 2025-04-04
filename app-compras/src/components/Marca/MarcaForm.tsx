import { Grid, TextField } from "@mui/material";
import { Marca } from "./marca.types";

export default function MarcaForm({ values, onChange, editando }: {
  values: Marca;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editando: boolean;
}) {
  return (
    <>
      <Grid item xs={12} sm={4}>
        <TextField name="cod_marca" label="Código" value={values.cod_marca} onChange={onChange} fullWidth required disabled={editando} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField name="cod_familia" label="Familia" value={values.cod_familia} onChange={onChange} fullWidth />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField name="dsc_marca" label="Descripción" value={values.dsc_marca} onChange={onChange} fullWidth />
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