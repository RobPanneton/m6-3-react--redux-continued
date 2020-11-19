import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";

import ArtistRoute from "./ArtistRoute";
import GlobalStyles from "./GlobalStyles";
import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../actions";

const DEFAULT_ARTIST_ID = "7hvD2Cs8fbF3HvhQCmV3xq";

const App = () => {
  const dispatch = useDispatch();

  const getToken = async () => {
    dispatch(requestAccessToken());
    try {
      const response = await fetch(`/spotify_access_token`);
      const json = await response.json();
      await dispatch(receiveAccessToken(json.access_token));
    } catch (err) {
      await dispatch(receiveAccessTokenError());
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
        </Route>
        <Route exact path="/artists/:id">
          <ArtistRoute />
        </Route>
      </Router>
    </div>
  );
};

export default App;
