import {
  PaletteOptions,
  ThemeOptions,
  createTheme,
} from "@mui/material/styles";
import { ColorSchemeKEC } from "./types";
import { CommonColors } from "@mui/material/styles/createPalette";

const grey: ColorSchemeKEC = {
  50: "#FAFAFA",
  100: "#F5F5F5",
  200: "#EEEEEE",
  300: "#E0E0E0",
  400: "#BDBDBD",
  500: "#9E9E9E",
  600: "#9E9E9E",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#D5D5D5",
  A200: "#AAAAAA",
  A400: "#616161",
  A700: "#303030",
};

const pink: ColorSchemeKEC = {
  50: "#FCE4EC",
  100: "#F8BBD0",
  200: "#F48FB1",
  300: "#F06292",
  400: "#EC407A",
  500: "#E91E63",
  600: "#D81B60",
  700: "#C2185B",
  800: "#AD1457",
  900: "#880E4F",
  A100: "#F50057",
  A200: "#FF4081",
  A400: "#F50057",
  A700: "#C51162",
};

const orange: ColorSchemeKEC = {
  50: "#FFF3E0",
  100: "#FFE0B2",
  200: "#FFCC80",
  300: "#FFB74D",
  400: "#FFA726",
  500: "#FF9800",
  600: "#FB8C00",
  700: "#F57C00",
  800: "#EF6C00",
  900: "#E65100",
  A100: "#FFD180",
  A200: "#FFAB40",
  A400: "#FF9100",
  A700: "#FF6D00",
};

const green: ColorSchemeKEC = {
  50: "#E8F5E9",
  100: "#C8E6C9",
  200: "#A5D6A7",
  300: "#81C784",
  400: "#66BB6A",
  500: "#4CAF50",
  600: "#43A047",
  700: "#388E3C",
  800: "#2E7D32",
  900: "#1B5E20",
  A100: "#B9F6CA",
  A200: "#69F0AE",
  A400: "#00E676",
  A700: "#00C853",
};

const yellow: ColorSchemeKEC = {
  50: "#FFFDE7",
  100: "#FFF9C4",
  200: "#FFF59D",
  300: "#FFF176",
  400: "#FFEE58",
  500: "#FFEB3B",
  600: "#FDD835",
  700: "#FBC02D",
  800: "#F9A825",
  900: "#F57F17",
  A100: "#FFFF8D",
  A200: "#FFFF00",
  A400: "#FFEA00",
  A700: "#FFD600",
};

const blue: ColorSchemeKEC = {
  50: "#E3F2FD",
  100: "#BBDEFB",
  200: "#90CAF9",
  300: "#1976D2",
  400: "#42A5F5",
  500: "#2196F3",
  600: "#1E88E5",
  700: "#0B79D0",
  800: "#1565C0",
  900: "#0D47A1",
  A100: "#82B1FF",
  A200: "#448AFF",
  A400: "#2979FF",
  A700: "#2962FF",
};

const red: ColorSchemeKEC = {
  50: "#FEEBEE",
  100: "#FECDD2",
  200: "#EF9A9A",
  300: "#BE134D",
  400: "#EF5350",
  500: "#F44336",
  600: "#E53935",
  700: "#BE134D",
  800: "#C62828",
  900: "#B71C1C",
  A100: "#FF8A80",
  A200: "#FF5252",
  A400: "#FF1744",
  A700: "#D50000",
};
// const purple: ColorSchemeKEC = {
//   50: "#F3E5F5",
//   100: "#E1BEE7",
//   200: "#CE93D8",
//   300: "#BA68C8",
//   400: "#AB47BC",
//   500: "#9C27B0",
//   600: "#8E24AA",
//   700: "#7B1FA2",
//   800: "#6A1B9A",
//   900: "#4A148C",
//   A100: "#EA80FC",
//   A200: "#E040FB",
//   A400: "#D500F9",
//   A700: "#AA00FF",
// };

// const cyan: ColorSchemeKEC = {
//   50: "#E0F7FA",
//   100: "#B2EBF2",
//   200: "#80DEEA",
//   300: "#4DD0E1",
//   400: "#26C6DA",
//   500: "#00BCD4",
//   600: "#00ACC1",
//   700: "#0097A7",
//   800: "#00838F",
//   900: "#006064",
//   A100: "#84FFFF",
//   A200: "#18FFFF",
//   A400: "#00E5FF",
//   A700: "#00B8D4",
// };

const common: CommonColors = {
  white: "#fff",
  black: "#000",
};

const palette: PaletteOptions = {
  primary: {
    main: blue[500],
    light: "#64B6F7",
    dark: blue[700],
    contrastText: common.white,
  },
  secondary: {
    main: orange[300],
    light: "#F06191",
    dark: orange[500],
    contrastText: common.black,
  },
  info: {
    main: blue[500],
    light: "#64B6F7",
    dark: blue[700],
    contrastText: common.white,
  },
  error: {
    main: red[500],
    light: "#F88078",
    dark: red[700],
    contrastText: common.white,
  },
  warning: {
    main: orange[500],
    light: "#FFB547",
    dark: "#C77700",
    contrastText: common.white,
  },
  success: {
    main: green[500],
    light: "#7BC67E",
    dark: "#3B873E",
    contrastText: common.white,
  },
  text: {
    primary: grey[900],
    secondary: "#757575",
    disabled: grey[500],
  },
  divider: "#E0E0E0",
  action: {
    hover: grey[100],
    selected: "#EBEBEB",
    disabledBackground: "#E0E0E0",
    disabled: grey[400],
  },
  background: {
    default: common.white,
  },
  contrastThreshold: 3,
  blue,
};

const variables: Readonly<ThemeOptions> = {
  palette,
};

const theme = createTheme(variables);
export default theme;
