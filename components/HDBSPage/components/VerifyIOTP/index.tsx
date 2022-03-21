import React, { useState } from "react";
import { Card, Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import InputOTP from "components/commons/InputOTP";
import ButtonCustom from "components/commons/Button";

const useStyles = makeStyles(() => ({
  root: {
    paddingBottom: 60,
  },
  card: {
    borderTop: "1px solid #e8e8e8",
  },
  textTitle: {
    fontSize: 14,
    fontWeight: 400,
  },
  textSubTitle: {
    fontSize: 14,
    fontWeight: 300,
  },
  textLabelOtp: {
    fontSize: 14,
    fontWeight: 400,
    color: "#838383",
  },
  textResendOTP: {
    color: "#c81d25",
    textDecoration: "underline",
    fontSize: 15,
    fontWeight: 500,
    cursor: "pointer",
  },
  borderBottom: {
    borderBottom: "1px dashed #e8e8e8",
  },
}));

interface Props {
  onSubmit?: (otp: string) => void;
  loading?: boolean;
  onResendOTP: () => void;
}

const VerifyOTP = (props: Props) => {
  const { onSubmit, loading, onResendOTP } = props;
  const classes = useStyles();
  const [otp, setOtp] = useState("");

  const _handleResendOTP = () => {
    if (loading) {
      return;
    }
    onResendOTP();
  };
  return (
    <div className={classes.root}>
      <Card elevation={0} className={classes.card}>
        <Box p={2} className={classes.borderBottom}>
          <Grid container spacing={1}>
            <Grid item xs="auto">
              <img width={20} height={20} src="/asset/images/Lock.svg" />
            </Grid>
            <Grid item xs={true}>
              <div className={classes.textTitle}>Mật khẩu giao dịch</div>
              <div className={classes.textSubTitle}>
                Vui lòng nhập OTP để xác thực đăng ký
              </div>
            </Grid>
          </Grid>
        </Box>
        <Box p={2}>
          <Grid container direction="column" spacing={1}>
            <Grid item className={classes.textLabelOtp}>
              Nhập mã OTP
            </Grid>
            <Grid item>
              <InputOTP onChange={setOtp} />
            </Grid>
            <Grid item>
              <Box mt={1} textAlign="center">
                <span
                  onClick={_handleResendOTP}
                  className={classes.textResendOTP}
                >
                  Gửi lại OTP
                </span>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>
      <Box px={2} mt={4}>
        <ButtonCustom
          loading={loading}
          disabled={otp.length < 6}
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => onSubmit && onSubmit(otp)}
        >
          Xác nhận
        </ButtonCustom>
      </Box>
    </div>
  );
};
export default VerifyOTP;
