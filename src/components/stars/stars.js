import React, { useContext } from "react";
import { FaStar } from "react-icons/fa";
import "./stars.css";
import { Context } from "../../context";

function Stars({ starRateValue }) {
  const { setStars } = useContext(Context);

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={"star" + index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => {
                setStars(ratingValue);
              }}
            />
            <FaStar
              className="star"
              color={ratingValue <= starRateValue ? "orange" : "grey"}
              size={20}
            />
          </label>
        );
      })}
    </div>
  );
}

export default Stars;
