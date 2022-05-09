import React, { useEffect, useState } from "react";
import "./banner.css";
import user from "../../assets/avatars/user1.jpg";
import {
  HiOutlineThumbDown,
  HiOutlineThumbUp,
  HiThumbDown,
  HiThumbUp,
} from "react-icons/hi";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASEURL } from "../../utils/config";

function Banner() {
  const param = useParams();
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [arrData, setArrData] = useState([]);
  const [userData, setUserData] = useState();
  const [newUserData, setNewUserData] = useState();
  const token = useSelector((state) => state.loginTokenData);
  const handleClick = (e) => {
    if (e === 1) {
      setLike(!like);
      setDislike(false);
      
    } else {
      setDislike(!dislike);
      setLike(false);
    }
  };

  const handleCourses = () => {
    let dataArr = [];
    axios
      .get("/courses")
      .then((res) => {
        res.data.data.map(
          (element) => (dataArr = [...dataArr, ...element.courses])
        );
        setArrData(dataArr);
        for (let index = 0; index < res.data.data.length; index++) {
          const element = res.data.data[index];
          console.log(element.courses, "LLPLLPL");
          for (let j = 0; j < element.courses.length; j++) {
            const element2 = element.courses[j];
            console.log("SECOND", element2._id);
            if (element2._id === param.id) {
              setUserData(element.user_id);
              getUsers(element.user_id);
            }
          }
        }
      })
      .then(() => {
        // getUsers();
      })
      .catch((err) => {
        console.log(err, "ERRor");
      });
  };

  const getUsers = (userID) => {
    console.log("CLAAED GET", userData, userID);
    axios
      .get(`/getspecificuser/${userID}`, {
        headers: {
          "Content-Type": "application/json",
          // authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data.data, "((((((((", userData, "KOO", userID);
        setNewUserData(res.data.data);
        // setColorValue(res.data.data);
        console.log("WE GOT THE USER");
        // res.data.data && setUpload(res.data.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.log("WE DIDN'T THE USER");
          // setColorValue([]);
        } else {
          // Toast({ msg: err.message });
        }
      });
  };

  console.log("YOUR ID", userData, newUserData);

  useEffect(() => {
    handleCourses();
  }, []);
  // useEffect(() => {
  //   getUsers();
  // }, []);

  return (
    <div>
      {arrData.map((x) => {
        return (
          param.id === x._id && (
            <div className="container-fluid marginTop">
              <div className="container">
                <div className="row">
                  <div className="col-8 col-sm-12 col-md-10">
                    <p className="course-title">{x.cname}</p>
                  </div>
                  <div className="col-6 col-sm-12">
                    <p className="course-description">{x.cdesp}</p>
                  </div>
                  <div className="col-8 col-sm-12">
                    <h3 className="platform">PLATFORM : {x.cplatform}</h3>
                  </div>

                  <div className="col-8 col-sm-12 d-flex justify-content-start">
                    <button
                      className="btn"
                      style={{ background: "#240121", color: "#fff" }}
                    >
                      <a
                        href={`https://${x.clink}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Go to Course
                      </a>
                    </button>
                  </div>

                  {/* <div className="col-8 col-sm-12 d-flex justify-content-start">
                    <button
                      className="likedislikebtn"
                      onClick={() => handleClick(1)}
                    >
                      {like ? (
                        <HiThumbUp className="icon-size" />
                      ) : (
                        <HiOutlineThumbUp className="icon-size" />
                      )}
                      {x.clikes}
                    </button>
                    <button
                      className="likedislikebtn"
                      onClick={() => handleClick(2)}
                    >
                      {dislike ? (
                        <HiThumbDown className="icon-size" />
                      ) : (
                        <HiOutlineThumbDown className="icon-size" />
                      )}
                      {x.cdislikes}
                    </button>
                  </div> */}

                  <div className="col-8 col-sm-12 avatar-main">
                    <div className="avatar-div">
                      <img
                        className="avatar-img"
                        src={`${BASEURL}/avatars/${
                          newUserData && newUserData.avatar
                        }.jpg`}
                        alt="user"
                      />
                    </div>

                    <div className="avatar-desp">
                      <div>
                        <p>{newUserData ? newUserData.name : "USER"}</p>
                      </div>
                      <div>Certicourse user</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
}

export default Banner;
