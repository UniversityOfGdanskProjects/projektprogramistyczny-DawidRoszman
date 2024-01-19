"use client";
import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { Action, Token, TokenReducer, Type } from "./tokenReducer";
import { useCookies } from "next-client-cookies";

export const TokenContext = createContext<Token | null>(null);
export const DispatchContext = createContext<Dispatch<Action> | null>(null);

export function useToken() {
  return useContext(TokenContext);
}
export function useTokenDispatch() {
  return useContext(DispatchContext);
}

const initialState: Token = {
  token: null,
};
export function TokenProvider({ children }: { children: React.ReactNode }) {
  const [Token, dispatch] = useReducer(TokenReducer, initialState);
  const cookieStore = useCookies();
  useEffect(() => {
    dispatch({
      type: Type.SET_TOKEN,
      payload: cookieStore.get("token"),
    });
  }, [cookieStore]);
  return (
    <TokenContext.Provider value={Token}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </TokenContext.Provider>
  );
}

export default TokenProvider;
