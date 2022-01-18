import React from "react";
import { Checkbox, CheckboxProps, FormControlLabel, Grid } from "@mui/material";

import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& svg": {
      color: theme.palette.secondary.dark,
    },
  },
}));
interface Props extends CheckboxProps {
  label?: string | React.ReactElement;
  endIcon?: React.ReactElement;
  onClickEndIcon?: () => void;
}

const CheckboxCustom = React.forwardRef(
  (props: Props, ref: React.Ref<HTMLButtonElement>) => {
    const classes = useStyles();
    const { label, endIcon, onClickEndIcon, ...rest } = props;

    return (
      <Grid wrap="nowrap" container alignItems="center">
        <Grid item xs={true}>
          <FormControlLabel
            ref={ref}
            className={classes.root}
            control={<Checkbox {...rest} />}
            label={label || ""}
          />
        </Grid>
        {endIcon && (
          <Grid
            onClick={() => onClickEndIcon && onClickEndIcon()}
            item
            xs="auto"
          >
            {endIcon}
          </Grid>
        )}
      </Grid>
    );
  }
);

export default CheckboxCustom;
