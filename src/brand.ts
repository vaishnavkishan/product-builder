import { createTheme, type ThemeOptions } from "@mui/material";

const themeOptions: ThemeOptions = {
  colorSchemes: {
    dark: true,
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#1aa270",
      light: "#e3f5ec",
      dark: "#005b30",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#ff6759",
      light: "#f9a5a1",
      dark: "#d74231",
      contrastText: "#e6e6e7",
    },
    error: {
      main: "#EF5350",
    },
    warning: {
      main: "#FFA726",
    },
    info: {
      main: "#29B6F6",
    },
    success: {
      main: "#66BB6A",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#e6e6e7",
      disabled: "rgba(255,255,255,0.6)",
    },
    divider: "rgba(255,255,255,0.12)",
  },
  typography: {
    h1: {
      fontFamily: "Roboto Condensed",
      fontSize: 96,
      fontWeight: 500,
    },
    h2: {
      fontFamily: "Roboto Condensed",
      fontSize: 60,
      fontWeight: 500,
    },
    h3: {
      fontFamily: "Eczar",
      fontWeight: 500,
    },
    h4: {
      fontFamily: "Roboto Condensed",
      fontSize: 34,
    },
    h5: {
      fontFamily: "Roboto Condensed",
      fontSize: 24,
    },
    h6: {
      fontFamily: "Roboto Condensed",
      fontSize: 20,
      fontWeight: 400,
    },
    subtitle1: {
      fontFamily: "Roboto Condensed",
      fontSize: 16,
    },
    subtitle2: {
      fontFamily: "Roboto Condensed",
      fontSize: 14,
    },
    body1: {
      fontFamily: "Eczar",
      fontSize: 16,
    },
    body2: {
      fontFamily: "Roboto Condensed",
      fontSize: 14,
      fontWeight: 300,
    },
    button: {
      fontFamily: "Roboto Condensed",
      fontSize: 14,
      fontWeight: 600,
    },
    caption: {
      fontFamily: "Roboto Condensed",
      fontSize: 12,
    },
    overline: {
      fontFamily: "Roboto Condensed",
      fontSize: 10,
    },
  },
};

export const theme = createTheme(themeOptions);
