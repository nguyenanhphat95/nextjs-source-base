export interface CheckUserENCYRequest {
  userId: string;
  clientNo: string;
  merchantId: string;
  terminalId: string;
  partnerId: string;
}

export interface CheckUserEKYCResponse {
  data: {
    responseCode: string;
    responseDesc: string;
    hasSendOtp: boolean;
  };
}
