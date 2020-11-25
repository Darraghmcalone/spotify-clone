import React from "react";
import { Route, Switch } from "react-router-dom";
import * as RouteConstant from "../../../constants/RouteConstants";
import Home from "../../../pages/Home/Home";
import Genre from "../../../pages/Genre/Genre";
import Playlist from "../../../pages/Playlist/Playlist";
import Artist from "../../../pages/Artist/Artist";

function Main() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path={RouteConstant.HOME} component={Home} />
        <Route
          path="/genre/:genrename"
          render={(props: any) => <Genre {...props} />}
        />
        <Route
          path={`${RouteConstant.PLAYLIST}/:id`}
          render={(props: any) => <Playlist {...props} />}
        />
        <Route
          path={`${RouteConstant.ALBUM}/:id`}
          render={(props: any) => <Playlist {...props} />}
        />
        <Route
          path={`${RouteConstant.ARTIST}/:id`}
          render={(props: any) => <Artist {...props} />}
        />
      </Switch>
    </React.Fragment>
  );
}

export default Main;
