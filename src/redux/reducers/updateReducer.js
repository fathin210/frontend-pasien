import { STOP_PAGE, UPDATE_PAGE } from "../actionTypes";

const initialState = {
  update: false,
};

export const updateReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return { ...state, update: true };
    case STOP_PAGE:
      return { ...state, update: false };
    default:
      return state;
  }
};
