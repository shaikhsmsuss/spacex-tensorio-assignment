import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";

function Header() {
  return (
    <AppBar position="fixed" className="Header">
      <Toolbar>
        <Link to="/spacex" style={{ textDecoration: "none" }}>
          <div className="header-wrapper">SPACEX</div>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
