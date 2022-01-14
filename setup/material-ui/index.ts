import { ColorScheme } from "setup/material-ui/types";

declare module "@mui/material/styles" {
  export interface SimplePaletteColorOptions {
    border?: string;
    background?: string;
    lightBackground?: string;
  }
  interface PaletteOptions {
    // color table
    blue: Partial<ColorScheme>;
  }
}
