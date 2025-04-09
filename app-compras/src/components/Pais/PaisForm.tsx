import { Grid } from "@mui/material";
import { Pais } from "./pais.types";
import InputField from "../comunes/InputField";

interface Props {
  values: Pais;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editando: boolean;
  errors?: Partial<Record<keyof Pais, string>>;
}

export default function PaisForm({ values, onChange, editando, errors = {} }: Props) {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <InputField
          label="Código"
          name="cod_pais"
          value={values.cod_pais}
          onChange={onChange}
          disabled={editando}
          error={!!errors.cod_pais}
          helperText={errors.cod_pais}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputField
          label="Nombre"
          name="nom_pais"
          value={values.nom_pais}
          onChange={onChange}
          error={!!errors.nom_pais}
          helperText={errors.nom_pais}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputField
          label="Nombre en Inglés"
          name="nom_pais_en_ingles"
          value={values.nom_pais_en_ingles}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputField
          label="Estado"
          name="flg_estado"
          value={values.flg_estado}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <InputField
          label="Replica"
          name="flg_replica"
          value={values.flg_replica}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <InputField
          label="Usuario Creador"
          name="cod_usuario_c"
          value={values.cod_usuario_c}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <InputField
          label="Fecha Creación"
          name="fch_crea"
          type="date"
          value={values.fch_crea || ""}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <InputField
          label="Usuario Modificador"
          name="cod_usuario_m"
          value={values.cod_usuario_m}
          onChange={onChange}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <InputField
          label="Fecha Modificación"
          name="fch_mod"
          type="date"
          value={values.fch_mod || ""}
          onChange={onChange}
        />
      </Grid>
    </>
  );
}
