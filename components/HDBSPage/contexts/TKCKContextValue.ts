import React from "react";
import { MerchantNameItem, TerminalNameItem } from "interfaces/IGetMerchant";
interface TKCKContextValue {
  loadingBtnSubmit?: boolean;
  listMerchant: MerchantNameItem[];
  listTerminal: TerminalNameItem[];
}

const TKCKContext = React.createContext<TKCKContextValue>({
  loadingBtnSubmit: false,
  listMerchant: [],
  listTerminal: [],
});
export default TKCKContext;
