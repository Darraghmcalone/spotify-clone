import { SpotifyToken } from "../services/spotify";

export interface User extends SpotifyApi.CurrentUsersProfileResponse {}

export interface PlaylistsType
  extends SpotifyApi.ListOfUsersPlaylistsResponse {}

type Artist = {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};
type Images = {
  height: number;
  weight: number;
  url: string;
};

export type Track = {
  album: {
    images: Images[];
    name: string;
  };
  artists: Artist[];
  external_urls: {
    spotify: string;
  };
  name: string;
  preview_url: string;
  id: string;
  href: string;
  type: string;
  uri: string;
};

export type State = {
  user: User | null;
  user_playlists: PlaylistsType | null;
  recently_played_playlists: PlaylistsType | null;
  new_releases_playlists: PlaylistsType | null;
  playing: boolean;
  item: Track | null;
  token: SpotifyToken | null;
};

export type Action =
  | {
      type: "SET_USER";
      user: any;
    }
  | {
      type: "SET_TOKEN";
      token: SpotifyToken;
    }
  | {
      type: "SET_USER_PLAYLISTS";
      user_playlists: PlaylistsType;
    }
  | {
      type: "SET_RECENTLY_PLAYED_PLAYLISTS";
      recently_played_playlists: PlaylistsType;
    }
  | {
      type: "SET_NEW_RELEASES_PLAYLISTS";
      new_releases_playlists: PlaylistsType;
    };
