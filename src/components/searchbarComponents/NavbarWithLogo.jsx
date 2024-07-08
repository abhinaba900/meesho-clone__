import React from "react";
import "../../css/NavbarWithLogo.css";
import DetelsCompNavWithLogo from "./navbarWithLogoComponent/DetelsCompNavWithLogo";
import SearchBox from "./navbarWithLogoComponent/SearchBox";

function NavbarWithLogo() {
  return (
    <div className="container mt-3">
      <div className="d-flex align-items-center gap-3">
        <img
          className="comon-logo"
          src="https://www.meesho.com/assets/svgicons/meeshoLogo.svg"
          alt="Main Logo"
        />
        <SearchBox />

        <DetelsCompNavWithLogo />
      </div>
    </div>
  );
}

export default NavbarWithLogo;
