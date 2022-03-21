import React, { useState, useEffect, useReducer, useRef } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { getLanguage, parseJwt } from "commons/helpers";

import resources from "pages/assets/translate.json";
import * as hdbsServices from "services/hdbsService";
import _get from "lodash/get";
import { TypeCustomer } from "components/HDBSPage/interfaces";
import { LoadingPage } from "components/commons";

import {
  setTypeCustomer,
  setFormData,
  setListMerchant,
  setListTerminal,
  setListAccount,
  setToggleLoading,
} from "store/actions";
import { ROUTE_STEP } from "components/HDBSPage/consts";

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
    fontWeight: 500,
  },
}));

interface Props {}

const HDBSPage = (props: Props) => {
  const classes = useStyles();

  const router = useRouter();
  const query = router.query;
  const lang = getLanguage(router);
  const t = _get(resources, [lang, "homePage"]);

  const dispatch = useDispatch();
  const { dataForm, listMerchant, loading } = useSelector((state) =>
    _get(state, "app")
  );

  const isUserImoney = useRef<boolean>(false);
  const _redirectStepFormTKCK = () => {
    router.push({
      pathname: ROUTE_STEP.step1FormTKCK,
      query,
    });
  };

  useEffect(() => {
    if (!query?.typeCustomer) return;

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
    if (!query?.jwt) return;
    const jwtInfo = parseJwt(query.jwt as string);

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
  }, [query]);

  return (
    <>
      <Head>
        <title>Chứng khoán</title>
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
