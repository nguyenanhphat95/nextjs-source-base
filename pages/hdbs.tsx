import React, { useState } from "react";
import Script from "next/script";

import { makeStyles } from "@mui/styles";
import { Dialog, Box } from "@mui/material";

import {
  FormTKCKPage,
  EKYCVerifyPage,
  ConfirmInfoPage,
  RegisterSuccessPage,
  VerifyOTP,
} from "components/HDBSPage";
import TKCKContext from "components/HDBSPage/contexts/TKCKContextValue";
import { FormDataStep1, TypeCustomer } from "components/HDBSPage/interfaces";

import * as hdbsServices from "services/hdbsService";

const useStyles = makeStyles(() => ({
  root: {
    background: "#F2F2F4",
    minHeight: "100vh",
  },
  dialogCustom: {
    "& .MuiPaper-root": {
      margin: 0,
    },
  },
  otpContainer: {
    background: "#FAFAFA",
  },
  h100: {
    height: "100%",
  },
}));

export const STEP_KHHH = {
  step1: "Step enter TKCK",
  step2: "Step eKYC verify",
  step3: "Step confirm info register TKCK",
  step4: "Step register success",
};

const HDBSPage = () => {
  const classes = useStyles();
  const [openVerifyOTP, setOpenVerifyOTP] = useState(false);

  const [typeCustomer] = useState<TypeCustomer>(TypeCustomer.KHM);
  const [stepCurrent, setStepCurrent] = useState(STEP_KHHH.step1);
  const [loading, setLoading] = useState({
    loadingBtnSubmit: false,
  });

  const [dataForm, setDataForm] = useState({
    account: "",
    merchantId: "",
    terminalId: "",
    transferInternet: false,
    transferAuto: false,
    transferBonds: false,
    ekycData: null,
  });

  const _onNextStep = (step: string) => {
    setStepCurrent(step);
  };

  const _toggleModalVerifyOTP = () => {
    setOpenVerifyOTP((prev) => !prev);
  };

  const TKCKContextValue = {
    loadingBtnSubmit: loading.loadingBtnSubmit,
  };

  const _handleSubmitStep1 = (data: FormDataStep1) => {
    _toggleLoading("loadingBtnSubmit", true);
    setDataForm({
      ...dataForm,
      ...data,
    });
    hdbsServices
      .checkUserEKYC(dataForm.merchantId, dataForm.terminalId)
      .then((res) => {
        _toggleLoading("loadingBtnSubmit", false);
        if (res.data.hasSendOtp) {
          // User EKYCED
          _onNextStep(STEP_KHHH.step4);
          return;
        }
        _onNextStep(STEP_KHHH.step2);
      });
  };

  const _handleSubmitStep2 = (data: any) => {
    if (!data) {
      return;
    }
    setDataForm({
      ...dataForm,
      ekycData: data,
    });
    _onNextStep(STEP_KHHH.step3);
  };

  const _handleSubmitStep3 = () => {
    // TODO: api send OTP
    hdbsServices.inquiryEKYCPresent().then((res) => {
      _toggleModalVerifyOTP();
    });
  };

  const _handleVerifyOtp = (otp: string) => {
    // TODO: verify OTP
    hdbsServices.confirmEKYCPresent(otp).then((res) => {
      _toggleModalVerifyOTP();
      _onNextStep(STEP_KHHH.step4);
    });
  };

  function _toggleLoading(field: string, isLoading?: boolean) {
    setLoading({
      ...loading,
      [field]: isLoading ? true : false,
    });
  }

  return (
    <>
      <Script id="lottie-id" src="/asset/js/lottie.min.js" />
      <Script id="jsqr-id" src="/asset/js/jsQR.js" />
      <Script id="vnptbrowser-id" src="/asset/js/VNPTBrowserSDKAppV2.3.3.js" />

      <div className={classes.root}>
        <TKCKContext.Provider value={TKCKContextValue}>
          {stepCurrent === STEP_KHHH.step1 && (
            <FormTKCKPage onSubmit={_handleSubmitStep1} />
          )}
          {stepCurrent === STEP_KHHH.step2 && (
            <EKYCVerifyPage onSubmit={_handleSubmitStep2} />
          )}
          {stepCurrent === STEP_KHHH.step3 && (
            <ConfirmInfoPage
              typeCustomer={typeCustomer}
              data={dataForm}
              onSubmit={_handleSubmitStep3}
              redoEKYC={() => _onNextStep(STEP_KHHH.step2)}
            />
          )}
          {stepCurrent === STEP_KHHH.step4 && <RegisterSuccessPage />}
        </TKCKContext.Provider>
      </div>
      <Dialog
        className={classes.dialogCustom}
        open={openVerifyOTP}
        onClose={_toggleModalVerifyOTP}
      >
        <Box px={1} py={2} className={classes.otpContainer}>
          <VerifyOTP onSubmit={_handleVerifyOtp} />
        </Box>
      </Dialog>
    </>
  );
};

export default HDBSPage;
