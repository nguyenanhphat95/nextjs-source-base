import { ResponseData } from "./ICommon";

export interface GetInfoByTokenRequest {
  bTxnId: string;
}

export interface GetInfoByTokenResponse extends ResponseData {
  data: {
    tokenizeId: string;
    txnId: string;
    amount: string;
    description: string;
    accountNo: string;
  };
}
