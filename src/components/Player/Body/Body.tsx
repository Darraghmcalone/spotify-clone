import React from "react";
import { SpotifyApiProps } from "../types";
import Header from "./Header/Header";
import "./Body.css";
import { useStateValue } from "../../../store/StateProvider";
import Row from "./Row/Row";

type Props = {
  images: { url: string | undefined }[];
  name: React.ReactNode;
};

function Body({ spotify }: SpotifyApiProps) {
  const [
    { recently_played_playlists, new_releases_playlists, my_top_artists },
  ] = useStateValue();
  return (
    <div className="body">
      <Header />
      <div className="body_rows">
        <Row rowTitle="Recently Played" rowData={recently_played_playlists} />
        <Row rowTitle="New releases" rowData={new_releases_playlists} />
        <Row rowTitle="My Top Artists" rowData={my_top_artists} />
      </div>
    </div>
  );
}

export default Body;
