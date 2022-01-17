export interface ConfirmEKYCRequest {
  requestId: string;
  accountOtp: string;
  partnetId: string;
}

export interface ConfirmEKYCResponse {
  data: {
    responseCode: string;
    responseDesc: string;
  };
}
