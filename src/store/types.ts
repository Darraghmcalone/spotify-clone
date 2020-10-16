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
  playlists: PlaylistsType | null;
  playing: boolean;
  item: Track | null;
  token: string;
};
