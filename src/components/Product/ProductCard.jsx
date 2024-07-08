import React from "react";
import "../../css/ProductCard.css";
import { FaStar } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import { lazy } from "react";
function ProductCard({ item, ids }) {
  return (
    <div className="card-main-cointainer" key={uuid()} id={ids} >
      <img className="card-image" src={item?.image} loading={lazy} alt="" />
      <h5 className="card-name">{item?.name}</h5>
      <p className="card-price">
        ₹ {item?.price} <span>Onwards</span>
      </p>
      <p className="card-delivery">Free Delivery</p>
      <p className="card-rating">
        {item?.star} <FaStar className="star" />
      </p>
    </div>
  );
}

export default ProductCard;
