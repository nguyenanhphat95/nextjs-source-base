import React, { useReducer } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { checkResultEkyc, parseInfoFromEKYC } from "commons/helpers/ekyc";
import { useRouter } from "next/router";
import { ROUTE_STEP } from "components/HDBSPage/consts";
import { EKYCComponent } from "components/HDBSPage";

import { setFormData, setAllowSendOTP, setToggleLoading } from "store/actions";
import reducer, { AppState, initialState } from "store/reducer";
import { FormDataFinal } from "components/HDBSPage/interfaces";
import * as hdbsServices from "services/hdbsService";
import { InquiryEKYCPresentResponse } from "interfaces/IInquiryEKYCPresent";
import { getLanguage, getStatusResponse } from "commons/helpers";
import resources from "pages/assets/translate.json";
import _get from "lodash/get";
import { LoadingPage } from "components/commons";

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

const Step2Ekyc = (props: Props) => {
  const { toggleNotify } = props;
  const classes = useStyles();
  const router = useRouter();
  const query = router.query;
  const lang = getLanguage(router);
  const t = _get(resources, [lang, "homePage"]);

  const dispatch = useDispatch();
  const { dataForm, loading }: AppState = useSelector((state) =>
    _get(state, "app")
  );

  const handleSubmit = (data: any) => {
    if (!data) {
      return;
    }

    const resultEKYC = checkResultEkyc(data);
    if (!resultEKYC.validEKYC) {
      router.push({
        pathname: ROUTE_STEP.stepErrorEkyc,
        query,
      });

      toggleNotify(resultEKYC.messageEKYC, () =>
        router.push({
          pathname: ROUTE_STEP.step2EKYC,
          query,
        })
      );
      return;
    }

    const info = parseInfoFromEKYC(data);
    const finalData = {
      ...dataForm,
      ...info,
      fullName: info?.fullNameOcr,
      birthDate: info?.birthDateOcr,
      dateOfIssue: info?.dateOfIssueOcr,
      placeOfIssue: info?.placeOfIssueOcr,
      expireOfIssue: info?.expireOfIssueOcr,
      idNumber: info?.idNumber as string,
      ekycData: data,
    };
    dispatch(setFormData(finalData));
    _inquiryEKYC(finalData);
  };

  function _inquiryEKYC(data: FormDataFinal) {
    const updateDataAfterInquiry = (res: InquiryEKYCPresentResponse) => {
      dispatch(
        setFormData({
          ...dataForm,
          ...hdbsServices.convertInfoUserFromCore(res),
        })
      );
    };

    dispatch(setToggleLoading("loadingMasterData"));
    hdbsServices
      .inquiryENCYPresent(data)
      .then((res) => {
        dispatch(setToggleLoading("loadingMasterData"));
        const code = _get(res, "resultCode");
        const status = getStatusResponse(code, lang);
        if (!status.success) {
          toggleNotify(status.msg, () => {
            router.push({
              pathname: ROUTE_STEP.step1FormTKCK,
              query,
            });
          });
          return;
        }

        if (res.hasSendOtp) {
          updateDataAfterInquiry(res);
          router.push({
            pathname: ROUTE_STEP.step3ConfirmInfo,
            query,
          });
          return;
        }

        dispatch(setAllowSendOTP(false));
        updateDataAfterInquiry(res);
        router.push({
          pathname: ROUTE_STEP.step3ConfirmInfo,
          query,
        });
      })
      .catch(() => dispatch(setToggleLoading("loadingMasterData")));
  }
  return (
    <div className={classes.rootPage}>
      <Head>
        <title>Định danh</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {loading.loadingMasterData && <LoadingPage />}
      <EKYCComponent onFinish={handleSubmit} />
    </div>
  );
};

export default Step2Ekyc;
