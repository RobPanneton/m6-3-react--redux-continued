const initialState = {
  currentArtist: null,
  status: "idle",
  error: null,
};

const artistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_ARTIST_INFO":
      return {
        ...state,
        status: "loading",
      };
    case "RECEIVE_ARTIST_INFO":
      return {
        ...state,
        status: "success",
        currentArtist: {
          profile: action.payload.data,
        },
      };
      return;
    case "RECEIVE_ARTIST_ERROR":
      return {
        ...state,
        status: "error",
      };
    default: {
      return state;
    }
  }
};

export default artistReducer;
