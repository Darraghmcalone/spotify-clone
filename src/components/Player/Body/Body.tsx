import React from "react";
import { SpotifyApiProps } from "../types";
import Header from "./Header/Header";
import "./Body.css";

function Body({ spotify }: SpotifyApiProps) {
  return (
    <div className="body">
      <Header spotify={spotify} />
      <div className="body__info">
        <img src="" alt="" />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
        </div>
      </div>
    </div>
  );
}

export default Body;
