import React, { ChangeEvent, useState } from "react";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Box from "@mui/system/Box";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system/createTheme";
import * as hdbsServices from "services/hdbsService";
import { useRouter } from "next/router";
import { ROUTE_STEP } from "components/HDBSPage/consts";


import {
  ButtonCustom,
  InputCustom,
  Rating,
  TextAreaCustom,
} from "components/commons";
interface Props {
  open: boolean;
  onClose: () => void;
  toggleNotify: (desc?: string, onClose?: any, isSuccess?: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  header: {
    background: "#C7262E",
    color: "white",
  },
  title: {
    fontWeight: 600,
  },
  subtitle: {
    fontWeight: 600,
    marginTop: 10,
  },
  textContent: {
    fontSize: 15,
    textAlign: "justify",
  },
  imageRatingWrapper: {
    "& span": {
      width: "100% !important",
      height: "100% !important",
    },
  },
  bgRating: {
    background: "#F2F2F4",
  },
}));

const ModalRating = (props: Props) => {
  const classes = useStyles();
  const { open, onClose, toggleNotify } = props;
  const [rateValue, setRateValue] = useState(0);
  const [ratingNote, setRatingNote] = useState("");
  const router = useRouter();
  const query = router.query;

  const _handleRating = () => {
    if (!rateValue) {
      return;
    }
    query.returnHome = "true";
    hdbsServices
      .createRatingApi(rateValue, ratingNote)
      .then((res) => {
        // onClose();
        toggleNotify(
          "Cảm ơn quý khách đã gửi đánh giá!",
          () =>
            router.push({
              pathname: ROUTE_STEP.stepHome,
              query,
            }),
          true
        );
      })
      .catch(() => onClose());
  };

  const _handleChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setRatingNote(e.target.value);
  };

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <Box p={1} className={classes.header}>
        <Grid alignItems="center" container spacing={1} wrap="nowrap">
          <Grid item xs={true}>
            Đánh giá giao dịch
          </Grid>
          <Grid item xs="auto">
            <IconButton color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Box p={2}>
        <Grid container spacing={1}>
          <Grid item xs={7} className={classes.textContent}>
            <Box>
              <img
                src="/asset/images/HDBanklogo.png"
                style={{ width: "100px" }}
              />
            </Box>
            <Box>
              Quý khách đã thực hiện đăng ký mở tài khoản chứng khoán thành
              công. Quý khách đánh giá giao dịch này thế nào?
            </Box>
          </Grid>
          <Grid item xs={5} className={classes.imageRatingWrapper}>
            <img
              style={{ width: "100%" }}
              src="/asset/images/Rating.svg"
              alt="rating-icon"
            />
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.bgRating} px={1} py={2}>
        <Rating defaultValue={rateValue} onChange={setRateValue} />
      </Box>

      <Box p={2}>
        <TextAreaCustom
          value={ratingNote}
          onChange={_handleChangeInput}
          maxLength={200}
          placeholder="Vui lòng nhập ý kiến của Quý khách"
        />
      </Box>

      <Box p={2}>
        <ButtonCustom
          onClick={_handleRating}
          fullWidth
          variant="contained"
          color="secondary"
          disabled={!rateValue}
        >
          Gửi đánh giá
        </ButtonCustom>
      </Box>
    </Dialog>
  );
};

export default ModalRating;
