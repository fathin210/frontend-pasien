import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { antrianReducer } from "./reducers/antrianReducer";
import { authReducer } from "./reducers/authReducer";
import { bookingReducer } from "./reducers/bookingReducer";
import { updateReducer } from "./reducers/updateReducer";

let rootReducers = combineReducers({
  antrian: antrianReducer,
  auth: authReducer,
  booking: bookingReducer,
  update: updateReducer,
});

export const store = createStore(rootReducers, applyMiddleware(thunk));
