import { State, Action } from "./types";

export const initialState: State = {
  user: null,
  playlists: null,
  playing: false,
  item: null,
  token: {
    access_token: 'BQA0SydWb_wKVSNU1l6DaGAe6CVCd400FD-mWMHT7xSltai5aCzFEeqaAvTb0yFs03STFOmkdAJNFDAG-3ZOVGWc2sXQqKsBcxjnShh_9sLyysBW9ElUWCSRjeG9WMYjHcHGpLQhvFJTTrjgLkHk4WkWgWEuxpdIouAPxCcQC4ydP-tE'
  },
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
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    default:
      return state;
  }
};

export default reducer;
