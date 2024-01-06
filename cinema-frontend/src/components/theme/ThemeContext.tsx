"use client";
import { Dispatch, createContext, useContext, useReducer } from "react";
import { Action, Theme, ThemeReducer } from "./themeReducer";

export const ThemeContext = createContext<Theme | null>(null);
export const DispatchContext = createContext<Dispatch<Action> | null>(null);

export function useTheme() {
  return useContext(ThemeContext);
}
export function useThemeDispatch() {
  return useContext(DispatchContext);
}

const initialState: Theme = {
  theme: localStorage.getItem("theme") === "true" ? true : false,
};
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, dispatch] = useReducer(ThemeReducer, initialState);
  return (
    <html lang="en" data-theme={theme.theme ? "light" : "dark"}>
      <ThemeContext.Provider value={theme}>
        <DispatchContext.Provider value={dispatch}>
          {children}
        </DispatchContext.Provider>
      </ThemeContext.Provider>
    </html>
  );
}

export default ThemeProvider;
