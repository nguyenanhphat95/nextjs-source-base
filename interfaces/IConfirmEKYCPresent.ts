export interface ConfirmEKYCRequest {
  requestId: string;
  accountOtp: string;
  partnerId: string;
}

export interface ConfirmEKYCResponse {
  data: {
    responseCode: string;
    responseDesc: string;
  };
}
