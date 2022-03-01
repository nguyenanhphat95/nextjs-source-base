import React, { useRef, useState } from "react";
import { useRouter } from "next/router";

import { Grid, Box, Card, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { getLanguage } from "commons/helpers";
import { ButtonCustom, Rating } from "components/commons";
import resources from "pages/assets/translate.json";
import * as hdbsServices from "services/hdbsService";
import _get from "lodash/get";
import {
  useScreenshot,
  createFileName,
} from "commons/hooks/sceenshot/useScreenShot";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: "16px 6px",
  },
  textShare: {
    color: "#a4a4a4",
    fontWeight: 500,
    textDecoration: "underline",
    cursor: "pointer",
  },
  textTitle: {
    color: "#b80000",
    fontSize: 17,
    fontWeight: 500,
  },
  textSubTitle: {
    fontSize: 16,
  },
  textContent: {
    fontSize: 15,
    textAlign: "justify",
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
}

const RegisterSuccessPage = (props: Props) => {
  const { onClickOtherTransaction } = props;
  const rootRef = useRef<HTMLDivElement>(null);

  const [image, takeScreenshot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const [rateValue, setRateValue] = useState(0);
  const classes = useStyles();

  const router = useRouter();
  const lang = getLanguage(router);
  const t = _get(resources, [lang, "registerSuccessPage"]);

  const _handleChangeRating = (numberRating: number) => {
    setRateValue(numberRating);
    if (!numberRating) {
      return;
    }

    hdbsServices.createRatingApi(numberRating);
  };

  const download = (
    image: string,
    { name = "HDBS", extension = "png" } = {}
  ) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () =>
    takeScreenshot(rootRef.current).then(download);

  return (
    <>
      <div ref={rootRef} className={classes.root}>
        <Card>
          <Box p={2}>
            <Box>
              <img
                width={95}
                height={26}
                src="/asset/images/hdbs-logo2.png"
                alt="hdbs-logo"
              />
            </Box>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <Box textAlign="center">
                  <img
                    width={50}
                    height={50}
                    src="/asset/images/checkIcon.svg"
                    alt="check-icon"
                  />
                </Box>
              </Grid>
              <Grid item>
                <Box textAlign="center" className={classes.textTitle}>
                  {t?.title}
                </Box>
              </Grid>
              <Grid item>
                <Box textAlign="center">
                  <span
                    onClick={downloadScreenshot}
                    className={classes.textShare}
                  >
                    Chia sẻ
                  </span>
                </Box>
              </Grid>
              <Grid item>
                <Box textAlign="center" className={classes.textSubTitle}>
                  {t?.subtitle}
                </Box>
              </Grid>
              <Grid item>
                <Box px={1} className={classes.textContent}>
                  {t?.content}{" "}
                  <b style={{ whiteSpace: "nowrap" }}>(84.28) 7307 6966</b>
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
                <img
                  style={{ width: "100%" }}
                  src="/asset/images/Rating.svg"
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
    </>
  );
};

export default RegisterSuccessPage;
