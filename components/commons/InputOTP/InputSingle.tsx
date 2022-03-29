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
}

const InputSingle = (props: Props) => {
  const classes = useStyles();
  const { onChange } = props;
  const [value, setValue] = useState("");
  const _handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (+value > 999999) {
      return;
    }
    setValue(value);
    onChange && onChange(value);
  };
  return (
    <InputCustom
      // className={classes.customInput}
      value={value}
      type="number"
      onChange={_handleChangeInput}
      inputProps={{min: 0, style: { textAlign: 'center' }}}
    />
  );
};

export default InputSingle;
