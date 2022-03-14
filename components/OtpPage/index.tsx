import { getLanguage } from "commons/helpers";
import { Box, TextField, Theme, Typography } from "@mui/material";
import _get from "lodash/get";
import { useRouter } from "next/router";
import resources from "pages/assets/translate.json";
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { ButtonCustom } from "components/commons";
import InputSingle from "components/commons/InputOTP/InputSingle";
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
  onChangeStep: () => void;
}

function Otp(props: IOtb) {
  const { cre, publicKey, user, onChangeStep } = props;
  const router = useRouter();
  const classes = useStyles();
  const lang = getLanguage(router);
  const [loading, setLoading] = useState(false);
  const t = _get(resources, [lang, "otp"]);
  const [otp, setOtp] = React.useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true)
    const otpResponse = await verifyOTPApi(user.user, otp);
    console.log("verify otp: ", otpResponse);    
    if (otpResponse.data.resultCode !== "00") {
      const res = await changePass(cre, publicKey);
      onChangeStep()
      setLoading(false)
      console.log("changepassword response: ", res);
    }else{
      setLoading(false)
    }
  };

  return (
    <Box>
      <WaitingPopup open={loading} />
      <Box component="form" onSubmit={handleSubmit} textAlign="center">
        <Typography className={classes.title}>{t.title}</Typography>
        <Typography style={{margin: 10}}>{t.sub1}</Typography>
        <Typography className={classes.formTitle}>{t.sub2}</Typography>
        <Box
          maxWidth={320}
          margin="auto"
          my={2}
          display="flex"
          justifyContent="space-between"
        >
          <InputSingle onChange={(value: string) => setOtp(value)} />
        </Box>
        <Box mt={2}>
          <ButtonCustom variant="contained" color="secondary" type="submit">
            {t.button.submit}
          </ButtonCustom>
        </Box>
      </Box>
    </Box>
  );
}

export default Otp;
