import React, { createContext, useContext, useReducer } from "react";

import { State, Action } from "./types";

export const StateContext = createContext<any>(null);

export const StateProvider = ({
  reducer,
  initialState,
  children,
}: {
  reducer: (state: State, action: Action) => State;
  initialState: State;
  children: React.ReactElement;
}): React.ReactElement => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
