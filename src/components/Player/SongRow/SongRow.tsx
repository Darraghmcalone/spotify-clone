import React from "react";
import "./SongRow.css";

type Artist = {
  name: string;
};

type Track = {
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

function SongRow({ track }: Track) {
  const minutes = `${0}${new Date(track?.duration_ms).getMinutes()}`.slice(-1);
  const seconds = `${0}${new Date(track?.duration_ms).getSeconds()}`.slice(-2);
  const duration = `${minutes}:${seconds}`;
  return (
    <div className="songRow">
      <span>{track?.track_number}</span>
      <div className="songRow__info">
        <h1>{track?.name}</h1>
        <p>
          {track?.artists?.map((artist: any) => artist?.name).join(", ")}
          {track?.album?.name}
        </p>
      </div>
      <span>{duration}</span>
    </div>
  );
}

export default SongRow;
