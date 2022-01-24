import React from "react";
import { Theme, Select, SelectProps, Box, MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { OptionSelectType } from "commons/constants/types";
import cn from "classnames";
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: "5px !important",
    height: 50,
  },
  errorMsg: {
    color: theme.palette?.error?.dark,
    fontSize: 14,
  },
}));
interface Props<T> extends SelectProps {
  options: T[];
  renderLabel?(prop: T): string | JSX.Element;
  className?: string;
  placeholder?: string;
  errorMsg?: string;
  loading?: boolean;
}

function getLabel<T extends OptionSelectType>({
  option,
  renderLabel,
}: {
  option: T;
  renderLabel: Props<T>["renderLabel"];
}) {
  if (typeof renderLabel === "function") {
    return renderLabel(option);
  }

  const { value } = option;
  return value;
}

const SelectCustom = React.forwardRef(
  <T extends OptionSelectType>(
    props: Props<T>,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const {
      disabled,
      options,
      loading,
      renderLabel,
      className,
      placeholder,
      errorMsg,
      ...rest
    } = props;

    const classes = useStyles();

    return (
      <>
        <Select
          disabled={disabled || loading}
          ref={ref}
          displayEmpty
          {...rest}
          className={cn(classes.root, className)}
        >
          {placeholder && (
            <MenuItem disabled value="">
              <em>{loading ? "Loading data" : placeholder}</em>
            </MenuItem>
          )}
          {options &&
            options.map((option: T) => {
              const { id } = option;
              return (
                <MenuItem value={id} key={id}>
                  {getLabel<T>({ option, renderLabel })}
                </MenuItem>
              );
            })}
        </Select>
        {errorMsg && (
          <Box>
            <span className={classes.errorMsg}>{errorMsg}</span>
          </Box>
        )}
      </>
    );
  }
);

export default SelectCustom;
