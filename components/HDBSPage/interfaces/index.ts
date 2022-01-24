export interface FormDataStep1 {
  accountNo: string;
  accountType: string;
  merchantId: string;
  merchantName?: string;
  terminalId: string;
  terminalName?: string;
  isTranInternet: boolean;
  isUttb: boolean;
  isBond: boolean;
}

export interface FormDataStep3 {
  idNumber?: string;
  idNumberType?: string;
  fullNameOcr?: string;
  gender?: string;
  birthDateOcr?: string;
  dateOfIssueOcr?: string;
  placeOfIssueOcr?: string;
  expireOfIssueOcr?: string;
  nationalityName?: string;
  address?: string;

  fullName?: string;
  birthDate?: string;
  dateOfIssue?: string;
  placeOfIssue?: string;
  expireOfIssue?: string;
}
export interface FormDataFinal extends FormDataStep1, FormDataStep3 {
  ekycData: any;
  accountOtp?: string;
}

export enum TypeCustomer {
  KHHH = "KHHH",
  KHM = "KHM",
}

export interface MasterData {
  userId: string;
  clientNo: string;
  language: string;
  accessToken?: string;
  expireIn?: number;
}
