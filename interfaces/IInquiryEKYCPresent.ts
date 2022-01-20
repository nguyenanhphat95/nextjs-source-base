import { Gender, EkycType } from "./ICommon";

export interface InquiryEKYCPresentRequest {
  requestId: string;
  channel: string;
  ekyType: EkycType;
  username: string;
  clientNo: string;
  transactionTime: string;
  partnerId: string;
  language: string;
  checksum: string;

  accountNo?: string;
  accountType?: string;
  email?: string;
  phoneNumber?: string;

  fullName: string;
  fullNameOcr: string;

  birthDate: string;
  birthDateOcr: string;

  dateOfIssue: string;
  dateOfIssueOcr: string;

  placeOfIssueOcr: string;
  placeOfIssue: string;

  expireOfIssueOcr: string;
  expireOfIssue: string;

  idNumber: string;
  idNumberType: string;
  idNumberOld: string;

  gender: Gender;
  address: string;
  stateIdContact: string;
  stateNameContact: string;
  districtIdContact: string;
  districtNameContact: string;
  wardIdContact: string;
  wardNameContact: string;
  streetNameContact: string;
  stateIdCurrent: string;
  stateNameCurrent: string;
  districtIdCurrent: string;
  districtNameCurrent: string;
  wardIdCurrent: string;
  wardNameCurrent: string;
  streetNameCurrent: string;
  nationalityId: string;
  nationalityName: string;
  branchId: string;
  branchName: string;
  literacyName: string;
  literacyDesc: string;
  maritalStatus: string;
  maritalDesc: string;
  careerId: string;
  careerName: string;
  positionId: string;
  positionName: string;
  salaryIncome: string;
  biometricsRate: string;
  ekycId: string;
  faceMatching: string;
}

export interface InquiryEKYCPresentResponse {
  data: {
    responseCode: string;
    responseDesc: string;
    hasSendOtp: boolean;
  };
}
