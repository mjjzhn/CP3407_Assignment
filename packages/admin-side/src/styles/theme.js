import React from "react";
import { createTheme } from "@mui/material/styles";
import { color } from "./constants";

export const baseTheme = createTheme({
  palette: {
    primary: {
      main: color.primary.main,
    },
    secondary: {
      main: color.secondary.main,
    },
  },   
});
