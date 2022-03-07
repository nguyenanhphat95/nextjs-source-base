import React, { useState, useMemo } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { Grid, IconButton, InputAdornment, Box, Theme } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import cn from "classnames";

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
  maxLength?: number;
  regex?: RegExp;
};

const InputCustom = React.forwardRef(
  (props: BaseInputProps, ref: React.Ref<HTMLInputElement>) => {
    const {
      label,
      regex,
      maxLength,
      errorMsg,
      onChange,
      type,
      className,
      ...rest
    } = props;
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

    const _handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (value && regex && !regex.test(value)) {
        return;
      }

      if (!maxLength) {
        onChange && onChange(event);
        return;
      }

      if (value.length > maxLength) {
        return;
      }
      onChange && onChange(event);
    };

    return (
      <Grid direction="column" container spacing={1}>
        {label && (
          <Grid item className={classes.label}>
            {label}
          </Grid>
        )}
        <Grid item>
          <TextField
            ref={ref}
            type={typeNew}
            className={cn(classes.root, className)}
            onChange={_handleChange}
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
            {...rest}
          />
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
