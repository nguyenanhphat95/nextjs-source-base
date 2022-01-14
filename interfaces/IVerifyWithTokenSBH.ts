import { ResponseData } from "./ICommon";

export interface VerifyWithTokenSBHRequest {
  request: {
    requestId: string;
    requestTime: string;
  };
  data: {
    credential: string;
    key: string;
    bankAccount: string;
  };
}

export interface VerifyWithTokenSBHResponse extends ResponseData {
  data: {
    code: string;
  };
}
