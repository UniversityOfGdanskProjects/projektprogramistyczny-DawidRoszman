import {
  Dispatch,
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";
import axios from "axios";
import { Action, ScreeningReducer, Type } from "./screeningReducer";
import { Screening } from "@/types/types";

export const ScreeningContext = createContext<Screening[] | null>(null);
export const DispatchContext = createContext<Dispatch<Action> | null>(null);

export function useScreening() {
  return useContext(ScreeningContext);
}
export function useScreeningDispatch() {
  return useContext(DispatchContext);
}

export function ScreeningProvider({ children }: any) {
  const [screening, dispatch] = useReducer(ScreeningReducer, []);

  useEffect(() => {
    axios
      .get("http://pi.dawidroszman.eu:8080/api/v1/cinema/screenings")
      .then((response) => {
        console.log(response.data);
        const screenings = response.data;
        dispatch({
          type: Type.SET_SCREENING,
          payload: { screenings: screenings },
        });
      });
  }, []);

  return (
    <ScreeningContext.Provider value={screening}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </ScreeningContext.Provider>
  );
}
