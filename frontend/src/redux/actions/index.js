import { LOGIN_STATUS, LOGIN_TOKEN } from "./actionTypes";

export const loginToken = (data) => {
    return {
      type: LOGIN_TOKEN,
      payload: data,
    };
  };

  export const loginStatus =(data)=>{
    return {
      type: LOGIN_STATUS,
      payload: data
    }
  }