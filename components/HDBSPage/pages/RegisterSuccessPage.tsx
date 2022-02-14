import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { Grid, Box, Card, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { getLanguage } from "commons/helpers";
import { ButtonCustom, Rating } from "components/commons";
import resources from "pages/assets/translate.json";
import * as hdbsServices from "services/hdbsService";

import hdbsLogo from "public/asset/images/hdbs-logo2.png";
import checkIcon from "public/asset/images/checkIcon.svg";
import ratingIcon from "public/asset/images/Rating.svg";
import _get from "lodash/get";
import { FormDataFinal } from "../interfaces";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: "16px 6px",
  },
  textTitle: {
    color: theme.palette.error.dark,
    fontSize: 18,
    fontWeight: 500,
  },
  textSubTitle: {
    fontSize: 16,
  },
  textContent: {
    fontSize: 15,
  },
  ratingWrapper: {
    background: "#FAFAFA",
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

interface Props {
  onClickOtherTransaction: () => void;
  data: FormDataFinal;
}

const RegisterSuccessPage = (props: Props) => {
  const { onClickOtherTransaction, data } = props;
  const [rateValue, setRateValue] = useState(0);
  const classes = useStyles();

  const router = useRouter();
  const lang = getLanguage(router);
  const t = _get(resources, [lang, "registerSuccessPage"]);

  const _handleChangeRating = (numberRating: number) => {
    setRateValue(numberRating);

    if (!data.merchantId || !data.terminalId) {
      return;
    }

    setRateValue(numberRating);
    hdbsServices.createRatingApi(
      numberRating,
      data.merchantId,
      data.terminalId
    );
  };

  return (
    <div className={classes.root}>
      <Card>
        <Box p={2}>
          <Box>
            <Image width={100} height={40} src={hdbsLogo} alt="hdbs-logo" />
          </Box>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Box textAlign="center">
                <Image
                  width={50}
                  height={50}
                  src={checkIcon}
                  alt="check-icon"
                />
              </Box>
            </Grid>
            <Grid item>
              <Box textAlign="center" className={classes.textTitle}>
                {t?.title}
              </Box>
            </Grid>
            {/* <Grid item>
              <Box textAlign="center">Chia sẻ</Box>
            </Grid> */}
            <Grid item>
              <Box textAlign="center" className={classes.textSubTitle}>
                {t?.subtitle}
              </Box>
            </Grid>
            <Grid item>
              <Box px={2} className={classes.textContent}>
                {t?.content} <b>(84.28) 7307 6966</b>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box className={classes.ratingWrapper} p={2} mt={4}>
          <Grid container spacing={1}>
            <Grid item xs={8} className={classes.textContent}>
              {t?.question}
            </Grid>
            <Grid item xs={4} className={classes.imageRatingWrapper}>
              <Image
                width={50}
                height={50}
                src={ratingIcon}
                alt="rating-icon"
              />
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.bgRating} px={3} py={1}>
          <Rating defaultValue={rateValue} onChange={_handleChangeRating} />
        </Box>
      </Card>

      <Box mt={2}>
        <ButtonCustom
          onClick={onClickOtherTransaction}
          fullWidth
          variant="contained"
          color="secondary"
        >
          {t?.otherTransaction}
          {/* Giao dịch khác */}
        </ButtonCustom>
      </Box>
    </div>
  );
};

export default RegisterSuccessPage;
