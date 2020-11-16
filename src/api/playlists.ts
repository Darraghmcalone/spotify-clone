import SpotifyWebApi from "spotify-web-api-js";
const spotify = new SpotifyWebApi();

async function getMe(dispatch: any) {
  const user = await spotify.getMe();
  dispatch({
    type: "SET_USER",
    user: user,
  });
}

async function getUserPlaylists(dispatch: any) {
  const user_playlists = await spotify.getUserPlaylists();
  dispatch({
    type: "SET_USER_PLAYLISTS",
    user_playlists,
  });
}

async function getMyTopArtists(dispatch: any) {
  const { items } = await spotify.getMyTopArtists();
  dispatch({
    type: "SET_MY_TOP_ARTISTS",
    my_top_artists: items,
  });
}

async function getMyRecentlyPlayedAlbums(dispatch: any) {
  const recentlyPlayedAlbumsResponse = await spotify.getMyRecentlyPlayedTracks();

  const recentlyPlayedAlbums = recentlyPlayedAlbumsResponse.items.map(
    (track: any) => {
      const { id, name, images } = track.track.album;
      return {
        id: id,
        name: name,
        images: images,
      };
    }
  );

  const uniqueRecentlyPlayedAlbums = recentlyPlayedAlbums.reduce(
    (uniqueArray: any, albumObj: any) => {
      if (!uniqueArray.some((obj: any) => obj.id === albumObj.id)) {
        uniqueArray.push(albumObj);
      }
      return uniqueArray;
    },
    []
  );

  dispatch({
    type: "SET_RECENTLY_PLAYED_PLAYLISTS",
    recently_played_playlists: uniqueRecentlyPlayedAlbums,
  });
}
async function getNewReleases(dispatch: any) {
  const { albums } = await spotify.getNewReleases();
  dispatch({
    type: "SET_NEW_RELEASES_PLAYLISTS",
    new_releases_playlists: albums?.items,
  });
}

export {
  getMe,
  getUserPlaylists,
  getMyTopArtists,
  getMyRecentlyPlayedAlbums,
  getNewReleases,
};
