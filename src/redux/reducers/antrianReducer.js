import { ANTRIAN_GET_DATA } from "../actionTypes";

const initialState = {
  data: [],
};

export const antrianReducer = (state = initialState, action) => {
  switch (action.type) {
    case ANTRIAN_GET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
