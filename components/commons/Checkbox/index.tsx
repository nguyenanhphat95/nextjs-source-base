import React from "react";
import { Checkbox, CheckboxProps, FormControlLabel, Grid } from "@mui/material";
import Image from "next/image";

import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import checkboxCheckedIcon from "public/asset/images/checkbox-checked.png";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // "& svg": {
    //   color: theme.palette.secondary.dark,
    // },
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
            control={
              <>
                <Checkbox
                  {...rest}
                  checkedIcon={
                    <Image width={22} height={20} src={checkboxCheckedIcon} />
                  }
                />
              </>
            }
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
