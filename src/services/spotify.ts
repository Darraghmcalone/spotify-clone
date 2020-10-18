export type SpotifyToken = {
  access_token?: string;
  expires_in?: string;
  token_type?: string;
};
type STKey = keyof SpotifyToken;

export const authEndpoint = "https://accounts.spotify.com/authorize";

const clientId = "4993fe5a31104a3f97ce5f0854b8587e";
const redirectUri = "http://localhost:3000/";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const getTokenFromResponse = (): SpotifyToken => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial: SpotifyToken, item: string) => {
      var parts = item.split("=");
      initial[parts[0] as STKey] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
