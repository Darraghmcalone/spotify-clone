import React from "react";
import { SpotifyApiProps } from "../../components/Player/types";
import Header from "../../components/Player/Header/Header";
import "./Home.css";
import { useStateValue } from "../../store/StateProvider";
import Row from "../../components/Player/Row/Row";
import * as RouteConstant from "../../constants/RouteConstants";

function Home({ spotify }: SpotifyApiProps) {
  const [
    { recently_played_playlists, new_releases_playlists, my_top_artists },
  ] = useStateValue();
  return (
    <div className="body">
      <Header />
      <div className="body_rows">
        <Row
          rowTitle="Recently played"
          rowData={recently_played_playlists}
          link={RouteConstant.RECENTLY}
          itemCount={5}
        />
        <Row
          rowTitle="New releases"
          rowData={new_releases_playlists}
          link={RouteConstant.NEW}
          itemCount={5}
        />
        <Row
          rowTitle="My Top Artists"
          rowData={my_top_artists}
          link={RouteConstant.TOP}
          itemCount={5}
        />
      </div>
    </div>
  );
}

export default Home;
