import React, { ChangeEvent, useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  Box,
  Theme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const useStyles = makeStyles((theme: Theme) => ({
  customInput: {
    width: "100%",
    "&  > div": {
      borderRadius: 40,
      background: "#e9e9e98f",
    },
    "& input": {
      textAlign: "center",
      marginLeft: 50,
    },
  },
  input: {
    border: "white",
  },
}));

interface Props {
  onChange?: (otp: string) => void;
  isPassword: boolean
}

const InputSingle = (props: Props) => {
  const classes = useStyles();
  const { onChange } = props;
  const [value, setValue] = useState("");
  const [eyeStatus, setEyeStatus] = useState<boolean>(false);
  const _mouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const _handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (+value > 999999 || /\D/.test(value)) {
      return;
    }
    setValue(value);
    onChange && onChange(value);
  };
  return (
    <Box>
      <TextField
        className={classes.customInput}
        value={value}
        type={!eyeStatus ? "password" : "text"}
        onChange={_handleChangeInput}
        variant="outlined"
        InputProps={{
          classes: { notchedOutline: classes.input },
          endAdornment: props.isPassword && (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setEyeStatus(!eyeStatus)}
                onMouseDown={_mouseDownPassword}
                edge="end"
                style={{marginRight: 0}}
              >
                {eyeStatus ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default InputSingle;
