import axios, { AxiosResponse } from "axios";
import {
  CHANNEL_SBH,
  IS_REQ_CHAL_CODE_SBH,
  NARRATIVE_SBH,
  SERVICE_CODE_SBH,
} from "commons/constants";
import { CreateOTPRequest, CreateOTPResponse } from "interfaces/ICreateOTP";
import { VerifyOTPRequest, VerifyOTPResponse } from "interfaces/IVerifyOTP";
import { v4 as uuidv4 } from "uuid";
import _get from "lodash/get";
import { ChangepassRequest } from "interfaces/IChangePass";


export const createOTPApi = async (userId: string) => {
  const body: CreateOTPRequest = {
    requestId: uuidv4() as string,
    data: {
      channel: CHANNEL_SBH as string,
      serviceCode: SERVICE_CODE_SBH as string,
      userId,
      serialNo: "",
      narrative: "Doi mat khau",
      language: "vi",
      clientImei: "",
      partner: "",
      isReqChalCode: IS_REQ_CHAL_CODE_SBH as string,
      mediaType: "",
    },
  };
  const resp: AxiosResponse<CreateOTPResponse> = await axios.post(
    "/sso/api/createOTP",
    body
  );
  return resp;
};

export const verifyOTPApi = async (userId: string, otp: string) => {
  const body: VerifyOTPRequest = {
    requestId: uuidv4() as string,
    data: {
      channel: CHANNEL_SBH as string,
      serviceCode: SERVICE_CODE_SBH as string,
      userId,
      serialNo: "",
      narrative: NARRATIVE_SBH as string,
      mediaType: "",
      challengeCode: "",
      otp,
    },
  };
  const resp: AxiosResponse<any> = await axios.post("/sso/api/verifyOTP", body);
  return resp;
};

export const changePass = async (credential: string, key: string) => {
  const body: ChangepassRequest = {
    request: {
      requestId: uuidv4() as string,
      requestTime: "",
    },
    data: {
      credential: credential,
      key: key,
    },
  };
  const resp: AxiosResponse<any> = await axios.post(
    "/sso/api/changePassword",
    body
  );
  return resp;
};
