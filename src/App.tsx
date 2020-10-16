import React, { useState, useEffect } from "react";
import Login from "./components/Login/Login";
import "./App.css";
import { getTokenFromResponse } from "./services/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./components/Player/Player";
import { useStateValue } from "./store/StateProvider";

const spotify = new SpotifyWebApi();

function App() {
  const [token, setToken] = useState(null);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {
      setToken(_token);
      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });
    }
    console.log("I HAVE A TOKEN 😀 👉", _token);
  }, [dispatch]);
  console.log("😎", user);
  return <div className="App">{token ? <Player /> : <Login />}</div>;
}

export default App;
