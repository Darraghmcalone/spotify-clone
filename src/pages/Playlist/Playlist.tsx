import React, { FunctionComponent, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { getAlbum, getAlbumTracks } from "../../api/requests";
import { useStateValue } from "../../store/StateProvider";

type Props = { component: FunctionComponent } & RouteComponentProps;

const Playlist: FunctionComponent<Props> = ({ location }: any) => {
  const [{ playlist, playlistTracks }, dispatch] = useStateValue();

  const { name } = location?.state?.item;

  useEffect(() => {
    const { id } = location?.state?.item;
    getAlbum(dispatch, id);
    getAlbumTracks(dispatch, id);
  }, [dispatch, location]);

  const release_date = new Date(playlist?.release_date).getFullYear();
  return (
    <div>
      <h1 style={{ color: "black" }}>{name}</h1>
      <div
        style={{
          width: "30%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <h2>{playlist?.album_type} .</h2>
        <h2>{release_date} .</h2>
        <h2>
          {playlist?.total_tracks}{" "}
          {playlist?.album_type === "single" ? `song` : `songs`}
        </h2>
      </div>
      {playlistTracks?.items.map((track: any, index: number) => (
        <p key={index}>{track.name}</p>
      ))}
    </div>
  );
};

export default Playlist;
