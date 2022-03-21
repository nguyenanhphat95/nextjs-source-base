import { makeStyles } from "@mui/styles";
import { ERROR_CODE, getLanguage, getStatusResponse } from "commons/helpers";
import { FormTKCKPage } from "components/HDBSPage";
import { ROUTE_STEP } from "components/HDBSPage/consts";
import { FormDataFinal, FormDataStep1 } from "components/HDBSPage/interfaces";
import _get from "lodash/get";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as hdbsServices from "services/hdbsService";
import { setFormData, setToggleLoading } from "store/actions";
import { AppState } from "store/reducer";

const useStyles = makeStyles(() => ({
  rootPage: {
    background: "#F2F2F4",
    minHeight: "100vh",
    position: "relative",
  },
}));

interface Props {
  toggleNotify: (desc?: string, onClose?: any) => void;
}

const Step1FormTKCK = (props: Props) => {
  const { toggleNotify } = props;
  const classes = useStyles();
  const router = useRouter();
  const query = router.query;
  const lang = getLanguage(router);

  const dispatch = useDispatch();
  const { dataForm }: AppState = useSelector((state) => _get(state, "app"));

  const _handleSubmit = (data: FormDataStep1) => {
    dispatch(setToggleLoading("loadingBtnSubmit"));
    const finalData = {
      ...dataForm,
      ...data,
    };
    dispatch(setFormData(finalData));
    hdbsServices
      .checkUserEKYC(
        finalData.merchantId,
        finalData.terminalId,
        finalData.ekycType || "CURRENT_CUSTOMER",
        finalData.accountNo
      )
      .then((res) => {
        dispatch(setToggleLoading("loadingBtnSubmit"));
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
            ...hdbsServices.convertInfoUserFromCore(res),
            merchantId: finalData?.merchantId,
            merchantName: finalData?.merchantName,
            terminalId: finalData?.terminalId,
            terminalName: finalData?.terminalName,
            accountNo: finalData?.accountNo,
            accountType: finalData?.accountType,
            isTranInternet: finalData?.isTranInternet,
            isUttb: finalData?.isUttb,
            isBond: finalData?.isBond,
          };
          dispatch(setFormData(newData));
          router.push({
            pathname: ROUTE_STEP.step3ConfirmInfo,
            query,
          });
          return;
        }

        if (status.code === ERROR_CODE.UserEKYCNotFound) {
          router.push({
            pathname: ROUTE_STEP.step2EKYC,
            query,
          });
          return;
        }
        toggleNotify(status.msg);
      });
  };
  return (
    <>
      <Head>
        {/* <title>Mở tài khoản Chứng khoán</title> */}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <div className={classes.rootPage}>
        <FormTKCKPage onSubmit={_handleSubmit} />
      </div>
    </>
  );
};

export default Step1FormTKCK;
