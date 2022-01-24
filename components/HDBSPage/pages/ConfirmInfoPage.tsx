import React, { ChangeEvent, useState, useContext } from "react";
import { useRouter } from "next/router";
import { Grid, Box, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useForm, Controller } from "react-hook-form";

import { ButtonCustom, CheckboxCustom, InputCustom } from "components/commons";
import { parseInfoFromEKYC, checkResultEkyc } from "commons/helpers/ekyc";
import { FormDataFinal, FormDataStep3, TypeCustomer } from "../interfaces";
import TKCKContext from "components/HDBSPage/contexts/TKCKContextValue";

import { LANGUAGE } from "commons/constants";
import resources from "pages/assets/translate.json";

import _get from "lodash/get";

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
};

const ConfirmInfoPage = (props: Props) => {
  const classes = useStyles();
  const { data, onSubmit, typeCustomer, redoEKYC } = props;
  const [isAceptCondition, setIsAceptCondition] = useState(true);

  const info = parseInfoFromEKYC(_get(data, "ekycData"));
  const resultEKYC = checkResultEkyc(_get(data, "ekycData"));
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
    },
  });
  const router = useRouter();
  const lang = _get(router, "query.language", LANGUAGE.VI);
  const t = _get(resources, [lang, "confirmInfoPage"]);

  const _handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsAceptCondition(event.target.checked);
  };

  const _handleSubmit = (data: FormValues) => {
    onSubmit({
      ...info,
      ...data,
    });
  };

  return (
    <>
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
                    <Grid item>{t?.username}:</Grid>
                    <Grid item>
                      <Controller
                        name="fullName"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <InputCustom
                            errorMsg={
                              errors.fullName && "This field is required"
                            }
                            fullWidth
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      {t?.gender}: <b>{info?.gender}</b>
                    </Grid>
                    <Grid item></Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      {t?.birthday}: <b>{info?.birthDateOcr}</b>
                    </Grid>
                    <Grid item></Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      CMND/CCCD: <b>{info?.idNumber}</b>
                    </Grid>
                    <Grid item></Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      {t?.dateIssue}: <b>{info?.dateOfIssueOcr}</b>
                    </Grid>
                    <Grid item></Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      {t?.placeIssue}: <b>{info?.placeOfIssueOcr}</b>
                    </Grid>
                    <Grid item></Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      {t?.address}: <b>{info?.address}</b>
                    </Grid>
                    <Grid item></Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      {t?.nationality}: <b>{info?.nationalityName}</b>
                    </Grid>
                    <Grid item></Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>{t?.phoneNumber}:</Grid>
                    <Grid item></Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      {t?.contactAddress}: <b>{info?.address}</b>
                    </Grid>
                    <Grid item></Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>{t?.email}:</Grid>
                    <Grid item></Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      {t?.terminalName}: <b>{data.terminalName}</b>
                    </Grid>
                    <Grid item></Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      {t?.accountNo}: <b>{data.accountNo}</b>
                    </Grid>
                    <Grid item></Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <Box mt={1}>
              <CheckboxCustom
                checked={isAceptCondition}
                onChange={_handleChange}
                label={
                  <div>
                    Tôi đồng ý và ủy quyền cho HDBank để cung cấp các thông tin
                    cá nhân, thông tài khoản của tôi cho Công ty chứng khoán
                    {data.terminalName}, để thực hiện các thủ tục mở tài khoản
                    chứng khoán tại Công ty chứng khoán {data.terminalName}. Tôi
                    đã đọc, hiểu rõ và đồng ý với{" "}
                    <span className={classes.textTermAndCondition}>
                      Điều khoản và Điều kiện
                    </span>{" "}
                    đính kèm
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
