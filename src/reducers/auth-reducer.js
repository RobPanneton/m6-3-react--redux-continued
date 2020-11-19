const initialState = {
  token: null,
  status: "idle",
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_ACCESS_TOKEN":
      return {
        ...state,
        status: "loading",
      };
    case "RECEIVE_ACCESS_TOKEN":
      return {
        ...state,
        token: action.payload.token,
        status: "idle",
      };
    case "RECEIVE_ACCESS_TOKEN_ERROR":
      return {
        ...state,
        status: "error",
      };
    default: {
      return state;
    }
  }
};

export default authReducer;
