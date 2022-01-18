export interface FormDataStep1 {
  account: string;
  merchantId: string;
  terminalId: string;
  transferInternet: boolean;
  transferAuto: boolean;
  transferBonds: boolean;
}
export interface FormDataFinal extends FormDataStep1 {
  ekycData: any;
}

export enum TypeCustomer {
  KHHH = "KHHH",
  KHM = "KHM",
}
