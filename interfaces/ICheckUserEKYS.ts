export interface CheckUserENCYRequest {
  userId: string;
  clientNo: string;
  partnetId: string;
}

export interface CheckUserEKYCResponse {
  data: {
    responseCode: string;
    responseDesc: string;
    hasSendOtp: boolean;
  };
}
