export interface CheckUserENCYRequest {
  requestId: string;
  channel: string;
  userId: string;
  clientNo: string;
  merchantId: string;
  terminalId: string;
  partnerId: string;
  transactionTime: string;
  language: string;
  checksum: string;
}

export interface CheckUserEKYCResponse {
  resultCode: string;
  resultMessage: string;
  hasSendOtp: boolean;
}
