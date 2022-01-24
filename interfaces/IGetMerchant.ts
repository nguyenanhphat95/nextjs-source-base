export interface GetMerchantRequest {
  requestId: string;
  channel: string;
  partnerId: string;
  language: string;
  transactionTime: string;
  checksum: string;
}

export interface GetMerchantResponse {
  merchants: MerchantNameItem[];
  terminals: TerminalNameItem[];
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
