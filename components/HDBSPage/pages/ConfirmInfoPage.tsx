import React, { ChangeEvent, useState, useContext } from "react";
import { useRouter } from "next/router";
import { Grid, Box, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useForm, Controller } from "react-hook-form";

import ModalCondition from "../components/ModalCondition";

import { ButtonCustom, CheckboxCustom, InputCustom } from "components/commons";
import { parseInfoFromEKYC, checkResultEkyc } from "commons/helpers/ekyc";
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
    padding: "5px",
  },
  content: {
    paddingLeft: "18px",
    paddingRight: "18px",
  },
  textTermAndCondition: {
    color: theme.palette.error.main,
  },
  tittle: {
    fontWeight: 600,
  },
  h100: {
    height: "100%",
  },
}));

interface Props {
  data: FormDataFinal;
  onSubmit: (data: FormDataStep3) => void;
  redoEKYC?: () => void;
  typeCustomer: TypeCustomer;
}

type FormValues = {
  fullName: string;
  birthDate: string;
  dateOfIssue: string;
  placeOfIssue: string;
  expireOfIssue: string;
  idNumber: string;
};

const ERROR_FORM = {
  [LANGUAGE.EN]: {
    required: "This field is required",
  },
  [LANGUAGE.VI]: {
    required: "Trường này là bắt buộc",
  },
};

const ConfirmInfoPage = (props: Props) => {
  const classes = useStyles();
  const { data, onSubmit, typeCustomer, redoEKYC } = props;

  const [isAceptCondition, setIsAceptCondition] = useState(true);
  const [showModalCondition, setShowModalCondition] = useState(false);

  const isKHHH = typeCustomer === TypeCustomer.KHHH;

  const info = _get(data, "ekycData")
    ? parseInfoFromEKYC(_get(data, "ekycData"))
    : data;
  const resultEKYC = _get(data, "ekycData")
    ? checkResultEkyc(_get(data, "ekycData"))
    : { validEKYC: true, messageEKYC: "" };

  const { loadingBtnSubmit } = useContext(TKCKContext);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      fullName: info.fullNameOcr,
      birthDate: info.birthDateOcr,
      dateOfIssue: info.dateOfIssueOcr,
      placeOfIssue: info.placeOfIssueOcr,
      expireOfIssue: info.expireOfIssueOcr,
      idNumber: info.idNumber as string,
    },
  });
  const router = useRouter();
  const lang = getLanguage(router);
  const t = _get(resources, [lang, "confirmInfoPage"]);

  const _handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsAceptCondition(event.target.checked);
  };

  const _handleSubmit = (data: FormValues) => {
    onSubmit({
      ...info,
      ...data,
      fullNameOcr: info.fullNameOcr ? info.fullNameOcr : data.fullName,
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

      {!resultEKYC.validEKYC && (
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
      )}
      {resultEKYC.validEKYC && (
        <div className={classes.root}>
          <div className={classes.tittle}>{t?.title}</div>
          <form className={classes.root} onSubmit={handleSubmit(_handleSubmit)}>
            <Box mt={1} className={classes.content}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      {t?.username}: <b>{info?.fullNameOcr}</b>
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
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      {t?.gender}: <b>{info?.gender === "M" ? "Nam" : "Nữ"}</b>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      {t?.birthday}: <b>{info?.birthDateOcr}</b>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      CMND/CCCD: <b>{info?.idNumber}</b>
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
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      {t?.dateIssue}: <b>{info?.dateOfIssueOcr}</b>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      {t?.placeIssue}: <b>{info?.placeOfIssueOcr}</b>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      {t?.address}: <b>{info?.address}</b>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      {t?.nationality}: <b>{info?.nationalityName}</b>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      {t?.phoneNumber}: <b>{info?.phoneNumber}</b>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      {t?.contactAddress}: <b>{info?.address}</b>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      {t?.email}: <b>{info?.email}</b>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      {t?.terminalName}: <b>{data.terminalName}</b>
                    </Grid>
                  </Grid>
                </Grid>
                {isKHHH && (
                  <Grid item>
                    <Grid container spacing={1} direction="column">
                      <Grid item>
                        {t?.accountNo}: <b>{data.accountNo}</b>
                      </Grid>
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
                    {t?.termCondition1} {data?.merchantName},{" "}
                    {t?.termCondition2} {data?.merchantName}.{" "}
                    {t?.termCondition3}
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        _toggleModalCondition();
                      }}
                      className={classes.textTermAndCondition}
                    >
                      {t?.termCondition4}
                    </span>{" "}
                    {t?.termCondition5}
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
