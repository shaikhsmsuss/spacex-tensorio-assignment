import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

function Header() {
  return (
    <AppBar position="fixed" className="Header">
      <Toolbar>
        <div className="header-wrapper">SPACEX</div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
