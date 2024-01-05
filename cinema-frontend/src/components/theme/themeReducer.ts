export interface Action {
  payload: Theme;
  type: Type;
}

export enum Type {
  SET_THEME = "SET_THEME",
}

export interface Theme {
  theme: boolean;
}

export const ThemeReducer = (state: Theme, action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case Type.SET_THEME:
      document.documentElement.setAttribute(
        "data-theme",
        payload.theme ? "dark" : "light",
      );
      localStorage.setItem("theme", JSON.stringify(payload.theme));
      return {
        ...state,
        theme: payload.theme,
      };
  }
};
