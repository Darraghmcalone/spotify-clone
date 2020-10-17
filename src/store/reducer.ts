import { State } from "./types";

export const initialState: State = {
  user: null,
  playlists: null,
  playing: false,
  item: null,
  token: "",
};

const reducer = (state: State, action: any) => {
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
    default:
      return state;
  }
};

export default reducer;
