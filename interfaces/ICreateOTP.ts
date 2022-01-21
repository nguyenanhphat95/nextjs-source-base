export interface CreateOTPRequest {
  requestId: string;
  data: {
    channel: string;
    serviceCode: string;
    userId: string;
    serialNo: string;
    narrative: string;
    language: string;
    clientImei: string;
    partner: string;
    isReqChalCode: string;
    mediaType: string;
  };
}

export interface CreateOTPResponse {
  data: {
    returnOTP: string;
    mediaType: string;
    userId: string;
    narrative: string;
  };
}
