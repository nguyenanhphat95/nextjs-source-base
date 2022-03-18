import React, { useMemo } from "react";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "@mui/material/TextareaAutosize";
import { makeStyles } from "@mui/styles";

interface Props extends TextareaAutosizeProps {}

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
  },
  textArea: {
    width: "100%",
    minHeight: "82px",
    border: "2px solid #c3c3c3",
    borderRadius: "8px",
    padding: "17px 10px",
    "&::placeholder": {
      fontFamily: "initial",
      color: "#c3c3c3",
      letterSpacing: "1px",
      fontWeight: 600,
      fontSize: 14,
    },
  },
  numberTextMax: {
    position: "absolute",
    right: 7,
    top: 5,
    fontSize: 13,
    color: "#c3c3c3",
    fontWeight: 600,
  },
}));

const TextAreaCustom = (props: Props) => {
  const classes = useStyles();
  const { value, maxLength, ...rest } = props;

  const lengthOfValue: number = useMemo(() => {
    if (!value) {
      return 0;
    }
    return value.toString().length;
  }, [value]);

  return (
    <div className={classes.root}>
      <TextareaAutosize
        value={value}
        maxLength={maxLength}
        className={classes.textArea}
        {...rest}
      />
      {maxLength && (
        <span className={classes.numberTextMax}>
          {lengthOfValue}/{maxLength}
        </span>
      )}
    </div>
  );
};

export default TextAreaCustom;
