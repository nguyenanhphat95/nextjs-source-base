import React from "react";

interface TKCKContextValue {
  loadingBtnSubmit?: boolean;
}

const TKCKContext = React.createContext<TKCKContextValue>({
  loadingBtnSubmit: false,
});
export default TKCKContext;
