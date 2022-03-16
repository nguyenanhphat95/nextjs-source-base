import { getLanguage } from "commons/helpers";
import { Box, TextField, Theme, Typography } from "@mui/material";
import _get from "lodash/get";
import { useRouter } from "next/router";
import resources from "pages/assets/translate.json";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { ButtonCustom } from "components/commons";
import InputSingle from "components/ChangePasswordPage/Commons/InputOTP/InputSingle";
import { changePass, verifyOTPApi } from "services/changePassword";
import WaitingPopup from "components/Popup";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontSize: 23,
    fontWeight: 700,
    margin: "20px 0",
    width: "100%",
    textAlign: "center",
  },
  formTitle: {
    fontWeight: 700,
    margin: 15,
  },
  important: {
    color: "red",
  },
  otpBox: {
    width: 50,
    height: 50,
  },
  textLabelOtp: {
    fontSize: 14,
    fontWeight: 300,
  },
  otbText: {
    width: 45,
    background: "#e9e9e98f",
    borderRadius: 10,
    "& .MuiInputBase-root": {
      height: 45,
    },
  },
  input: {
    border: "none",
  },
}));

interface IOtb {
  cre: string;
  publicKey: string;
  user: any;
  code: string;
}

function Otp(props: IOtb) {
  const { cre, publicKey, user, code } = props;
  const router = useRouter();
  const classes = useStyles();
  const lang = getLanguage(router);
  const [loading, setLoading] = useState(false);
  const t = _get(resources, [lang, "confirmOTP"]);
  const [otp, setOtp] = React.useState<string>("");
  const [time, setTime] = React.useState<number>(30);

  React.useEffect(() => {
    var second = time;
    let myInterval = setInterval(() => {
      if (second > 0) {
        setTime((prev) => prev - 1);
      }

      if (second === 0) {
        clearInterval(myInterval);
      }
      second--;
    }, 1000);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const otpResponse = await verifyOTPApi(user.user, otp);
    console.log("verify otp: ", otpResponse);
    if (otpResponse.data.resultCode !== "00") {
      const res = await changePass(cre, publicKey);
      // setLoading(false);
      console.log("changepassword response: ", res);
      router.push({
        pathname: router.query.redirect_uri as string,
        query: {
          code,
        },
      });
    } else {
      setLoading(false);
    }
  };

  return (
    <Box>
      <WaitingPopup open={loading} />
      <Box component="form" onSubmit={handleSubmit} textAlign="center">
        <Typography className={classes.title}>{t.title}</Typography>
        <Typography style={{ margin: 10 }}>{t.content}</Typography>
        <Typography className={classes.formTitle}>{t.label}</Typography>
        <Box
          maxWidth={300}
          margin="auto"
          my={2}
          // display="flex"
          // justifyContent="space-between"
        >
          <InputSingle isPassword onChange={(value: string) => setOtp(value)} />
        </Box>
        <Typography>{t.question}</Typography>
        <Typography className={classes.important}>{t.resendOTP}</Typography>
        <Box color="#6F7279" my={2}>
          <Typography>({time}s)</Typography>
        </Box>
        <Box mt={2}>
          <ButtonCustom
            disabled={otp.length < 6}
            variant="contained"
            color="secondary"
            type="submit"
          >
            {t.btnSubmit}
          </ButtonCustom>
        </Box>
      </Box>
    </Box>
  );
}

export default Otp;
