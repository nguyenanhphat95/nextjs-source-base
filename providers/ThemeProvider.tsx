import React from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import theme from "setup/material-ui/theme";

interface Props {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
