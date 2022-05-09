import { LOGIN_TOKEN } from "../actions/actionTypes";

const initialState = "";

const loginTokenData = (state = initialState, action) => {
    console.log(action.payload,"HUHUHUH");
  switch (action.type) {
    case LOGIN_TOKEN:
      return action.payload;
    default:
      return state;
  }
};

export default loginTokenData;
