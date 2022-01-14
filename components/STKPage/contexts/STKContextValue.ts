import React from "react";

interface STKContextValue {
  loadingBtnSubmit: boolean;
}

const STKContext = React.createContext<STKContextValue>({
  loadingBtnSubmit: false,
});
export default STKContext;
