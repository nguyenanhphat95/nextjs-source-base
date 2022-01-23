import React, { useState, useEffect } from "react";
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
import {
  FormDataStep1,
  TypeCustomer,
  FormDataStep3,
} from "components/HDBSPage/interfaces";
import { MerchantNameItem, TerminalNameItem } from "interfaces/IGetMerchant";

import { ERROR_CODE } from "commons/helpers/error";
import * as hdbsServices from "services/hdbsService";
import _get from "lodash/get";

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
  const [md5, setMd5] = useState(null);

  const [listMerchant, setListMerchant] = useState<MerchantNameItem[]>([]);
  const [listTerminal, setListTerminal] = useState<TerminalNameItem[]>([]);

  const [typeCustomer] = useState<TypeCustomer>(TypeCustomer.KHHH);
  const [stepCurrent, setStepCurrent] = useState(STEP_KHHH.step1);
  const [loading, setLoading] = useState({
    loadingBtnSubmit: false,
  });

  const [dataForm, setDataForm] = useState({
    account: "",
    merchantId: "",
    terminalId: "",
    isTranInternet: true,
    isUttb: true,
    isBond: true,
    ekycData: null,
  });

  useEffect(() => {
    if (!md5) return;
    hdbsServices.getAccessToken().then((res) => {
      hdbsServices.updateMasterData({
        userId: "0915423641",
        clientNo: "00012132",
        language: "VI",
        accessToken: res.accessToken,
      });
      hdbsServices.getMerchant().then((res) => {
        setListMerchant(res?.merchants || []);
        setListTerminal(res?.terminals || []);
      });
    });
  }, [md5]);

  const _onNextStep = (step: string) => {
    setStepCurrent(step);
  };

  const _toggleModalVerifyOTP = () => {
    setOpenVerifyOTP((prev) => !prev);
  };

  const TKCKContextValue = {
    loadingBtnSubmit: loading.loadingBtnSubmit,
    listMerchant,
    listTerminal,
  };

  const _handleSubmitStep1 = (data: FormDataStep1) => {
    _toggleLoading("loadingBtnSubmit", true);
    const finalData = {
      ...dataForm,
      ...data,
    };
    setDataForm(finalData);

    hdbsServices
      .checkUserEKYC(finalData.merchantId, finalData.terminalId)
      .then((res) => {
        _toggleLoading("loadingBtnSubmit", false);
        const code = res.resultCode;
        if (code === ERROR_CODE.SessionIdNotFound) {
          // do EKYC
          // _onNextStep(STEP_KHHH.step2);
          _onNextStep(STEP_KHHH.step3);
          return;
        }
        _onNextStep(STEP_KHHH.step4);
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

  const _handleSubmitStep3 = async (data: FormDataStep3) => {
    const finalData = {
      ...dataForm,
      ...data,
    };
    setDataForm(finalData);
    const inquiryResponse = await hdbsServices.inquiryENCYPresent(finalData);
    console.log("inquiryResponse---:", inquiryResponse);
    // if (inquiryResponse.hasSendOtp) {
    //   _toggleModalVerifyOTP();
    //   const createOTPResponse = await hdbsServices.createOTPApi("0915423641");

    //   const userId = _get(createOTPResponse, "data.data.userId");
    //   if (userId) {
    //     _toggleModalVerifyOTP();
    //   }
    //   return;
    // }
  };

  const _handleVerifyOtp = (accountOtp: string) => {
    const finalData = {
      ...dataForm,
      accountOtp,
    };
    setDataForm(finalData);

    // TODO: verify OTP
    hdbsServices.confirmEKYCPresent(finalData).then((res) => {
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
      <Script
        id="md5-id"
        src="/asset/js/md5.min.js"
        onLoad={() => {
          const md5 = _get(window, "md5");
          setMd5(md5);
        }}
      />

      {md5 && (
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
      )}

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
