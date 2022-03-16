import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import {
  Grid,
  IconButton,
  InputAdornment,
  Box,
  Theme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    fontSize: 15,
    borderRadius: 40,
    "&  > div": {
      borderRadius: "inherit",
      // height: 38,
      background: "#e9e9e98f",
    },
    "& input": {
      padding: 15,
      "&::placeholder": {
        // textOverflow: "ellipsis !important",
        fontSize: 15,
      },
    },
  },
  label: {
    fontSize: 14,
    fontWeight: 400,
  },
  errorMsg: {
    color: "red",
    fontSize: 14,
    marginLeft: 5,
  },
  input: {
    border: "white",
  },
}));

export type BaseInputProps = TextFieldProps & {
  label?: string;
  errorMsg?: string;
  isPassword?: boolean;
};

const InputCustom = React.forwardRef(
  (props: BaseInputProps, ref: React.Ref<HTMLInputElement>) => {
    const { isPassword, error, errorMsg, label, ...rest } = props;
    const classes = useStyles();
    const [eyeStatus, setEyeStatus] = React.useState<boolean>(false);
    // const _mouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    //   event.preventDefault();
    // };

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
            {...rest}
            // size="small"
            type={isPassword ? (!eyeStatus ? "password" : "text") : "text"}
            className={classes.root}
            InputProps={{
              classes: { notchedOutline: !error ? classes.input : "" },
              endAdornment: isPassword && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setEyeStatus((prev) => !prev)}
                    // onMouseDown={_mouseDownPassword}
                    edge="end"
                    style={{marginRight: 0}}
                  >
                    {eyeStatus ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            error={error}
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
