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
  fullName: string;
  gender: string;
  birthDate: string;
  identityId: string;
  idDate: string;
  idPlace: string;
  address: string;
  address2: string;
  national: string;
  phoneNumber: string;
  identityIdType: string;
  email: string;
}
