import { ResponseData } from "./ICommon";

export interface VerifySbhOTPRequest {
  otp: string;
  bTxnId: string;
}

export interface VerifySbhOTPResponse extends ResponseData {
  data?: {
    txnId: string;
  };
}
