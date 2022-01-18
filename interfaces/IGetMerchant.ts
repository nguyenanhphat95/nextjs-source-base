export interface GetMerchantRequest {
  partnerKey: string;
  partnerId: string;
}

export interface GetMerchantResponse {
  data: {
    merchantNames: MerchantNameItem[];
    ternimalNames: TerminalNameItem[];
  };
}

export interface MerchantNameItem {
  merchantId: string;
  merchantName: string;
}

export interface TerminalNameItem {
  terminalId: string;
  terminalName: string;
  merchantId: string;
}
