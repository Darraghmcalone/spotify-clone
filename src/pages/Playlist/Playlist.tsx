import React, { FunctionComponent, useEffect } from "react";
import "./Playlist.css";
import { RouteComponentProps } from "react-router";
import { getAlbum, getAlbumTracks } from "../../api/requests";
import Header from "../../components/Player/Header/Header";
import { useStateValue } from "../../store/StateProvider";
import SongRow from "../../components/Player/SongRow/SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

type Playlist = { component: FunctionComponent } & RouteComponentProps;

type Duration = {
  duration_ms: number | null;
};

const Playlist: FunctionComponent<Playlist> = ({ location }: any) => {
  const [{ playlist, playlistTracks }, dispatch] = useStateValue();

  const totalDuration = playlist?.tracks?.items
    ?.map((val: Duration) => val?.duration_ms)
    .reduce((sum: number, current: number) => sum + current, 0);

  const secondsToHms = (duration: number) => {
    duration = Number(duration);
    let s = Math.floor((duration / 1000) % 60);
    let m = Math.floor((duration / (1000 * 60)) % 60);
    let h = Math.floor((duration / (1000 * 60 * 60)) % 24);

    const hDisplay = h > 0 ? `${h} hr` : "";
    const mDisplay = m > 0 ? `${m} min` : "";
    const sDisplay = s > 0 ? `${s} sec` : "";
    return hDisplay + mDisplay + sDisplay;
  };

  const { name } = location?.state?.item;

  useEffect(() => {
    const { id } = location?.state?.item;
    getAlbum(dispatch, id);
    getAlbumTracks(dispatch, id);
  }, [dispatch, location]);

  const release_date = new Date(playlist?.release_date).getFullYear();

  return (
    <div className="playlist">
      <Header />

      <div className="playlist__info">
        <img
          className="playlist__image"
          src={playlist?.images[0]?.url}
          alt=""
        />
        <div className="playlist__infoText">
          <h2>{playlist?.album_type}</h2>
          <h1>{name}</h1>

          <p>
            <a href="/#">{playlist?.artists[0]?.name}</a>
            {`• ${release_date} • ${playlist?.total_tracks} 
              ${
                playlist?.album_type === "single" ? " song," : " songs,"
              } ${secondsToHms(totalDuration)}`}{" "}
          </p>
        </div>
      </div>

      <div className="playlist__songs">
        <div className="playlist__icons">
          <PlayCircleFilledIcon className="playlist__shuffle" />
          <FavoriteIcon fontSize="large" />
          <MoreHorizIcon />
        </div>

        <table>
          <tbody>
            <tr>
              <th>#</th>
              <th>TITLE</th>
              <th>
                <AccessTimeIcon />
              </th>
            </tr>
          </tbody>
        </table>

        {playlistTracks?.items.map((track: any, index: number) => (
          <SongRow key={index} track={track} />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
