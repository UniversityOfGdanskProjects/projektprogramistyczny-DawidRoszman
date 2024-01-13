import { useCookies } from "next-client-cookies";

export interface Action {
  payload: Token;
  type: Type;
}

export enum Type {
  SET_TOKEN,
  REMOVE_TOKEN
}

export interface Token {
  token: string;
}

export const TokenReducer = (state: Token, action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case Type.SET_TOKEN:
      return {
        ...state,
        token: payload.token,
      };
    case Type.REMOVE_TOKEN:
      return {
        ...state,
        token: "",
      };
  }
};