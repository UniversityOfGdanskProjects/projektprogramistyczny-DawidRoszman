"use client";
import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
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
  theme: JSON.parse(localStorage.getItem("theme") || "0") || false,
};
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, dispatch] = useReducer(ThemeReducer, initialState);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme.theme ? "dark" : "light",
    );
  }, []);
  return (
    <ThemeContext.Provider value={theme}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
