import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { Grid, Theme, Box } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
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
  errorMsg: {
    color: theme.palette?.error?.dark,
    fontSize: 14,
  },
}));

export type BaseInputProps = TextFieldProps & {
  label?: string;
  errorMsg?: string;
};

const InputCustom = React.forwardRef(
  (props: BaseInputProps, ref: React.Ref<HTMLInputElement>) => {
    const { errorMsg, label, ...rest } = props;
    const classes = useStyles();

    return (
      <Grid direction="column" container spacing={1}>
        {label && (
          <Grid item className={classes.label}>
            {label}
          </Grid>
        )}
        <Grid item>
          <TextField ref={ref} {...rest} className={classes.root} />
          {errorMsg && (
            <Box>
              <span className={classes.errorMsg}>{errorMsg}</span>
            </Box>
          )}
        </Grid>
      </Grid>
    );
  }
);

export default InputCustom;
