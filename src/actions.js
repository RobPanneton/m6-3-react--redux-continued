export const requestAccessToken = () => ({
  type: "REQUEST_ACCESS_TOKEN",
});

export const receiveAccessToken = (token) => ({
  type: "RECEIVE_ACCESS_TOKEN",
  payload: { token },
});

export const receiveAccessTokenError = () => ({
  type: "RECEIVE_ACCESS_TOKEN_ERROR",
});

////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////

export const requestArtistInfo = () => ({
  type: "REQUEST_ARTIST_INFO",
});

export const receiveArtistInfo = (data) => ({
  type: "RECEIVE_ARTIST_INFO",
  payload: { data },
});

export const receiveArtistError = () => ({
  type: "RECEIVE_ARTIST_ERROR",
});
