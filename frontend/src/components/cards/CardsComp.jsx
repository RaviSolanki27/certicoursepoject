import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import "./card.css";
import axios from "axios";

function CardsComp() {
  const [arrData, setArrData] = useState([]);

  const handleCourses = () => {
    let dataArr = [];
    axios
      .get("/courses")
      .then((res) => {
        res.data.data.map(
          (element) => (dataArr = [...dataArr, ...element.courses])
        );
        setArrData(dataArr);
      })
      .catch((err) => {
        console.log(err, "ERRor");
      });
  };
  useEffect(() => {
    handleCourses();
  }, []);

  console.log(arrData);

  return (
    <div className="most-outer-div">
      {/* <h3 className="categories">➤ Trending</h3> */}
      <div
      className="card-outer"
        // style={{
        //   columnCount: 5,
        //   margin: "0 auto",
        //   // display: "flex",
        //   // justifyContent: "space-around",
        //   // flexWrap: "wrap",
        // }}
      >
        {arrData.map((x, key) => {
          return (
            <Cards
              key={key}
              name={x.cname}
              desp={x.cdesp}
              likes={x.clikes}
              onChildclick={x._id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CardsComp;
