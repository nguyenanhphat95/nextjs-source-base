import React, { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { ParsedUrlQuery } from "querystring";
import { Grid, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  SectionHeader,
  SectionLogin,
  SectionNotification,
  SectionFooter,
  SectionMobile1,
  UtilityEbank,
} from "components/LoginPage";

import {
  verifyClientApi,
  VerifyClientBody,
  VerifyBody,
  verifyApi,
  getPublicKey,
} from "services";
import { generateRequestBody, handleErrorWithResponse } from "commons/helpers";
// import { CLIENT_SECRET } from "commons/constants";
import { ERROR_MESSAGE_VERIFY_USER } from "./sbh";
import desktopPic from "public/images/desktop.png";
import STKContext from "components/STKPage/contexts/STKContextValue";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import _get from "lodash/get";

createTheme();
const useStyles = makeStyles(() => ({
  banner: {
    "&  > span": {
      width: "100% !important",
    },
  },
  rootMobileUtility: {
    margin: "50px 40px",
  },
}));

const AuthPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const query = router.query;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState({
    loadingBtnSubmit: false,
  });

  const _checkHaveParam = useCallback((query: ParsedUrlQuery) => {
    if (
      !query.client_id ||
      !query.redirect_uri ||
      !query.response_type ||
      !query.scope
    ) {
      return false;
    }
    return true;
  }, []);

  useEffect(() => {
    if (!_checkHaveParam(query)) {
      return;
    }

    const body: VerifyClientBody = {
      ...generateRequestBody(),
      data: {
        clientId: query.client_id as string,
        clientSecret: "",
        redirectUri: query.redirect_uri as string,
      },
    };
    verifyClientApi(body)
      .then((resp) => {
        handleErrorWithResponse(router, resp.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [query, _checkHaveParam, router]);

  if (!_checkHaveParam(query)) {
    return <div>Invalid params</div>;
  }

  const _handleSubmitForm = async (
    JSEnscript: any,
    data: { username: string; password: string }
  ) => {
    const resp = await getPublicKey();
    const publicKey = _get(resp, "data.data.key");

    if (!publicKey) {
      toast.error("Get public key error");
      return;
    }

    _toggleLoading("loadingBtnSubmit", true);
    const crypt = new JSEnscript();
    crypt.setPublicKey(publicKey);
    const credential = crypt.encrypt(JSON.stringify(data));

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
        _toggleLoading("loadingBtnSubmit", false);
        if (!code) {
          const errorCode = _get(res, "data.response.responseCode");
          toast.error(ERROR_MESSAGE_VERIFY_USER[errorCode] || "Login failed");
          return;
        }
        // Redirect to redirect uri
        router.push({
          pathname: query.redirect_uri as string,
          query: {
            code,
          },
        });
      })
      .catch((err) => {
        _toggleLoading("loadingBtnSubmit", false);
        console.log(err);
      });
  };

  function _toggleLoading(field: string, isLoading?: boolean) {
    setLoading({
      ...loading,
      [field]: isLoading ? true : false,
    });
  }

  const stkContextValue = {
    loadingBtnSubmit: loading.loadingBtnSubmit,
  };

  return (
    <Grid container direction="column">
      <ToastContainer
        theme="colored"
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Grid item xs={12}>
        <SectionHeader />
      </Grid>

      {isMobile && (
        <>
          <Grid item xs={12}>
            <STKContext.Provider value={stkContextValue}>
              <SectionMobile1 onSubmit={_handleSubmitForm} />
            </STKContext.Provider>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.rootMobileUtility}>
              <UtilityEbank />
            </div>
          </Grid>
        </>
      )}
      {!isMobile && (
        <>
          <Grid item xs={12}>
            <Box className={classes.banner}>
              <Image src={desktopPic} alt="desktop" />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <STKContext.Provider value={stkContextValue}>
              <SectionLogin onSubmit={_handleSubmitForm} />
            </STKContext.Provider>
          </Grid>

          <Grid item xs={12}>
            <SectionNotification />
          </Grid>
        </>
      )}

      <SectionFooter />
    </Grid>
  );
};

export default AuthPage;
