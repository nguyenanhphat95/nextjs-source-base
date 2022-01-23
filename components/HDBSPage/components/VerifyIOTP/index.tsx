import React, { useState, useContext } from "react";
import { Card, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import InputOTP from "components/commons/InputOTP";
import ButtonCustom from "components/commons/Button";
import TKCKContext from "components/HDBSPage/contexts/TKCKContextValue";

const useStyles = makeStyles(() => ({
  root: {
    paddingBottom: 60,
  },
  textTitle: {
    fontSize: 14,
    fontWeight: 500,
  },
  textSubTitle: {
    fontSize: 14,
    fontWeight: 300,
  },
  textLabelOtp: {
    fontSize: 14,
    fontWeight: 300,
  },
  borderBottom: {
    borderBottom: "1px solid",
  },
}));

interface Props {
  onSubmit?: (otp: string) => void;
  loading?: boolean;
}

const VerifyOTP = (props: Props) => {
  const { onSubmit, loading } = props;
  const classes = useStyles();
  const [otp, setOtp] = useState("");

  return (
    <div className={classes.root}>
      <Card>
        <Box p={2} className={classes.borderBottom}>
          <div className={classes.textTitle}>Mật khẩu giao dịch</div>
          <div className={classes.textSubTitle}>
            Vui lòng nhập OTP để xác thực đăng ký
          </div>
        </Box>
        <Box p={2}>
          <InputOTP
            label={<div className={classes.textLabelOtp}>Nhập mã OTP</div>}
            onChange={setOtp}
          />
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
