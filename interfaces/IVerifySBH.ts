export interface VerifySBHRequest {
  request: {
    requestId: string;
    requestTime: string;
  };
  data: {
    credential: string;
    key: string;
  };
}
