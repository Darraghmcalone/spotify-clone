import React from "react";
import { SpotifyApiProps } from "../types";
import Header from "./Header/Header";
import "./Body.css";
import { useStateValue } from "../../../store/StateProvider";

type Props = {
  images: { url: string | undefined }[];
  name: React.ReactNode;
};

function Body({ spotify }: SpotifyApiProps) {
  const [{ recently_played_playlists }] = useStateValue();
  const recentlyPlayedAlbums = recently_played_playlists?.items
    .map((item: any) => item?.track?.album)
    .splice(0, 4);
  return (
    <div className="body">
      <Header spotify={spotify} />
      <h2>Recently played</h2>
      <div className="body__row">
        {recentlyPlayedAlbums?.map((item: Props) => (
          <div className="body__block">
            <img alt="" src={item.images[0].url} />
            <h4>{item.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Body;
