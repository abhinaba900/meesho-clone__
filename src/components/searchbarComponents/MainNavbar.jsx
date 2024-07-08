import React from "react";
import NavbarWithLogo from "./NavbarWithLogo";
import NavbarWithCatagorys from "./NavbarWithCatagorys";

function MainNavbar() {
  return (
    <div className="mt-5 sticky-position">
      <NavbarWithLogo />
      <hr />
      <NavbarWithCatagorys />
      <hr />
    </div>
  );
}

export default MainNavbar;
