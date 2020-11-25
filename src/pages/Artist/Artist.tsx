import React, { FunctionComponent, useEffect } from "react";
import "./Artist.css";
import { RouteComponentProps } from "react-router";
import { usePalette } from "react-palette";
import { getArtist, getArtistTracks } from "../../api/requests";
import Header from "../../components/Player/Header/Header";
import { useStateValue } from "../../store/StateProvider";
import SongRow from "../../components/Player/SongRow/SongRow";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

type Artist = { component: FunctionComponent } & RouteComponentProps;

const Artist: FunctionComponent<Artist> = ({ location }: any) => {
  const [{ artist, artistTracks }, dispatch] = useStateValue();
  const { data } = usePalette(artist?.images[0]?.url);
  console.log("artist:", artist);
  console.log("artistTracks:", artistTracks);

  useEffect(() => {
    const { artistID } = location?.state;
    const id = location?.state?.item?.id;
    getArtist(dispatch, artistID || id);
    getArtistTracks(dispatch, artistID || id);
  }, [dispatch, location]);

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
  const totalFollowers = artist?.followers?.total
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div style={{ backgroundColor: data.lightVibrant }} className="artist">
      <Header />
      <div className="artist__info">
        <img className="artist__image" src={artist?.images[0]?.url} alt="" />
        <div className="artist__infoText">
          <div style={{ display: "flex" }}>
            {svg}
            <h2 className="artist__verifyText">Verified Artist</h2>
          </div>
          <h1>{artist?.name}</h1>
          <h2>{totalFollowers} Monthly Listeners</h2>
        </div>
      </div>
      <div className="artist__songs">
        <div className="artist__icons">
          <PlayCircleFilledIcon className="artist__shuffle" />
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
        {artistTracks?.tracks?.map((track: any, index: number) => (
          <SongRow index={index} track={track} />
        ))}
      </div>
    </div>
  );
};

export default Artist;
