import { Box, Dialog } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  ERROR_CODE,
  getLanguage,
  getStatusOTPResponse,
  getStatusResponse,
} from "commons/helpers";
import { ConfirmInfoPage, VerifyOTP } from "components/HDBSPage";
import { ROUTE_STEP } from "components/HDBSPage/consts";
import { TypeCustomer } from "components/HDBSPage/interfaces";
import _get from "lodash/get";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as hdbsServices from "services/hdbsService";
import { setStep, setToggleLoading } from "store/actions";
import { AppState } from "store/reducer";

const useStyles = makeStyles(() => ({
  rootPage: {
    background: "#F2F2F4",
    minHeight: "100vh",
    position: "relative",
  },
  dialogCustom: {
    "& .MuiPaper-root": {
      margin: 0,
    },
  },
  otpContainer: {
    background: "#FAFAFA",
  },
}));
interface Props {
  toggleNotify: (desc?: string, onClose?: any, isSuccess?: boolean) => void;
}

const Step3ConfirmInfo = (props: Props) => {
  const { toggleNotify } = props;
  const classes = useStyles();
  const router = useRouter();
  const query = router.query;
  const lang = getLanguage(router);

  const dispatch = useDispatch();
  const { dataForm, typeCustomer, allowSendOTP, loading }: AppState =
    useSelector((state) => _get(state, "app"));
  const [openVerifyOTP, setOpenVerifyOTP] = useState(false);

  const _toggleModalVerifyOTP = () => {
    setOpenVerifyOTP((prev) => !prev);
  };

  const _onCreateOTP = (isToggleModal = true) => {
    dispatch(setToggleLoading("loadingBtnSubmit"));
    hdbsServices
      .createOTPApi()
      .then((res) => {
        dispatch(setToggleLoading("loadingBtnSubmit"));
        const code = _get(res, "data.resultCode");
        if (_get(res, "data.data.userId")) {
          isToggleModal && _toggleModalVerifyOTP();
          return;
        }
        const status = getStatusOTPResponse(code, lang);
        toggleNotify(status.msg);
      })
      .catch((err) => {
        dispatch(setToggleLoading("loadingBtnSubmit"));
      });
  };

  const _handleSubmit = () => {
    if (allowSendOTP || typeCustomer === TypeCustomer.KHM) {
      _onCreateOTP();
      return;
    }

    // User đã có tài khoản chứng khoán => show thông báo và redirect về step 1
    const { msg } = getStatusResponse("08", lang);
    toggleNotify(msg, () => {
      _onNextStep(ROUTE_STEP.step1FormTKCK);
    });
  };

  const _onNextStep = (pathname: string) => {
    router.push({
      pathname,
      query,
    });
  };

  const _handleVerifyOtp = (accountOtp: string) => {
    dispatch(setToggleLoading("loadingBtnConfirmOTP"));
    hdbsServices
      .verifyOTPApi(accountOtp)
      .then((res) => {
        dispatch(setToggleLoading("loadingBtnConfirmOTP"));

        const code = _get(res, "data.resultCode");
        if (_get(res, "data.data.userId")) {
          // Tạo tài khoản chứng khoán
          _onConfirmEKYC();
          return;
        }
        const status = getStatusOTPResponse(code, lang);
        toggleNotify(
          status.msg,
          status.code === ERROR_CODE.InvalidOTP
            ? () => null
            : () => _toggleModalVerifyOTP()
        );
      })
      .catch((err) => {
        dispatch(setToggleLoading("loadingBtnConfirmOTP"));
      });
  };

  const _onConfirmEKYC = () => {
    dispatch(setToggleLoading("loadingBtnConfirmOTP"));
    hdbsServices
      .confirmEKYCPresent(dataForm)
      .then((res) => {
        const code = _get(res, "resultCode");
        const status = getStatusResponse(code, lang);
        dispatch(setToggleLoading("loadingBtnConfirmOTP"));

        if (status.success) {
          _toggleModalVerifyOTP();
          _onNextStep(ROUTE_STEP.stepResult);
          return;
        }
        toggleNotify(status.msg, () => {
          _onNextStep(ROUTE_STEP.step1FormTKCK);
        });
      })
      .catch((err) => {
        dispatch(setToggleLoading("loadingBtnConfirmOTP"));
      });
  };

  return (
    <div className={classes.rootPage}>
      <Head>
        {/* <title>Xác nhận thông tin</title> */}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ConfirmInfoPage
        loadingBtnSubmit={loading.loadingBtnSubmit}
        typeCustomer={typeCustomer}
        data={dataForm}
        onSubmit={_handleSubmit}
        redoEKYC={() => _onNextStep(ROUTE_STEP.step2EKYC)}
      />

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
    </div>
  );
};

export default Step3ConfirmInfo;
