import { legacy_createStore as createStore } from "redux";

const initialState = {
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case "LOGIN":
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
};

export default createStore(reducer);
