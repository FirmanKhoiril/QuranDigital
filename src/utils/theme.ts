import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "'Quicksand', sans-serif",
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#fafafa",
      paper: "#fff",
    },
    text: {
      primary: "#0c0c0c",
    },
    primary: {
      main: "#ee913d",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0c0c0c",
      paper: "#1a1a1a",
    },
    text: {
      primary: "#f5f5f5",
    },
    primary: {
      main: "#ee913d",
    },
  },
});