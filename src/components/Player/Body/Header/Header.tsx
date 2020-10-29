import React, { useState, useRef, ReactElement } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "../../../../store/StateProvider";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxHeight: 48 * 4.5,
    width: 200,
  },
  menuList: {
    color: "#ffffffb3",
  },
}));

function Header(): ReactElement {
  const classes = useStyles();
  const [{ user }] = useStateValue();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement | null>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: {
    key: string;
    preventDefault: () => void;
  }) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  const resetToken = () => {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("expirationDate");
    window.location.href = window.location.origin + window.location.pathname;
  };

  const expirationDate = Number(localStorage.getItem("expirationDate"));

  if (expirationDate && expirationDate < Date.now()) {
    resetToken();
  } else if (expirationDate) {
    const timeLeft = expirationDate - Date.now();
    setTimeout(resetToken, timeLeft);
  }
  return (
    <div className="header">
      <div className="header__left">
        <SearchIcon />

        <input type="text" placeholder="Search for Songs, Artists or Albums." />
      </div>
      <div className="header__right">
        <IconButton
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={() => handleToggle()}
        >
          <Avatar alt={user?.display_name} src={user?.images[0]?.url} />
          <h4>{user?.display_name}</h4>
        </IconButton>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                    className={classes.menuList}
                  >
                    <MenuItem>Account</MenuItem>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem onClick={() => resetToken()}>Log out</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

export default Header;
