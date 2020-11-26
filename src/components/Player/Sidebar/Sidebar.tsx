import React from "react";
import SidebarOption from "./SidebarOption/SidebarOption";
import "./Sidebar.css";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { useStateValue } from "../../../store/StateProvider";
import { Link } from "react-router-dom";
import { HOME } from "../../../constants/RouteConstants";

function Sidebar() {
  const [{ user_playlists }] = useStateValue();
  return (
    <div className="sidebar">
      <Link
        to={{
          pathname: `${HOME}`,
        }}
      >
        <img
          className="sidebar__logo"
          src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
          alt=""
        />
      </Link>

      <Link
        to={{
          pathname: `${HOME}`,
        }}
      >
        {" "}
        <SidebarOption title="Home" Icon={HomeIcon} />
      </Link>
      <SidebarOption title="Search" Icon={SearchIcon} />
      <SidebarOption title="Your Library" Icon={LibraryMusicIcon} />
      <br />
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
      {user_playlists?.items.map(
        (playlist: { name: string }, index: number) => (
          <SidebarOption key={index} title={playlist.name} />
        )
      )}
    </div>
  );
}

export default Sidebar;
