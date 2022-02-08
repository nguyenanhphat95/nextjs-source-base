import React, { useState, useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";

import { makeStyles } from "@mui/styles";
import { Dialog, Box } from "@mui/material";

import {
  FormTKCKPage,
  EKYCVerifyPage,
  ConfirmInfoPage,
  RegisterSuccessPage,
  HomePage,
  VerifyOTP,
} from "components/HDBSPage";
import TKCKContext from "components/HDBSPage/contexts/TKCKContextValue";
import {
  FormDataStep1,
  TypeCustomer,
  FormDataStep3,
} from "components/HDBSPage/interfaces";
import { PopupNotify } from "components/commons";

import { MerchantNameItem, TerminalNameItem } from "interfaces/IGetMerchant";
import { AccountItem } from "interfaces/IListAccount";

import { ERROR_CODE, getStatusResponse } from "commons/helpers/error";
import { getLanguage, parseJwt } from "commons/helpers/helper";

import * as hdbsServices from "services/hdbsService";
import _get from "lodash/get";
import { LANGUAGE } from "commons/constants";

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
  stepHome: "Step home page",
  step1: "Step enter TKCK",
  step2: "Step eKYC verify",
  step3: "Step confirm info register TKCK",
  step4: "Step register success",
};

const HDBSPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const query = router.query;
  const lang = getLanguage(router);

  const [openVerifyOTP, setOpenVerifyOTP] = useState(false);
  const [md5, setMd5] = useState(null);

  const [popupNotify, setPopupNotify] = useState({
    open: false,
    desc: "",
  });

  const [listMerchant, setListMerchant] = useState<MerchantNameItem[]>([]);
  const [listTerminal, setListTerminal] = useState<TerminalNameItem[]>([]);
  const [listAccount, setListAccount] = useState<AccountItem[]>([]);

  const [typeCustomer] = useState<TypeCustomer>(TypeCustomer.KHHH);
  const [stepCurrent, setStepCurrent] = useState(STEP_KHHH.stepHome);
  const [loading, setLoading] = useState({
    loadingBtnSubmit: false,
    loadingBtnConfirmOTP: false,
  });

  const [dataForm, setDataForm] = useState({
    accountNo: "",
    accountType: "",
    merchantId: "",
    terminalId: "",
    isTranInternet: true,
    isUttb: true,
    isBond: true,
    ekycData: null,
  });

  useEffect(() => {
    if (!md5 || !query?.jwt) return;
    const jwtInfo = parseJwt(query.jwt as string);
    hdbsServices.getAccessToken().then((res) => {
      hdbsServices.updateMasterData({
        userId: _get(jwtInfo, "userName"),
        clientNo: _get(jwtInfo, "clientNo"),
        language: "vi",
        // userId: "anhdtp",
        // clientNo: "00013695",
      });
      hdbsServices.getMerchant().then((res) => {
        setListMerchant(res?.merchants || []);
        setListTerminal(res?.terminals || []);
      });

      hdbsServices.getListAccountApi().then((res) => {
        const listAccount = _get(res, "data.data", []);
        setListAccount(listAccount);
      });
    });
  }, [md5, query?.jwt]);

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
    listAccount,
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
        const code = _get(res, "resultCode");
        const status = getStatusResponse(code, lang);

        if (status.success) {
          if (!res.hasSendOtp) {
            _onNextStep(STEP_KHHH.step4);
            return;
          }
          _onCreateOTP();
          return;
        }

        if (status.code === ERROR_CODE.UserEKYCNotFound) {
          _onNextStep(STEP_KHHH.step2);
          return;
        }
        toggleNotify(status.msg);
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
    _toggleLoading("loadingBtnSubmit", true);
    const finalData = {
      ...dataForm,
      ...data,
    };
    setDataForm(finalData);
    const inquiryResponse = await hdbsServices.inquiryENCYPresent(finalData);
    _toggleLoading("loadingBtnSubmit", false);
    const code = _get(inquiryResponse, "resultCode");
    const status = getStatusResponse(code, lang);

    if (status.success) {
      if (inquiryResponse.hasSendOtp) {
        _onCreateOTP();
        return;
      }
      _onNextStep(STEP_KHHH.step4);
      return;
    }
    _toggleLoading("loadingBtnSubmit", false);
    toggleNotify(status.msg);
  };

  const _handleVerifyOtp = (accountOtp: string) => {
    _toggleLoading("loadingBtnConfirmOTP", true);
    hdbsServices
      .verifyOTPApi(accountOtp)
      .then((res) => {
        _toggleLoading("loadingBtnConfirmOTP", false);
        if (_get(res, "data.data.userId")) {
          _onConfirmEKYC();
          return;
        }
        toggleNotify("Invalid OTP");
      })
      .catch((err) => {
        _toggleLoading("loadingBtnConfirmOTP", false);
      });
  };

  const _onCreateOTP = () => {
    _toggleLoading("loadingBtnSubmit", true);
    hdbsServices
      .createOTPApi()
      .then((res) => {
        _toggleLoading("loadingBtnSubmit", false);
        if (_get(res, "data.data.userId")) {
          _toggleModalVerifyOTP();
        }
      })
      .catch((err) => {
        _toggleLoading("loadingBtnSubmit", false);
      });
  };

  const _onConfirmEKYC = () => {
    _toggleLoading("loadingBtnConfirmOTP", true);
    hdbsServices
      .confirmEKYCPresent(dataForm)
      .then((res) => {
        const code = _get(res, "resultCode");
        const status = getStatusResponse(code, lang);
        _toggleLoading("loadingBtnConfirmOTP", false);

        if (status.success) {
          _toggleModalVerifyOTP();
          _onNextStep(STEP_KHHH.step4);
          return;
        }
        toggleNotify(status.msg);
      })
      .catch((err) => {
        _toggleLoading("loadingBtnConfirmOTP", false);
      });
  };

  function _toggleLoading(field: string, isLoading?: boolean) {
    setLoading({
      ...loading,
      [field]: isLoading ? true : false,
    });
  }

  function toggleNotify(desc?: string) {
    setPopupNotify(() => {
      if (desc) {
        return {
          open: true,
          desc,
        };
      }
      return {
        open: false,
        desc: "",
      };
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

      {popupNotify.open && (
        <PopupNotify
          desc={popupNotify.desc}
          open={popupNotify.open}
          toggleModal={toggleNotify}
        />
      )}

      {md5 && (
        <div className={classes.root}>
          <TKCKContext.Provider value={TKCKContextValue}>
            {stepCurrent === STEP_KHHH.stepHome && (
              <HomePage onSelect={() => _onNextStep(STEP_KHHH.step1)} />
            )}
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
            {stepCurrent === STEP_KHHH.step4 && (
              <RegisterSuccessPage
                onClickOtherTransaction={() => _onNextStep(STEP_KHHH.stepHome)}
              />
            )}
          </TKCKContext.Provider>
        </div>
      )}

      <Dialog
        className={classes.dialogCustom}
        open={openVerifyOTP}
        onClose={_toggleModalVerifyOTP}
      >
        <Box px={1} py={2} className={classes.otpContainer}>
          <VerifyOTP
            loading={loading.loadingBtnConfirmOTP}
            onSubmit={_handleVerifyOtp}
          />
        </Box>
      </Dialog>
    </>
  );
};

export default HDBSPage;
