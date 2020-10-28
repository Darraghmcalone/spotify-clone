import React, { useEffect } from "react";
import Login from "./components/Login/Login";
import "./App.css";
import { getTokenFromResponse } from "./services/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./components/Player/Player";
import { useStateValue } from "./store/StateProvider";

const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useStateValue();

  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });
      spotify.getUserPlaylists().then((user_playlists) => {
        dispatch({
          type: "SET_USER_PLAYLISTS",
          user_playlists,
        });
      });
      spotify.getMyRecentlyPlayedTracks().then(({ items }) => {
        dispatch({
          type: "SET_RECENTLY_PLAYED_PLAYLISTS",
          recently_played_playlists: items,
        });
      });
      spotify.getNewReleases().then(({ albums }) => {
        dispatch({
          type: "SET_NEW_RELEASES_PLAYLISTS",
          new_releases_playlists: albums?.items,
        });
      });
      spotify.getMyTopArtists().then(({ items }) => {
        dispatch({
          type: "SET_MY_TOP_ARTISTS",
          my_top_artists: items,
        });
      });
    }
  }, [dispatch]);
  return (
    <div className="App">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
