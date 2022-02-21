import React from "react";
import { MerchantNameItem, TerminalNameItem } from "interfaces/IGetMerchant";
import { AccountItem } from "interfaces/IListAccount";
interface TKCKContextValue {
  loadingBtnSubmit?: boolean;
  loadingBtnConfirmOTP?: boolean;
  listMerchant: MerchantNameItem[];
  listTerminal: TerminalNameItem[];
  listAccount: AccountItem[];
  userRegisteredHDBS: boolean;
}

const TKCKContext = React.createContext<TKCKContextValue>({
  loadingBtnSubmit: false,
  loadingBtnConfirmOTP: false,
  userRegisteredHDBS: false,
  listAccount: [],
  listMerchant: [],
  listTerminal: [],
});
export default TKCKContext;
