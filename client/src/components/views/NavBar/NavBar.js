import React from "react";
import "./Sections/Navbar.css";

function NavBar() {
  return (
    <nav
      className="menu"
      style={{ position: "fixed", zIndex: 20, width: "100%" }}
    >
      <div className="menu__logo">
        <a href="/">Recipe</a>
      </div>
    </nav>
  );
}

export default NavBar;
