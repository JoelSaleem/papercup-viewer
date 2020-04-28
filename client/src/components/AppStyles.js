import React from "react";
import { createGlobalStyle, ThemeProvider } from "../modules/styled";

const theme = {
  BRAND_COL: "#1fa8fb",
  BRAND_COL_LIGHT_1: "#3db6ff",
  BRAND_COL_LIGHT_2: "#64c5ff",
  ACCENT_COL: "#6ae381",
};

const GlobalStyle = createGlobalStyle`
    body {
        font-family: Camphor,Open Sans,Segoe UI,sans-serif;
        font-weight: 600;
    }
`;

export default ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};
