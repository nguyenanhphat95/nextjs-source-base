import React, { useState, useMemo } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { Grid, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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
  const { label, type, ...rest } = props;
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const _toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const _mouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const typeNew = useMemo(() => {
    if (isPassword) {
      return showPassword ? "text" : "password";
    }
    return type;
  }, [isPassword, showPassword]);

  return (
    <Grid direction="column" container spacing={1}>
      {label && (
        <Grid item className={classes.label}>
          {label}
        </Grid>
      )}
      <Grid item>
        <TextField
          type={typeNew}
          {...rest}
          className={classes.root}
          InputProps={{
            endAdornment: isPassword && (
              <InputAdornment position="end">
                <IconButton
                  onClick={_toggleShowPassword}
                  onMouseDown={_mouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default InputCustom;
