import React, { useEffect } from "react";
import Login from "./components/Login/Login";
import "./App.css";
import { getTokenFromResponse } from "./services/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./components/Player/Player";
import { useStateValue } from "./store/StateProvider";
import {
  getMe,
  getMyRecentlyPlayedAlbums,
  getMyTopArtists,
  getNewReleases,
  getUserPlaylists,
} from "./api/requests";

const spotify = new SpotifyWebApi();

function App() {
  const [{}, dispatch] = useStateValue();
  const hash = getTokenFromResponse();
  window.location.hash = "";
  const _token = hash.access_token;

  if (_token) {
    localStorage.setItem("TOKEN", _token);
    localStorage.setItem(
      "expirationDate",
      JSON.stringify(Date.now() + 3600 * 1000)
    );
  }
  const storageToken = localStorage?.getItem("TOKEN");
  if (_token) {
    spotify.setAccessToken(_token);
  } else if (storageToken) {
    spotify.setAccessToken(storageToken);
  }
  useEffect(() => {
    if (_token || storageToken) {
      getMe(dispatch);
    }
    getUserPlaylists(dispatch);
    getMyTopArtists(dispatch);
    getNewReleases(dispatch);
    getMyRecentlyPlayedAlbums(dispatch);
  }, [dispatch, _token, storageToken]);
  return (
    <div className="App">
      {localStorage?.getItem("TOKEN") ? (
        <Player spotify={spotify} />
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
