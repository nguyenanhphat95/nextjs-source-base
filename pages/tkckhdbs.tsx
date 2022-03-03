import React, { useState, useEffect } from "react";
import Script from "next/script";
import Head from "next/head";
import { useRouter } from "next/router";

import { makeStyles } from "@mui/styles";
import { Dialog, Box } from "@mui/material";

import {
  FormTKCKPage,
  EKYCVerifyPage,
  ConfirmInfoPage,
  RegisterSuccessPage,
  VerifyOTP,
  HomePage,
} from "components/HDBSPage";
import TKCKContext from "components/HDBSPage/contexts/TKCKContextValue";
import {
  FormDataStep1,
  TypeCustomer,
  FormDataStep3,
  FormDataFinal,
} from "components/HDBSPage/interfaces";
import { LoadingPage, PopupNotify } from "components/commons";
import {
  INITIAL_VALUE,
  STEP_HDBS,
  PAGE_TITLE,
} from "components/HDBSPage/consts";

import { MerchantNameItem, TerminalNameItem } from "interfaces/IGetMerchant";
import { AccountItem } from "interfaces/IListAccount";

import { ERROR_CODE, getStatusResponse } from "commons/helpers/error";
import {
  getLanguage,
  parseJwt,
  writeLogToServer,
} from "commons/helpers/helper";

import * as hdbsServices from "services/hdbsService";
import _get from "lodash/get";
import { formatDate } from "commons/helpers/date";

const useStyles = makeStyles(() => ({
  root: {
    background: "#F2F2F4",
    minHeight: "100vh",
    position: "relative",
  },
  loadingContainer: {
    position: "fixed",
    width: "100%",
    height: "100%",
    zIndex: 9999,
    background: "black",
    opacity: 0.7,
    display: "flex",
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

const HDBSPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const query = router.query;
  const lang = getLanguage(router);

  const [typeCustomer, setTypeCustomer] = useState<TypeCustomer>(
    TypeCustomer.KHHH
  );
  const [allowInquiry, setAllowInquiry] = useState(false);
  const [openVerifyOTP, setOpenVerifyOTP] = useState(false);
  const [md5, setMd5] = useState(null);
  const [popupNotify, setPopupNotify] = useState({
    open: false,
    desc: "",
  });
  const [listMerchant, setListMerchant] = useState<MerchantNameItem[]>([]);
  const [listTerminal, setListTerminal] = useState<TerminalNameItem[]>([]);
  const [listAccount, setListAccount] = useState<AccountItem[]>([]);
  const [stepCurrent, setStepCurrent] = useState(STEP_HDBS.stepHome);
  const [loading, setLoading] = useState({
    loadingBtnSubmit: false,
    loadingBtnConfirmOTP: false,
    loadingMasterData: true,
  });
  const [dataForm, setDataForm] = useState<FormDataFinal>(INITIAL_VALUE);

  useEffect(() => {
    if (!query.step && typeof query.step !== "string") {
      return;
    }
    setStepCurrent(query.step as string);
  }, [query?.step]);

  useEffect(() => {
    if (!md5 || !query?.jwt) return;
    const jwtInfo = parseJwt(query.jwt as string);
    const typeUser = _get(
      query,
      "typeCustomer",
      TypeCustomer.KHHH
    ) as TypeCustomer;
    _updateDataByTypeUser(typeUser, query.step as string);
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
          _toggleLoading("loadingMasterData", false);
          setListMerchant(_get(res, "[0].merchants", []));
          setListTerminal(_get(res, "[0].terminals", []));
          setListAccount(_get(res, "[1].data.data"));
        })
        .catch(() => _toggleLoading("loadingMasterData", false));
    });
  }, [md5, query?.jwt]);

  function _updateDataByTypeUser(type: TypeCustomer, stepCurrentUrl: string) {
    if (!stepCurrentUrl) {
      type === TypeCustomer.KHM
        ? _onNextStep(STEP_HDBS.step1)
        : _onNextStep(STEP_HDBS.stepHome);
    }

    setTypeCustomer(type);
    setDataForm({
      ...dataForm,
      ekycType:
        type === TypeCustomer.KHHH ? "CURRENT_CUSTOMER" : "NEW_CUSTOMER",
    });
  }

  const _onNextStep = (step: string) => {
    router.push({
      query: {
        ...query,
        step,
      },
    });
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
      .checkUserEKYC(
        finalData.merchantId,
        finalData.terminalId,
        finalData.ekycType || "CURRENT_CUSTOMER",
        finalData.accountNo
      )
      .then((res) => {
        _toggleLoading("loadingBtnSubmit", false);
        const code = _get(res, "resultCode");
        const status = getStatusResponse(code, lang);
        if (status.success) {
          if (!res.hasSendOtp) {
            const { msg } = getStatusResponse("08", lang);
            toggleNotify(msg);
            return;
          }
          const newData: FormDataFinal = {
            ...dataForm,
            fullNameOcr: res?.fullName,
            idNumber: res?.identityId,
            gender: res?.gender,
            birthDateOcr: res?.birthDate,
            dateOfIssueOcr: res?.idDate,
            placeOfIssueOcr: res?.idPlace,
            address: res?.address,
            address2: res?.address2,
            nationalityName: res?.national,
            phoneNumber: res?.phoneNumber,
            idNumberType: res?.identityIdType,
            email: res?.email,
            merchantId: finalData?.merchantId,
            merchantName: finalData?.merchantName,
            terminalId: finalData?.terminalId,
            terminalName: finalData?.terminalName,
            accountNo: finalData?.accountNo,
            accountType: finalData?.accountType,
          };
          setDataForm(newData);
          _onNextStep(STEP_HDBS.step3);
          return;
        }

        if (status.code === ERROR_CODE.UserEKYCNotFound) {
          _onNextStep(STEP_HDBS.step2);
          setAllowInquiry(true);
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
    _onNextStep(STEP_HDBS.step3);
  };

  const _handleSubmitStep3 = async (data: FormDataStep3) => {
    if (typeCustomer === TypeCustomer.KHM || !allowInquiry) {
      _onCreateOTP();
      return;
    }

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
      // Redirect success page
      _redirectSuccessPage();
      return;
    }
    _toggleLoading("loadingBtnSubmit", false);
    toggleNotify(status.msg);
  };

  const _handleVerifyOtp = (accountOtp: string) => {
    if (accountOtp !== "123456") {
      toggleNotify("OTP không hợp lệ");
      return;
    }
    _onConfirmEKYC();
    // _toggleLoading("loadingBtnConfirmOTP", true);
    // hdbsServices
    //   .verifyOTPApi(accountOtp)
    //   .then((res) => {
    //     _toggleLoading("loadingBtnConfirmOTP", false);
    //     if (_get(res, "data.data.userId")) {
    //       _onConfirmEKYC();
    //       return;
    //     }
    //     toggleNotify("Invalid OTP");
    //   })
    //   .catch((err) => {
    //     _toggleLoading("loadingBtnConfirmOTP", false);
    //   });
  };

  const _onCreateOTP = (isToggleModal = true) => {
    _toggleLoading("loadingBtnSubmit", true);
    hdbsServices
      .createOTPApi()
      .then((res) => {
        _toggleLoading("loadingBtnSubmit", false);
        if (_get(res, "data.data.userId")) {
          isToggleModal && _toggleModalVerifyOTP();
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
          _redirectSuccessPage();
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

  const _handleSelectOpenStock = () => {
    if (!listAccount?.length && typeCustomer === TypeCustomer.KHHH) {
      toggleNotify(
        "Quý khách vui lòng mở tài khoản thanh toán trực tuyến hoặc đến quầy giao dịch để đăng ký sử dụng dịch vụ"
      );
      return;
    }
    _onNextStep(STEP_HDBS.step1);
  };

  const _redirectSuccessPage = () => {
    router.push({
      pathname: "/result",
      query: {
        ...query,
      },
    });
  };

  // const _handleOtherTransaction = () => {
  //   if (typeCustomer === TypeCustomer.KHHH) {
  //     _onNextStep(STEP_HDBS.stepHome);
  //     return;
  //   }
  //   router.push({
  //     pathname: "/backToHome",
  //   });
  // };
  return (
    <>
      <Head>
        <title>{PAGE_TITLE[stepCurrent]}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

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
      {loading.loadingMasterData && <LoadingPage />}

      {md5 && typeCustomer && (
        <div className={classes.root}>
          <TKCKContext.Provider value={TKCKContextValue}>
            {stepCurrent === STEP_HDBS.stepHome && (
              <HomePage onSelect={_handleSelectOpenStock} />
            )}
            {stepCurrent === STEP_HDBS.step1 && (
              <FormTKCKPage
                typeCustomer={typeCustomer}
                onSubmit={_handleSubmitStep1}
              />
            )}
            {stepCurrent === STEP_HDBS.step2 && (
              <EKYCVerifyPage onSubmit={_handleSubmitStep2} />
            )}
            {stepCurrent === STEP_HDBS.step3 && (
              <ConfirmInfoPage
                typeCustomer={typeCustomer}
                data={dataForm}
                onSubmit={_handleSubmitStep3}
                redoEKYC={() => _onNextStep(STEP_HDBS.step2)}
              />
            )}
            {/* {stepCurrent === STEP_HDBS.step4 && (
              <RegisterSuccessPage
                onClickOtherTransaction={_handleOtherTransaction}
              />
            )} */}
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
            onResendOTP={() => _onCreateOTP(false)}
          />
        </Box>
      </Dialog>
    </>
  );
};

export default HDBSPage;
