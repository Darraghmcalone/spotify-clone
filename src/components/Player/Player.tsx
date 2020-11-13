import React from "react";
import { SpotifyApiProps } from "./types";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar/Sidebar";
import "./Player.css";
import Main from "./Main/Main";

function Player({ spotify }: SpotifyApiProps) {
  return (
    <div className="player">
      <div className="player__body">
        <Sidebar />
        <Main />
      </div>
      <Footer />
    </div>
  );
}

export default Player;
