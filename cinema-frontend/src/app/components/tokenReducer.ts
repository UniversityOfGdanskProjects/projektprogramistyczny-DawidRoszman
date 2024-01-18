export interface Action {
  payload: any;
  type: Type;
}

export enum Type {
  SET_TOKEN,
  REMOVE_TOKEN,
}

export interface Token {
  token: string | null;
}

export const TokenReducer = (state: Token, action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case Type.SET_TOKEN:
      return {
        ...state,
        token: payload,
      };
    case Type.REMOVE_TOKEN:
      return {
        ...state,
        token: "",
      };
  }
};

