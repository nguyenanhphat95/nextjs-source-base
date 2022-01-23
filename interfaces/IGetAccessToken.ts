export interface GetAccessTokenRequest {
  requestId: string;
  language: string;
  userName: string;
  password: string;
  transactionTime: string;
  checksum: string;
  channel: string;
}

export interface GetAccessTokenResponse {
  resultCode: string;
  resultMessage: string;
  accessToken: string;
  expiryIn: number;
}
