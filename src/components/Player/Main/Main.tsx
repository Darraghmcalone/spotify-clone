import React from "react";
import { Route, Switch } from "react-router-dom";
import * as RouteConstant from "../../../constants/RouteConstants";
import Home from "../../../pages/Home/Home";
import Genre from "../../../pages/Genre/Genre";

function Main() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path={RouteConstant.HOME} component={Home} />
        <Route
          path="/genre/:genrename"
          render={(props: any) => <Genre {...props} />}
        />
      </Switch>
    </React.Fragment>
  );
}

export default Main;
