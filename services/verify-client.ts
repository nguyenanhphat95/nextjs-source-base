import { AxiosResponse } from "axios";
import axiosWrapper from "commons/helpers/axios/axios-instance";
import { VerifyUserResponse } from "pages/api/verifyUser";

export interface VerifyClientBody {
  request: {
    requestId: string;
    requestTime: string;
    partnerId: string;
    signature: string;
  };
  data: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  };
}

export const verifyClientApi = async (body: VerifyClientBody) => {
  const resp: AxiosResponse<VerifyUserResponse> = await axiosWrapper.post(
    "/api/verifyUser",
    body
  );
  return resp;
};
