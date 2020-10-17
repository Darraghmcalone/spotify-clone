import { State, Action } from "./types";

export const initialState: State = {
  user: null,
  playlists: null,
  playing: false,
  item: null,
  token: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_USER":
      console.log("action:", action);
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};

export default reducer;
