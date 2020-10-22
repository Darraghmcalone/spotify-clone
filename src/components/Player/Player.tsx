import React from "react";
import { SpotifyApiProps } from "./types";
import Body from "./Body/Body";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar/Sidebar";
import "./Player.css";

function Player({ spotify }: SpotifyApiProps) {
  console.log("spotify:", spotify);
  return (
    <div className="player">
      <div className="player__body">
        <Sidebar />
        <Body spotify={spotify} />
      </div>
      <Footer />
    </div>
  );
}

export default Player;
