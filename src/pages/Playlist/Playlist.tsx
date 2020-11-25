import React, { FunctionComponent, useEffect } from "react";
import "./Playlist.css";
import { RouteComponentProps } from "react-router";
import { usePalette } from "react-palette";
import { getAlbum, getAlbumTracks } from "../../api/requests";
import Header from "../../components/Player/Header/Header";
import { useStateValue } from "../../store/StateProvider";
import SongRow from "../../components/Player/SongRow/SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { Link } from "react-router-dom";

type Playlist = { component: FunctionComponent } & RouteComponentProps;

type Duration = {
  duration_ms: number | null;
};

const Playlist: FunctionComponent<Playlist> = ({ location }: any) => {
  const [{ playlist, playlistTracks }, dispatch] = useStateValue();
  const { data } = usePalette(playlist?.images[0]?.url);
  console.log("playlist:", playlist);
  console.log("playlistTracks:", playlistTracks);
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
    const { id, type } = location?.state?.item;
    console.log("type:", type);
    getAlbum(dispatch, id, type);
    getAlbumTracks(dispatch, id, type);
  }, [dispatch, location]);

  const release_date = new Date(playlist?.release_date).getFullYear();

  const svg = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21.6596l-3.38079 1.8543-1.84158-3.3877-3.84662-.2679.28231-3.8456-3.09118-2.3049 2.31658-3.0825-1.3543-3.61028 3.61534-1.34071.81255-3.76935 3.76627.82672L12 0l2.7214 2.73168 3.7663-.82672.8125 3.76935 3.6154 1.34071-1.3543 3.61028 2.3166 3.0825-3.0912 2.3049.2823 3.8456-3.8466.2679-1.8416 3.3877L12 21.6596z"
        fill="#2E77D0"
      ></path>
      <path
        d="M16.8637 7.41226l-6.6435 7.77824-2.80421-3.2842-.4935.5775 3.29771 3.8617 7.2135-8.44649-.57-.48675z"
        fill="#fff"
      ></path>
    </svg>
  );

  function numberWithCommas(x: string) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const artistID = playlist?.artists[0]?.id;
  return (
    <div style={{ backgroundColor: data.lightVibrant }} className="playlist">
      <Header />

      <div className="playlist__info">
        <img
          className="playlist__image"
          src={playlist?.images[0]?.url}
          alt=""
        />
        <div className="playlist__infoText">
          {playlist?.type === "artist" ? (
            <div style={{ display: "flex" }}>
              {svg}
              <h2 className="playlist__verifyText">Verified Artist</h2>
            </div>
          ) : (
            <h2>{playlist?.album_type}</h2>
          )}
          <h1>{name}</h1>
          {playlist?.type === "artist" ? (
            <p>
              {numberWithCommas(playlist?.followers?.total)} Monthly Listeners
            </p>
          ) : (
            <p>
              <Link
                to={{
                  pathname: `/artist/${artistID}`,
                  state: {
                    artistID,
                  },
                }}
              >
                {playlist?.artists[0]?.name}
              </Link>
              {`• ${release_date} • ${playlist?.total_tracks} 
              ${
                playlist?.album_type === "single" ? " song," : " songs,"
              } ${secondsToHms(totalDuration)}`}{" "}
            </p>
          )}
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
          <SongRow index={index} track={track} />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
