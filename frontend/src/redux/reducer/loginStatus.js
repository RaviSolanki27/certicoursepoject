import { LOGIN_STATUS } from "../actions/actionTypes";

const initialState = false;

const loginStatusData = (state = initialState, action) => {
  console.log(action.payload, "LOGGED IN");
  switch (action.type) {
    case LOGIN_STATUS:
      return action.payload;
    default:
      return state;
  }
};

export default loginStatusData;
