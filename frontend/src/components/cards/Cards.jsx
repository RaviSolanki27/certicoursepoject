import React from "react";
import { Link, useNavigate } from "react-router-dom";
import red from "../../assets/red.jpg";
import "./card.css";

function Cards(props) {
  const navigate = useNavigate();

  return (
    <div className="card-div">
      <div
        className="card"
        style={{
          width: "18rem",
          backgroundColor: "#240122",
          color: "#fff",
          // marginTop: "3rem",
        }}
      >
        {/* <img src={red} className="card-img-top" alt="..." /> */}
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.desp}</p>
          <button
            onClick={() => {
              navigate(`/course/${props.onChildclick}`);
            }}
            className="btn"
            style={{ backgroundColor: "#644762", color: "#fff" }}
          >
            PURCHASE
          </button>
          {/* <p style={{ opacity: "0.6" }}>{props.likes} Likes</p> */}
        </div>
      </div>
    </div>
  );
}

export default Cards;
