import { ResponseData } from "./ICommon";

export interface CheckSessionOTPRequest {
  bTxnId: string;
}

export interface CheckSessionOTPResponse extends ResponseData {
  data?: {
    message?: string;
    code?: string;
  };
}
