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
    default:
      return state;
  }
};

export default reducer;
