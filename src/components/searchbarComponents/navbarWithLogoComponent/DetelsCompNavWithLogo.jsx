import React from "react";
import { FaMobileAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FiShoppingCart } from "react-icons/fi";
function DetelsCompNavWithLogo() {
  return (
    <div className="width-75 d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-3 comon-font">
        <FaMobileAlt className="icon" />
        <p>Download App</p>
      </div>
      <div className="comon-font">
        <p>Become a Supplier</p>
      </div>
      <div className="comon-font">
        <p>Newsroom</p>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center gap-1 comon-font">
        <CgProfile className="icon" />
        <p>Profile</p>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center gap-1 comon-font">
        <FiShoppingCart className="icon" />
        <p>Cart</p>
      </div>
    </div>
  );
}

export default DetelsCompNavWithLogo;
