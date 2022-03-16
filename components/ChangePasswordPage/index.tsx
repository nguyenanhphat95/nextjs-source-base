import React, { useState, ChangeEvent, useContext } from "react";
import {
  getLanguage,
  isValidPassword1,
  isValidPassword2,
} from "commons/helpers";
import { Box, Grid, Typography, Theme } from "@mui/material";
import _get from "lodash/get";
import { useRouter } from "next/router";
import resources from "pages/assets/translate.json";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { makeStyles } from "@mui/styles";
import InputCustom from "components/ChangePasswordPage/Commons/Input";
import ButtonCustom from "components/ChangePasswordPage/Commons/Button";
import jwt from "jsonwebtoken";
import { SIGNATURE } from "commons/constants";
import { PopupNotify } from "components/commons";
import { generateRequestBody } from "commons/helpers";
import { VerifyBody, verifyApi, getPublicKey } from "services";
import { ERROR_MESSAGE_VERIFY_USER } from "components/STKPage/const";
import * as changePassword from "services/changePassword";
import STKContext from "components/STKPage/contexts/STKContextValue";
import WaitingPopup from "components/Popup";

export async function getServerSideProps(router: any) {
  const { token } = router.query;
  if (token) {
    const originalData = jwt.verify(token, SIGNATURE as string);
    return {
      props: {
        originalData,
      },
    };
  }
  return {
    props: {},
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontSize: 23,
    fontWeight: 700,
    marginTop: 20,
    width: "100%",
    textAlign: "center",
  },
  formTitle: {
    fontWeight: 700,
    // margin: "20px 0 10px 0",
    fontSize: 17.5,
  },
  important: {
    color: "red",
  },
  sub: {
    width: "80%",
    margin: "auto",
    textAlign: "center",
  },
  icon: {
    fontSize: 18,
    border: "2px solid #2D81FF",
    borderRadius: 50,
    color: "#2D81FF",
    padding: 2,
    margin: "1px 0 0 5px",
  },
  eyeIcon: {
    fontSize: 21,
    position: "absolute",
    right: 50,
    "&:hover": {
      cursor: "pointer",
    },
    marginTop: 14,
    [theme.breakpoints.down("sm")]: {
      right: 35,
    },
  },
  rules: {
    textAlign: "center",
    color: "red",
  },
  closeButton: {
    // width: 170,
    background: "#FFFFFF",
    border: "1px solid #0000007a",
    "&:hover": {
      opacity: 0.7,
      background: "#FFFFFF",
    },
  },
}));

function ChangePassword(props: any) {
  const { user, onSubmit } = props;
  const router = useRouter();
  const classes = useStyles();
  const lang = getLanguage(router);
  const [loading, setLoading] = useState<boolean>(false);
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const t = _get(resources, [lang, "changePassword"]);
  const [password1ErrMessage, setPassword1ErrMessage] = useState<string>("");
  const [password2ErrMessage, setPassword2ErrMessage] = useState<string>("");
  const [popupNotify, setPopupNotify] = useState({
    open: false,
    title: "",
    desc: "",
    onClose: () => null,
  });
  const [oldPasswordErrMessage, setOldPasswordErrMessage] =
    useState<string>("");

  const { loadingBtnSubmit } = useContext(STKContext);

  const _sendOTP = () => {
    changePassword
      .createOTPApi(user.user)
      .then((res) => {
        console.log("send otp ", res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function toggleNotify(title?: string, desc?: string, onClose?: any) {
    setPopupNotify((prev) => {
      if (title && desc) {
        return {
          open: true,
          title,
          desc,
          onClose: onClose ? onClose : () => null,
        };
      }
      prev.onClose && prev?.onClose();
      return {
        open: false,
        title: "",
        desc: "",
        onClose: () => null,
      };
    });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOldPasswordErrMessage("");
    const data = new FormData(event.currentTarget);
    const reqData = {
      oldPassword: data.get("old-password") as string,
      password1: data.get("password1") as string,
      password2: data.get("password2") as string,
    };

    setLoading(true);
    const JSEnscript = _get(window, "JSEncrypt");
    const crypt = new JSEnscript();
    const resp = await getPublicKey();
    const reqDataVerifyUser = {
      username: user.user,
      password: reqData.oldPassword,
    };
    const publicKey = _get(resp, "data.data.key");
    if (!publicKey) {
      return;
    }
    crypt.setPublicKey(publicKey);
    const credential = crypt.encrypt(JSON.stringify(reqDataVerifyUser));
    const body: VerifyBody = {
      ...generateRequestBody(),
      data: {
        credential,
        key: publicKey,
      },
    };
    verifyApi(body)
      .then((res) => {
        const code = _get(res, "data.data.code");
        console.log(res);
        setLoading(false);
        if (!code) {
          setOldPasswordErrMessage(
            ERROR_MESSAGE_VERIFY_USER["30"] || "Login failed"
          );
          return;
        }
        const isPassword1 = isValidPassword1(reqData.password1);
        const isPassword2 = isValidPassword2(
          reqData.password1,
          reqData.password2
        );
        if (isPassword1 != "00") {
          setPassword1ErrMessage(
            _get(t, `form.errors.password1_${isPassword1}`)
          );
        } else setPassword1ErrMessage("");

        if (isPassword2 != "00") {
          setPassword2ErrMessage(
            _get(t, `form.errors.password2_${isPassword2}`)
          );
        } else setPassword2ErrMessage("");

        if (isPassword1 === "00" && isPassword2 === "00") {
          _sendOTP();
          onSubmit(reqData.oldPassword, reqData.password1, publicKey, code);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box>
      {/* <WaitingPopup open={loading} /> */}
      {popupNotify.open && (
        <PopupNotify
          title={popupNotify.title}
          desc={popupNotify.desc}
          open={popupNotify.open}
          toggleModal={toggleNotify}
        />
      )}
      <Typography className={classes.title}>{_get(t, "title")}</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid item my={2}>
          <Typography>
            {_get(t, "form.label.oldPassword")}
            <span className={classes.important}>*</span>
          </Typography>
          <Grid container item xs="auto">
            <InputCustom
              isPassword
              // type={!eyeStatus ? "password" : "text"}
              style={{ marginTop: 5 }}
              required
              name="old-password"
              placeholder={_get(t, "form.label.oldPassword")}
              errorMsg={oldPasswordErrMessage}
              error={oldPasswordErrMessage ? true : false}
            />
          </Grid>
        </Grid>
        <Grid xs="auto" item my={2}>
          <Typography>
            {_get(t, "form.label.newPassword")}
            <span className={classes.important}>*</span>
          </Typography>
          <Grid container item xs="auto">
            <InputCustom
              required
              isPassword
              // type={!eyeStatus2 ? "password" : "text"}
              style={{ marginTop: 5 }}
              name="password1"
              placeholder={_get(t, "form.label.newPassword")}
              errorMsg={password1ErrMessage}
              error={password1ErrMessage ? true : false}
            />
          </Grid>
        </Grid>
        <Grid item my={2}>
          <Typography>
            {_get(t, "form.label.reNewPassword")}
            <span className={classes.important}>*</span>
          </Typography>
          <Grid container item xs="auto">
            <InputCustom
              isPassword
              required
              // type={!eyeStatus3 ? "password" : "text"}
              style={{ marginTop: 5 }}
              name="password2"
              placeholder={_get(t, "form.label.reNewPassword")}
              errorMsg={password2ErrMessage}
              error={password2ErrMessage ? true : false}
            />
          </Grid>
        </Grid>
        <Grid
          textAlign="center"
          mt={3.5}
          container={!isMobile}
          justifyContent="center"
        >
          <Grid my={1.5} mx={1}>
            <ButtonCustom
              variant="contained"
              color="secondary"
              fullWidth
              type="submit"
            >
              {_get(t, "form.button.submit")}
            </ButtonCustom>
          </Grid>
          <Grid my={1.5} mx={1}>
            <ButtonCustom
              variant="contained"
              className={classes.closeButton}
              fullWidth
              type="reset"
            >
              {_get(t, "form.button.close")}
            </ButtonCustom>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ChangePassword;
