export interface RatingRequest {
  requestId: string;
  channel: string;
  partnerId: string;
  language: string;
  transactionTime: string;
  checksum: string;
  userId: string;
  clientNo: string;
  ratingNumber: number;
  ratingNote: string;
  ratingInfo: string;
  ratingType: string;
  ratingTypeName: string;
  ratingProductGroup: string;
  ratingProductCode: string;
  ratingProduct: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
}

export interface RatingResponse {
  resultCode: string;
  resultMessage: string;
  id: string;
}
