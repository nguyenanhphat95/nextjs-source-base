import { Box, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  ERROR_MESSAGE_TIMEOUT,
  SECRET_KEY_ACCESS_TOKEN,
} from "commons/constants";
import {
  getLanguage,
  getStatusResponse,
  parseJwt,
  reloadToPage,
} from "commons/helpers";
import { LoadingPage } from "components/commons";
import { ROUTE_STEP } from "components/HDBSPage/consts";
import { TypeCustomer } from "components/HDBSPage/interfaces";
import _get from "lodash/get";
import Head from "next/head";
import { useRouter } from "next/router";
import resources from "pages/assets/translate.json";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as hdbsServices from "services/hdbsService";
import jwt from "jsonwebtoken";

import {
  setFormData,
  setListAccount,
  setListMerchant,
  setListTerminal,
  setStep,
  setToggleLoading,
  setTypeCustomer,
} from "store/actions";

const useStyles = makeStyles(() => ({
  rootPage: {
    background: "#F2F2F4",
    minHeight: "100vh",
    position: "relative",
  },
  root: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  item: {
    background: "white",
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
  },
}));

interface Props {
  toggleNotify: (desc?: string, onClose?: any, isSuccess?: boolean) => void;
  jwtInfo: string;
}

export async function getServerSideProps(router: any) {
  const token = router.query.jwt;
  try {
    if (!token) {
      return {
        redirect: {
          destination: "/_error",
          permanent: false,
        },
      };
    }
    const jwtInfo = jwt.verify(token, SECRET_KEY_ACCESS_TOKEN as string);
    return {
      props: {
        jwtInfo,
      },
    };
  } catch {
    return {
      redirect: {
        destination: "/_error",
        permanent: false,
      },
    };
  }
}

const HDBSPage = (props: Props) => {
  const { toggleNotify, jwtInfo } = props;
  const classes = useStyles();

  const router = useRouter();
  const query = router.query;
  const lang = getLanguage(router);
  const t = _get(resources, [lang, "homePage"]);
  const [timeOutErr, setTimeOutErr] = React.useState(false);

  const dispatch = useDispatch();
  const { dataForm, listAccount, typeCustomer, loading, step } = useSelector(
    (state) => _get(state, "app")
  );
  const isUserImoney = useRef<boolean>(false);

  const _redirectStepFormTKCK = () => {
    if (timeOutErr) {
      toggleNotify(ERROR_MESSAGE_TIMEOUT);
      return;
    }

    if (!listAccount?.length && typeCustomer === TypeCustomer.KHHH) {
      const status = getStatusResponse(
        isUserImoney.current ? "isUserImoney" : "userDontEnoughAccount",
        lang
      );
      toggleNotify(status.msg);
      return;
    }
    delete query.returnHome;
    router.push({
      pathname: ROUTE_STEP.step1FormTKCK,
      query,
    });
  };

  useEffect(() => {
    if (!query?.typeCustomer) {
      // router.push("/_error");
      return;
    }

    const typeCustomer = query?.typeCustomer as TypeCustomer;
    const isKHHH = typeCustomer === TypeCustomer.KHHH;

    dispatch(setTypeCustomer(typeCustomer));
    dispatch(
      setFormData({
        ...dataForm,
        ekycType: isKHHH ? "CURRENT_CUSTOMER" : "NEW_CUSTOMER",
      })
    );

    if (!isKHHH) {
      _redirectStepFormTKCK();
    }
  }, [query?.typeCustomer]);

  useEffect(() => {
    // if (!query?.jwt) {
    //   router.push("/_error");
    //   return;
    // }
    // try {
    //   const jwtInfo = jwt.verify(
    //     query.jwt as string,
    //     SECRET_KEY_ACCESS_TOKEN as string
    //   );

    //   console.log(jwtInfo);

    // const jwtInfo = parseJwt(query.jwt as string);

    dispatch(setToggleLoading("loadingMasterData"));
    hdbsServices.getAccessToken().then((res) => {
      hdbsServices.updateMasterData({
        userId: _get(jwtInfo, "userName"),
        clientNo: _get(jwtInfo, "clientNo"),
        language: "vi",
      });
      Promise.all([
        hdbsServices.getMerchant(),
        hdbsServices.getListAccountApi(),
      ])
        .then((res) => {
          const merchantValid = _get(res, "[0].merchants");
          const accountsValid = _get(res, "[1].data.data");
          // console.log(merchantValid, accountsValid);

          if (!merchantValid || !accountsValid) {
            toggleNotify(ERROR_MESSAGE_TIMEOUT);
            setTimeOutErr(true);
            dispatch(setToggleLoading("loadingMasterData"));
            return;
          }

          const accounts = _get(res, "[1].data.data", []);
          // If list account is empty, that is imoney user
          if (!accounts || !accounts.length) {
            isUserImoney.current = true;
          }
          dispatch(setToggleLoading("loadingMasterData"));
          dispatch(setListMerchant(_get(res, "[0].merchants", [])));
          dispatch(setListTerminal(_get(res, "[0].terminals", [])));
          dispatch(setListAccount(hdbsServices.filterListAccount(accounts)));
        })
        .catch(() => dispatch(setToggleLoading("loadingMasterData")));
    });
    // } catch {
    //   // router.push("/_error");
    //   return;
    // }
  }, [query]);

  return (
    <>
      <Head>
        {/* <title>Chứng khoán</title> */}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      {loading.loadingMasterData && <LoadingPage />}

      <div className={classes.rootPage}>
        <div className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <div className={classes.item} onClick={_redirectStepFormTKCK}>
                <Grid container direction="column">
                  <Grid item>
                    <img
                      width={30}
                      height={30}
                      src="/asset/images/openStockAccount.svg"
                    />
                  </Grid>

                  <Grid item>
                    <Box px={1}>{t?.openStockAccount}</Box>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default HDBSPage;
