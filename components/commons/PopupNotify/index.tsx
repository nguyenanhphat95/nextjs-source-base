import React, { useCallback, useRef, useEffect } from "react";
import Image from "next/image";

import { makeStyles } from "@mui/styles";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Box from "@mui/system/Box";
import { Theme } from "@mui/system/createTheme";

import ButtonCustom from "../Button";
import TimerElement from "./timerElement";

import notifyError from "public/images/notifyError.png";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
interface Props extends DialogProps {
  toggleModal: () => void;
  iconNotify?: React.ReactNode;
  title?: string;
  desc?: string;
  timeClose?: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  rootDialog: {
    "& .MuiPaper-root": {
      width: "20vw",
      borderRadius: "15px",
      [theme.breakpoints?.down("sm")]: {
        width: "90vw",
      },
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
    timeClose,
    ...rest
  } = props;
  const classes = useStyles();

  return (
    <Dialog open={open} className={classes.rootDialog} {...rest}>
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
                <Image src={notifyError} alt="notify" />
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
              <TimerElement timeClose={timeClose} toggleModal={toggleModal} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Dialog>
  );
};

export default PopupNotify;
