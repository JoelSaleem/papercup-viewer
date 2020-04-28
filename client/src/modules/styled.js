import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle as StyleComponentsCreateGlobalStyle,
} from "styled-components";

const button = (...args) => {
  return styled.button(...args);
};

const div = (...args) => {
  return styled.div(...args);
};

export const ThemeProvider = StyledComponentsThemeProvider;

export const createGlobalStyle = (...args) => {
  return StyleComponentsCreateGlobalStyle(...args);
};

export default {
  div,
  button,
};
