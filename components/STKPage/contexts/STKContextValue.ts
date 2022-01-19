import React from "react";

interface STKContextValue {
  loadingBtnSubmit: boolean;
  toggleNotify: (title?: string, desc?: string) => void;
}

const STKContext = React.createContext<STKContextValue>({
  loadingBtnSubmit: false,
  toggleNotify: () => null,
});
export default STKContext;
