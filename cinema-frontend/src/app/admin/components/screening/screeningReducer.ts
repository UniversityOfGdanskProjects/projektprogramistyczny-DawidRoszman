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
      return [...state, payload];
    case Type.REMOVE_SCREENING:
      console.log(payload);
      return state.filter((screening) => screening.id !== payload.id);
    case Type.MODIFY_SCREENING:
      return state.map((screening) =>
        screening.id === payload.id ? payload : screening,
      );
    case Type.SET_SCREENING:
      return payload;
    default:
      return state;
  }
};
