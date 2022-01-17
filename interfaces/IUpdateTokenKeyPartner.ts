export interface UpdateTokenKeyPartnerRequest {
  userId: string;
  clientNo: string;
  token: string;
  partnerId: string;
}

export interface UpdateTokenKeyPartnerResponse {
  data: {
    responseCode: string;
    responseDesc: string;
  };
}
