import React from "react";
import Image from "next/image";

import { Grid, Box, Card, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import hdbsLogo from "public/asset/images/hdbs-logo.png";
import checkIcon from "public/asset/images/checkIcon.svg";
import ratingIcon from "public/asset/images/Rating.svg";
import { ButtonCustom } from "components/commons";
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

const RegisterSuccessPage = () => {
  const classes = useStyles();

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
                ĐĂNG KÝ THÀNH CÔNG
              </Box>
            </Grid>
            {/* <Grid item>
              <Box textAlign="center">Chia sẻ</Box>
            </Grid> */}
            <Grid item>
              <Box textAlign="center" className={classes.textSubTitle}>
                Công ty cổ phần chứng khoán HDBS
              </Box>
            </Grid>
            <Grid item>
              Quý khách đã yêu cầu đăng ký mở tài khoản giao dịch chứng khoán
              HDBS thành công. HDBS sẽ liên hệ với Quý khách để hướng dẫn hoàn
              tất thủ tục trong vòng 1 ngày làm việc. Trường hợp cần hỗ trợ. Quý
              khách vui lòng liên hệ hotline của HDBS theo số xxxxxxxxxxx
            </Grid>
          </Grid>
        </Box>

        <Box className={classes.ratingWrapper} p={2} mt={4}>
          <Grid container spacing={1}>
            <Grid item xs={8}>
              Quý khách đã thực hiện đăng ký mở tài khoản chứng khoán thành
              công. Quý khách đánh giá giao dịch này thế nào ?
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
        <ButtonCustom fullWidth variant="contained" color="secondary">
          Giao dịch khác
        </ButtonCustom>
      </Box>
    </div>
  );
};

export default RegisterSuccessPage;
