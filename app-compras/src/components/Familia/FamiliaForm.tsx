import { Grid, Box } from "@mui/material";
import { Familia } from "./familia.types";
import InputField from "../comunes/InputField";
import IconButtonWithTooltip from "../comunes/IconButtonWithTooltip";
import SaveIcon from "@mui/icons-material/Save";

export default function FamiliaForm({ values, onChange, editando }: {
  values: Familia;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editando: boolean;
}) {
  return (
    <Box sx={{ backgroundColor: "#fff", p: { xs: 1, sm: 2 }, borderRadius: 2, boxShadow: 1, mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <InputField name="cod_familia" label="Código" value={values.cod_familia} onChange={onChange} required disabled={editando} fullWidth />
        </Grid>
        <Grid item xs={12} sm={8}>
          <InputField name="dsc_familia" label="Descripción" value={values.dsc_familia} onChange={onChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputField name="cst_unit_prom" label="Costo Promedio" value={values.cst_unit_prom} onChange={onChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputField name="flg_sis_fam" label="Sistema" value={values.flg_sis_fam} onChange={onChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputField name="corr_subfam" label="Correlativo Subfam" value={values.corr_subfam} onChange={onChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputField name="cst_unit_cif" label="Costo CIF" value={values.cst_unit_cif} onChange={onChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputField name="flg_replica" label="Replica" value={values.flg_replica} onChange={onChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputField name="cod_usuario_c" label="Usuario Creador" value={values.cod_usuario_c} onChange={onChange} fullWidth />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputField name="fch_crea" label="Fecha Creación" type="date" value={values.fch_crea || ""} onChange={onChange} InputLabelProps={{ shrink: true }} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <IconButtonWithTooltip
            type="submit"
            title={editando ? "Actualizar" : "Guardar"}
            icon={<SaveIcon />}
          />
        </Grid>
      </Grid>
    </Box>
  );
}