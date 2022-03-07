import React from "react";
import { MerchantNameItem, TerminalNameItem } from "interfaces/IGetMerchant";
import { AccountItem } from "interfaces/IListAccount";
interface TKCKContextValue {
  loadingBtnSubmit?: boolean;
  loadingBtnConfirmOTP?: boolean;
  listMerchant: MerchantNameItem[];
  listTerminal: TerminalNameItem[];
  listAccount: AccountItem[];
  toggleNotify: (desc?: string, onClose?: any) => void;
}

const TKCKContext = React.createContext<TKCKContextValue>({
  loadingBtnSubmit: false,
  loadingBtnConfirmOTP: false,
  listAccount: [],
  listMerchant: [],
  listTerminal: [],
  toggleNotify: () => null,
});
export default TKCKContext;
