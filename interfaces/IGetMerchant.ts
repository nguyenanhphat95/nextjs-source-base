export interface GetMerchantRequest {
  partnerKey: string;
  partnetId: string;
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
