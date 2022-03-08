import React from "react";
import { Checkbox, CheckboxProps, FormControlLabel, Grid } from "@mui/material";
import Image from "next/image";

import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
// import checkboxCheckedIcon from "public/asset/images/checkbox-checked.png";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: "flex-start",
    "& .MuiCheckbox-root": {
      marginTop: "-5px",
    },
    "& .Mui-checked": {
      "& span": {
        width: "23px !important",
      },
    },
    "& .MuiSvgIcon-root": {
      marginTop: "-4px",
    },
  },
  checkboxChecked: {
    marginLeft: "1px",
    width: "23px",
    height: "20px",
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
      <Grid wrap="nowrap" container>
        <Grid item xs={true}>
          <FormControlLabel
            ref={ref}
            className={classes.root}
            control={
              <>
                <Checkbox
                  {...rest}
                  checkedIcon={
                    <img
                      className={classes.checkboxChecked}
                      src="/asset/images/checkbox-checked.png"
                    />
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
