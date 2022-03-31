import { makeStyles } from "@mui/styles";
import { getLanguage, getStatusResponse } from "commons/helpers";
import { checkResultEkyc, parseInfoFromEKYC } from "commons/helpers/ekyc";
import { LoadingPage } from "components/commons";
import { EKYCComponent } from "components/HDBSPage";
import { ROUTE_STEP } from "components/HDBSPage/consts";
import { FormDataFinal } from "components/HDBSPage/interfaces";
import { InquiryEKYCPresentResponse } from "interfaces/IInquiryEKYCPresent";
import _get from "lodash/get";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { writeLogApi } from "services/commonService";
import * as hdbsServices from "services/hdbsService";
import {
  setAllowSendOTP,
  setFormData,
  setStep,
  setToggleLoading,
} from "store/actions";
import { AppState } from "store/reducer";
import { SECRET_KEY_ACCESS_TOKEN } from "commons/constants";
import jwt from "jsonwebtoken";

const useStyles = makeStyles(() => ({
  rootPage: {
    background: "#F2F2F4",
    minHeight: "100vh",
    position: "relative",
  },
}));

export async function getServerSideProps(router: any) {
  const token = router.query.jwt;
  try {
    if (!token) {
      return {
        redirect: {
          destination: "/_error",
          permanent: false,
        },
      };
    }
    const jwtInfo = jwt.verify(token, SECRET_KEY_ACCESS_TOKEN as string);
    return {
      props: {
        jwtInfo,
      },
    };
  } catch {
    return {
      redirect: {
        destination: "/_error",
        permanent: false,
      },
    };
  }
}

interface Props {
  toggleNotify: (desc?: string, onClose?: any, isSuccess?: boolean) => void;
}

const Step2Ekyc = (props: Props) => {
  const { toggleNotify } = props;
  const classes = useStyles();
  const router = useRouter();
  const query = router.query;
  const lang = getLanguage(router);
  const [isShowEKYC, setIsShowEKYC] = React.useState<boolean>(true);

  const dispatch = useDispatch();
  const { dataForm, loading, step }: AppState = useSelector((state) =>
    _get(state, "app")
  );
  const _onGoStep = (pathname: string) => {
    router.push({
      pathname,
      query,
    });
  };

  const onFinishCMND = (data: any) => {
    // debugger;  
    const PaperMsg = _get(data, "ocr.errors[0]");
    if(PaperMsg === "Dau vao mat truoc va sau khong cung loai"){
      toggleNotify("Đầu vào mặt trước và mặt sau không cùng loại");
      return
    }
    if (PaperMsg) {
      toggleNotify(PaperMsg);
    }
  };

  const handleSubmit = (data: any) => {
    if (!data) {
      return;
    }
    const resultEKYC = checkResultEkyc(data);
    if (!resultEKYC.validEKYC) {
      setIsShowEKYC(false);
      toggleNotify(resultEKYC.messageEKYC, () => setIsShowEKYC(true));
      return;
    }
    if (resultEKYC.messageEKYC) {
      toggleNotify(resultEKYC.messageEKYC);
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

    // writeLogApi({content: "request of inquiry: ", body: finalData as any})
    // writeLogApi({content: "info after ekyc: ", body: info as any})
    // writeLogApi({content: "birthdate in client: ", body: info?.birthDateOcr as any})

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
    writeLogApi({content: "birthdate in client: ", body: data?.birthDateOcr as any})
    dispatch(setToggleLoading("loadingMasterData"));
    hdbsServices
      .inquiryENCYPresent(data)
      .then((res) => {
        dispatch(setToggleLoading("loadingMasterData"));
        const code = _get(res, "resultCode");
        const status = getStatusResponse(code, lang);
        if (!status.success) {
          // _onGoStep(ROUTE_STEP.step1FormTKCK);
          toggleNotify(status.msg, () => {
            _onGoStep(ROUTE_STEP.step1FormTKCK);
          });
          return;
        }

        // hasSendOtp = true => user chưa có tài khoản chứng khoán
        if (res.hasSendOtp) {
          updateDataAfterInquiry(res);
          _onGoStep(ROUTE_STEP.step3ConfirmInfo);
          return;
        }
        // hasSendOtp = false => user đã có tài khoản chứng khoán
        dispatch(setAllowSendOTP(false));
        updateDataAfterInquiry(res);
        _onGoStep(ROUTE_STEP.step3ConfirmInfo);
      })
      .catch(() => dispatch(setToggleLoading("loadingMasterData")));
  }
  return (
    <div className={classes.rootPage}>
      <Head>
        {/* <title>Định danh</title> */}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {loading.loadingMasterData && <LoadingPage />}
      {isShowEKYC && (
        <EKYCComponent onFinishCMND={onFinishCMND} onFinish={handleSubmit} />
      )}
    </div>
  );
};

export default Step2Ekyc;
