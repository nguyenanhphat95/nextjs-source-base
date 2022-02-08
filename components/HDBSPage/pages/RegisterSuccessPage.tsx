import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { Grid, Box, Card, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import hdbsLogo from "public/asset/images/hdbs-logo.png";
import checkIcon from "public/asset/images/checkIcon.svg";
import ratingIcon from "public/asset/images/Rating.svg";
import { ButtonCustom } from "components/commons";
import { LANGUAGE } from "commons/constants";
import resources from "pages/assets/translate.json";
import _get from "lodash/get";
import { getLanguage } from "commons/helpers";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: "16px 6px",
  },
  textTitle: {
    color: theme.palette.error.dark,
    fontSize: 20,
    fontWeight: 500,
  },
  textSubTitle: {
    fontSize: 18,
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
}));

interface Props {
  onClickOtherTransaction: () => void;
}

const RegisterSuccessPage = (props: Props) => {
  const { onClickOtherTransaction } = props;
  const classes = useStyles();

  const router = useRouter();
  const lang = getLanguage(router);
  const t = _get(resources, [lang, "registerSuccessPage"]);

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
            <Grid item>{t?.content}</Grid>
          </Grid>
        </Box>

        <Box className={classes.ratingWrapper} p={2} mt={4}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
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
