import React, { ChangeEvent, ReactNode } from "react";
import Select, { SelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";
import { OptionSelectType } from "commons/constants/types";
import cn from "classnames";
const useStyles = makeStyles(() => ({
  root: {
    borderRadius: "5px !important",
    height: 50,
  },
}));
interface Props<T> extends SelectProps {
  options: T[];
  renderLabel?(prop: T): string | JSX.Element;
  className?: string;
  placeholder?: string;
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

const SelectCustom = <T extends OptionSelectType>(props: Props<T>) => {
  const { options, renderLabel, className, placeholder, ...rest } = props;
  const classes = useStyles();
  return (
    <Select displayEmpty {...rest} className={cn(classes.root, className)}>
      {placeholder && (
        <MenuItem disabled value="">
          <em>{placeholder}</em>
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
  );
};

export default SelectCustom;
