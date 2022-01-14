import axios, { AxiosResponse } from "axios";
import { VerifyResponse } from "pages/api/verify";

export interface VerifyBody {
  request: {
    requestId: string;
    requestTime: string;
    partnerId: string;
    signature: string;
  };
  data: {
    credential: string;
    key: string;
  };
}

export const verifyApi = async (body: VerifyBody) => {
  const resp: AxiosResponse<VerifyResponse> = await axios.post(
    "/api/verify",
    body
  );
  return resp;
};
