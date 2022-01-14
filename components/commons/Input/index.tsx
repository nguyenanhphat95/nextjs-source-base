import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    borderRadius: 40,
    "&  > div": {
      borderRadius: "inherit",
      height: 58,
    },
    "& input": {
      marginLeft: 10,
    },
  },
  label: {
    fontSize: 14,
    fontWeight: 400,
  },
}));

export type BaseInputProps = TextFieldProps & {
  label?: string;
};

const InputCustom = (props: BaseInputProps) => {
  const { label, ...rest } = props;
  const classes = useStyles();

  return (
    <Grid direction="column" container spacing={1}>
      {label && (
        <Grid item className={classes.label}>
          {label}
        </Grid>
      )}
      <Grid item>
        <TextField {...rest} className={classes.root} />
      </Grid>
    </Grid>
  );
};

export default InputCustom;
