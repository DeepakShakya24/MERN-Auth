import * as actions from "../actions/types";

const initialState = {
  authData: null,
  autherror: null,
  isAuthenticated: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        authData: action.data,
        autherror: null,
        isAuthenticated: true,
      };
    case actions.LOGIN_FAIL:
      return {
        ...state,
        autherror: action.error,
      };
    case actions.LOGOUT:
      localStorage.clear();
      return {
        ...state,
        authData: null,
        autherror: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
