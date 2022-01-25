import React from "react";
import { Navbar, NavbarBrand } from "shards-react";

import { Dispatcher, Constants } from "../../../flux";

const SidebarMainNavbar = () => {
  
const handleToggleSidebar = () => {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR
    });
  }

return (
    <div className="main-navbar">
      <Navbar
        style={{backgroundColor: "#304f7e"}}
        className="align-items-stretch flex-md-nowrap p-0"
        type="light"
      >
        <NavbarBrand
          className="ml-4"
          href="/blog-posts"
          style={{ lineHeight: "25px" }}
        >
          <div className="d-table m-auto">
            <div className="d-inline-block align-top mr-1">
              <i class="material-icons" style={{color: "gray", fontSize: "22px"}}>dehaze</i>
            </div>
            <span style={{color: "#f2cf97", fontSize: "22px"}} className="d-none d-md-inline ml-1">
              Blogsplorer
            </span>
          </div>
        </NavbarBrand>
        {/* eslint-disable-next-line */}
        <a
          className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
          onClick={handleToggleSidebar}
        >
          <i className="material-icons">&#xE5C4;</i>
        </a>
      </Navbar>
    </div>
  );
}

export default SidebarMainNavbar;
