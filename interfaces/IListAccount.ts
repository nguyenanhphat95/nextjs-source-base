export interface ListAccountResponse {
  data: AccountItem[];
}
export interface AccountItem {
  AcctType: string;
  accountNo: string;
  accountName: string;
  balance: string;
  Ccy: string;
  Branchname: string;
  AcctTypeName: string;
  clientInd: string;
  acctStatus: string;
}

export interface ListAccountRequest {
  requestId: string;
  data: {
    clientNo: string;
  };
}
