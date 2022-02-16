import { ResponseData } from "./ICommon";

export interface PurchaseSbhRequest {
  tokenizeId: string;
  txnId: string;
  amount: string;
  description: string;
  accountNo: string;
}

export interface PurchaseSbhResponse extends ResponseData {
  data: {
    url: string;
    txnId: string;
    bTxnId: string;
  };
}
