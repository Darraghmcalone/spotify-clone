import React from "react";
import "./SongRow.css";

type Artist = {
  name: string;
};

type Track = {
  index: number;
  track: {
    track_number: number;
    duration_ms: number;
    name: string;
    artists: Artist[];
    album: {
      name: string;
    };
  };
};

function SongRow({ index, track }: Track) {
  const minutes = `${0}${new Date(track?.duration_ms).getMinutes()}`.slice(-1);
  const seconds = `${0}${new Date(track?.duration_ms).getSeconds()}`.slice(-2);
  const duration = `${minutes}:${seconds}`;
  return (
    <div className="songRow">
      <div>
        <span>{index + 1}</span>
      </div>
      <div className="songRow__info">
        <h1>{track?.name}</h1>
        <p>
          {track?.artists?.map((artist: any) => artist?.name).join(", ")}
          {track?.album?.name}
        </p>
      </div>
      <div>
        <span>{duration}</span>
      </div>
    </div>
  );
}

export default SongRow;
