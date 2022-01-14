export interface VerifyOTPRequest {
  requestId: string;
  data: {
    channel: string;
    serviceCode: string;
    userId: string;
    serialNo: string;
    narrative: string;
    mediaType: string;
    otp: string;
    challengeCode: string;
  };
}

export interface VerifyOTPResponse {
  data: {
    userId: string;
    narrative: string;
    otp: string;
    challengeCode: string;

    responseId?: string;
    resultCode?: string;
    resultMessage?: string;
  };
}
