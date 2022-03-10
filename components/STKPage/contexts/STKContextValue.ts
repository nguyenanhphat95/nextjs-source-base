import React from "react";

interface STKContextValue {
  loadingBtnSubmit: boolean;
  toggleNotify?: (title?: string, desc?: string, onClose?: () => void) => void;
  setLoginStep?: (step: string) => void;
}

const STKContext = React.createContext<STKContextValue>({
  loadingBtnSubmit: false,
  toggleNotify: () => null,
});
export default STKContext;
