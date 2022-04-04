import React, { ChangeEvent, useState } from "react";
import InputCustom from "../Input";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  customInput: {
    "& input": {
      textAlign: "center",
    },
  },
}));

interface Props {
  onChange?: (otp: string) => void;
  otp: string;
}

const InputSingle = (props: Props) => {
  const classes = useStyles();
  const { onChange, otp } = props;
  // const [value, setValue] = useState("");
  const _handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^\d+$/;    
    const value = e.target.value;    
    console.log("test: ", regex.test(value));
    if (+value > 999999) {
      return;
    }
    onChange && onChange(value);
  };
  return (
    <InputCustom
      // className={classes.customInput}
      value={otp}
      // type="number"
      type="number" 
      // inputmode="numeric"       
      onChange={_handleChangeInput}
      inputProps={{min: 0, style: { textAlign: 'center' }, inputmode: "numeric", pattern: "[0-9]*"}}
    />
  );
};

export default InputSingle;
