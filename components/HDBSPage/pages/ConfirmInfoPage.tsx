import React, { ChangeEvent, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Grid, Box, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useForm, Controller } from "react-hook-form";

import ModalCondition from "../components/ModalCondition";

import { ButtonCustom, CheckboxCustom, InputCustom } from "components/commons";
import {
  parseInfoFromEKYC,
  checkResultEkyc,
  formatDateOfEKYC,
} from "commons/helpers/ekyc";
import { FormDataFinal, FormDataStep3, TypeCustomer } from "../interfaces";
import TKCKContext from "components/HDBSPage/contexts/TKCKContextValue";

import { LANGUAGE } from "commons/constants";
import resources from "pages/assets/translate.json";

import _get from "lodash/get";
import { getLanguage } from "commons/helpers";

const useStyles = makeStyles((theme: Theme) => ({
  rootError: {
    padding: "10px",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  root: {
    padding: "5px 3px 5px 6px",
  },
  content: {
    paddingLeft: "18px",
    paddingRight: "18px",
  },
  textTermAndCondition: {
    color: "#F44336",
  },
  tittle: {
    fontWeight: 600,
  },
  h100: {
    height: "100%",
  },
  info: {
    width: "60%",
    textAlign: "right",
    wordWrap: "break-word",
  },
}));

interface Props {
  data: FormDataFinal;
  onSubmit: (data: FormDataStep3) => void;
  redoEKYC?: () => void;
  typeCustomer: TypeCustomer;
  loadingBtnSubmit?: boolean;
  isAbleSendOtp?: boolean;
}

type FormValues = {
  fullName: string;
  birthDate: string;
  dateOfIssue: string;
  placeOfIssue: string;
  expireOfIssue: string;
  idNumber: string;
};

const ConfirmInfoPage = (props: Props) => {
  const classes = useStyles();
  const {
    data,
    onSubmit,
    typeCustomer,
    loadingBtnSubmit,
    redoEKYC,
    isAbleSendOtp,
  } = props;

  const [isAceptCondition, setIsAceptCondition] = useState(false);
  const [showModalCondition, setShowModalCondition] = useState(false);

  const isKHHH = typeCustomer === TypeCustomer.KHHH;

  // const info = _get(data, "ekycData")
  //   ? parseInfoFromEKYC(_get(data, "ekycData"))
  //   : data;
  const resultEKYC = _get(data, "ekycData")
    ? checkResultEkyc(_get(data, "ekycData"))
    : { validEKYC: true, messageEKYC: "" };

  // const { loadingBtnSubmit, toggleNotify } = useContext(TKCKContext);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      fullName: data.fullNameOcr,
      birthDate: data.birthDateOcr,
      dateOfIssue: data.dateOfIssueOcr,
      placeOfIssue: data.placeOfIssueOcr,
      expireOfIssue: data.expireOfIssueOcr,
      idNumber: data.idNumber as string,
    },
  });
  const router = useRouter();
  const lang = getLanguage(router);
  const t = _get(resources, [lang, "confirmInfoPage"]);

  // useEffect(() => {
  //   if (resultEKYC.validEKYC) {
  //     return;
  //   }
  //   toggleNotify(resultEKYC.messageEKYC, redoEKYC);
  // }, [resultEKYC.validEKYC]);

  const _handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsAceptCondition(event.target.checked);
  };

  const _handleSubmit = (formValues: FormValues) => {
    onSubmit({
      ...data,
      ...formValues,
      fullNameOcr: data?.fullNameOcr ? data.fullNameOcr : formValues.fullName,
    });
  };

  const _toggleModalCondition = () => {
    setShowModalCondition((prev) => !prev);
  };

  return (
    <>
      <ModalCondition
        open={showModalCondition}
        onClose={_toggleModalCondition}
      />
      {/* {!resultEKYC.validEKYC && (
        <div className={classes.rootError}>
          <Box>{resultEKYC.messageEKYC}</Box>
          <Box>
            <ButtonCustom
              onClick={() => redoEKYC && redoEKYC()}
              fullWidth
              variant="contained"
              color="secondary"
            >
              {t?.doEKYCAgain}
            </ButtonCustom>
          </Box>
        </div>
      )} */}
      {resultEKYC.validEKYC && (
        <div className={classes.root}>
          {/* <div className={classes.tittle}>{t?.title}</div> */}
          <form className={classes.root} onSubmit={handleSubmit(_handleSubmit)}>
            <Box mt={1} className={classes.content}>
              <Grid container direction="column" spacing={1}>
                <Grid
                  py={1}
                  container
                  direction="column"
                  borderBottom="1px solid #c0c0c073"
                >
                  <Grid container item>
                    <span style={{ width: "40%" }}>{t?.username}:</span>
                    <b className={classes.info}>{data?.fullNameOcr}</b>
                  </Grid>
                  {/* {isKHHH && (
                      <Grid item>
                        <Controller
                          name="fullName"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <InputCustom
                              errorMsg={
                                errors.fullName &&
                                _get(ERROR_FORM, [lang, "required"])
                              }
                              fullWidth
                              {...field}
                            />
                          )}
                        />
                      </Grid>
                    )} */}
                </Grid>
                <Grid
                  py={1}
                  container
                  direction="column"
                  borderBottom="1px solid #c0c0c073"
                >
                  <Grid container item>
                    <span style={{ width: "40%" }}>{t?.gender}: </span>{" "}
                    <b className={classes.info}>
                      {data?.gender === "M" ? "Nam" : "Nữ"}
                    </b>
                  </Grid>
                </Grid>
                <Grid
                  py={1}
                  container
                  direction="column"
                  borderBottom="1px solid #c0c0c073"
                >
                  <Grid container item>
                    <span style={{ width: "40%" }}>{t?.birthday}: </span>{" "}
                    <b className={classes.info}>
                      {formatDateOfEKYC(data?.birthDateOcr as string)}
                    </b>
                  </Grid>
                </Grid>
                <Grid
                  py={1}
                  container
                  direction="column"
                  borderBottom="1px solid #c0c0c073"
                >
                  <Grid container item>
                    <span style={{ width: "40%" }}>CMND/CCCD: </span>{" "}
                    <b className={classes.info}>{data?.idNumber}</b>
                  </Grid>
                  {/* {isKHHH && (
                      <Grid item>
                        <Controller
                          name="idNumber"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <InputCustom
                              type="number"
                              errorMsg={
                                errors.idNumber &&
                                _get(ERROR_FORM, [lang, "required"])
                              }
                              fullWidth
                              {...field}
                            />
                          )}
                        />
                      </Grid>
                    )} */}
                </Grid>
                <Grid
                  py={1}
                  container
                  direction="column"
                  borderBottom="1px solid #c0c0c073"
                >
                  <Grid container item>
                    <span style={{ width: "40%" }}>{t?.dateIssue}: </span>{" "}
                    <b className={classes.info}>
                      {formatDateOfEKYC(data?.dateOfIssueOcr as string)}
                    </b>
                  </Grid>
                </Grid>
                <Grid
                  py={1}
                  container
                  direction="column"
                  borderBottom="1px solid #c0c0c073"
                >
                  <Grid container item>
                    <span style={{ width: "40%" }}>{t?.placeIssue}: </span>{" "}
                    <b className={classes.info}>{data?.placeOfIssueOcr}</b>
                  </Grid>
                </Grid>
                <Grid
                  py={1}
                  container
                  direction="column"
                  borderBottom="1px solid #c0c0c073"
                >
                  <Grid container item>
                    <span style={{ width: "40%" }}>{t?.address}: </span>{" "}
                    <b className={classes.info}>{data?.address}</b>
                  </Grid>
                </Grid>

                <Grid
                  py={1}
                  container
                  direction="column"
                  borderBottom="1px solid #c0c0c073"
                >
                  <Grid container item>
                    <span style={{ width: "40%" }}>{t?.nationality}: </span>{" "}
                    <b className={classes.info}>{data?.nationalityName}</b>
                  </Grid>
                </Grid>

                <Grid
                  py={1}
                  container
                  direction="column"
                  borderBottom="1px solid #c0c0c073"
                >
                  <Grid container item>
                    <span style={{ width: "40%" }}> {t?.phoneNumber}: </span>{" "}
                    <b className={classes.info}>{data?.phoneNumber}</b>
                  </Grid>
                </Grid>

                <Grid
                  py={1}
                  container
                  direction="column"
                  borderBottom="1px solid #c0c0c073"
                >
                  <Grid container item>
                    <span style={{ width: "40%" }}>{t?.contactAddress}: </span>{" "}
                    <b className={classes.info}>{data?.address2}</b>
                  </Grid>
                </Grid>

                <Grid
                  py={1}
                  container
                  direction="column"
                  borderBottom="1px solid #c0c0c073"
                >
                  <Grid container item>
                    <span style={{ width: "40%" }}>{t?.email}: </span>{" "}
                    <b className={classes.info}>{data.email}</b>
                  </Grid>
                </Grid>

                <Grid
                  py={1}
                  container
                  direction="column"
                  borderBottom="1px solid #c0c0c073"
                >
                  <Grid container item>
                    <span style={{ width: "40%" }}>{t?.terminalName}: </span>{" "}
                    <b className={classes.info}>{data.terminalName}</b>
                  </Grid>
                </Grid>

                {isKHHH && (
                  <Grid
                    py={1}
                    container
                    direction="column"
                    borderBottom="1px solid #c0c0c073"
                  >
                    <Grid container item>
                      <span style={{ width: "40%" }}>{t?.accountNo}: </span>{" "}
                      <b className={classes.info}>{data.accountNo}</b>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Box>
            <Box mt={1}>
              <CheckboxCustom
                checked={isAceptCondition}
                onChange={_handleChange}
                label={
                  <div>
                    {t?.termCondition1}
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        _toggleModalCondition();
                      }}
                      className={classes.textTermAndCondition}
                    >
                      {t?.termCondition4}
                    </span>{" "}
                    {t?.termCondition2} {data?.merchantName}
                  </div>
                }
              />
            </Box>

            <Box mt={2} className={classes.content}>
              <ButtonCustom
                loading={loadingBtnSubmit}
                disabled={!isAceptCondition}
                fullWidth
                variant="contained"
                color="secondary"
                type="submit"
              >
                Tiếp tục
              </ButtonCustom>
            </Box>
          </form>
        </div>
      )}
    </>
  );
};

export default ConfirmInfoPage;
