export interface ConfirmEKYCRequest {
  requestId: string;
  channel: string;
  userId: string;
  clientNo: string;
  partnerId: string;
  transactionTime: string;
  isTranInternet: boolean;
  isUttb: boolean;
  isBond: boolean;
  language: string;
  checksum: string;
}

export interface ConfirmEKYCResponse {
  resultCode: string;
  resultMessage: string;
}
