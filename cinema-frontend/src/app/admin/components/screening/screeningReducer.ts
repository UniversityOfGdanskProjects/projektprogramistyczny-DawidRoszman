import { Screening } from "@/types/types";

export interface Action {
  payload: any;
  type: Type;
}

export enum Type {
  ADD_SCREENING,
  REMOVE_SCREENING,
  MODIFY_SCREENING,
  SET_SCREENING,
}

export const ScreeningReducer = (state: Screening[], action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case Type.ADD_SCREENING:
      return [...state, payload.screening];
    case Type.REMOVE_SCREENING:
      return state.filter((screening) => screening.id !== payload.screening.id);
    case Type.MODIFY_SCREENING:
      return state.map((screening) =>
        screening.id === payload.screening.id ? payload.screening : screening,
      );
    case Type.SET_SCREENING:
      return payload.screenings;
    default:
      return state;
  }
};
