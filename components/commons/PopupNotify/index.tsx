import React from "react";
//
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { makeStyles } from "@mui/styles";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Box from "@mui/system/Box";
import { Theme } from "@mui/system/createTheme";

import ButtonCustom from "../Button";
// import notifyError from "public/images/notifyError.png";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CountDownTimer, { TimerInput } from "../CountDownTimer";
import cn from "classnames";

interface Props extends DialogProps {
  toggleModal: () => void;
  iconNotify?: React.ReactNode;
  title?: string;
  desc?: string;
  hoursMinSecs?: TimerInput;
}

const useStyles = makeStyles((theme: Theme) => ({
  rootDialog: {
    "& .MuiPaper-root": {
      width: "20vw",
      borderRadius: "15px",
      // [theme.breakpoints?.down("sm")]: {
      //   width: "90vw",
      // },
    },
  },
  rootDialogMobile: {
    "& .MuiPaper-root": {
      width: "90vw",
    },
  },
  title: {
    fontSize: 22,
    fontWeight: 500,
    textAlign: "center",
  },
  desc: {
    fontWeight: 400,
    fontSize: 16,
    textAlign: "center",
  },
}));

const PopupNotify = (props: Props) => {
  const {
    title = "Thông báo",
    desc = "Điều khoản, điều kiện",
    toggleModal,
    open,
    hoursMinSecs,
    ...rest
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      className={cn(classes.rootDialog, classes.rootDialogMobile)}
      {...rest}
    >
      <Box pt={1} pb={2} px={2}>
        <Box display="flex" justifyContent="end">
          <IconButton onClick={toggleModal} edge="end">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Box display="flex" justifyContent="center">
                <img src="/sso/images/notifyError.png" alt="notify" />
              </Box>
            </Grid>
            <Grid item className={classes.title}>
              {title}
            </Grid>
            <Grid item className={classes.desc}>
              {desc}
            </Grid>
            <Grid item justifyContent="center" display="flex">
              <ButtonCustom
                onClick={toggleModal}
                variant="contained"
                color="secondary"
              >
                Đóng
              </ButtonCustom>
            </Grid>
            <Grid item>
              <CountDownTimer
                textBefore="Tự động đóng sau"
                hoursMinSecs={hoursMinSecs}
                onFinish={toggleModal}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Dialog>
  );
};

export default PopupNotify;
