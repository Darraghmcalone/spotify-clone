import React, { useState, useEffect } from "react";
import Login from "./components/Login/Login";
import "./App.css";
import { getTokenFromResponse } from "./services/spotify";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const hash = getTokenFromResponse();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {
      setToken(_token);
      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        console.log("😎", user);
      });
    }

    console.log("I HAVE A TOKEN 😀 👉", _token);
  }, []);
  return (
    <div className="App">
      {token ? <h1>User is Logged in 🚀</h1> : <Login />}
    </div>
  );
}

export default App;
