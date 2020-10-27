import { State, Action } from "./types";

export const initialState: State = {
  user: null,
  user_playlists: null,
  recently_played_playlists: null,
  new_releases_playlists: null,
  playing: false,
  item: null,
  token: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_USER_PLAYLISTS":
      return {
        ...state,
        user_playlists: action.user_playlists,
      };
    case "SET_RECENTLY_PLAYED_PLAYLISTS":
      return {
        ...state,
        recently_played_playlists: action.recently_played_playlists,
      };
    case "SET_NEW_RELEASES_PLAYLISTS":
      return {
        ...state,
        new_releases_playlists: action.new_releases_playlists,
      };
    default:
      return state;
  }
};

export default reducer;
