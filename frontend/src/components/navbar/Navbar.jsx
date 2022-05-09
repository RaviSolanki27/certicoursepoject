import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginToken } from "../../redux/actions";
import { BASEURL } from "../../utils/config";
import logoimg from "../../assets/logo.png";

function Navbar() {
  const [upload, setUpload] = useState();
  const navigate = useNavigate();
  const token = useSelector((state) => state.loginTokenData);
  const dispatch = useDispatch();
  const handleLogin = () => {
    axios
      .get("/getuser", {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      })
      .then((res) => {
        // setColorValue(res.data.data);
        res.data.data && setUpload(res.data.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          // setColorValue([]);
        } else {
          // Toast({ msg: err.message });
        }
      });
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        backgroundColor: "#240121",
        position: "sticky",
        top: 0,
        zIndex: "10",
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logoimg} alt="" style={{width:'20rem'}} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <Link className="nav-link" to="/">
                NavLink
              </Link>
            </li> */}
            {/* <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/">
                    Action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/">
                    Another action
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/">
                    Something else here
                  </Link>
                </li>
              </ul>
            </li> */}
            {/* <li className="nav-item">
              <Link className="nav-link" to="/">
                Disabled
              </Link>
            </li> */}
          </ul>
          <div style={{ display: "flex" }}>
            <span style={{ color: "#fff" }}>
              {upload ? "" : "Have an account ?"}
            </span>
            &nbsp;
            {upload ? (
              <div>
                <img
                  className="avatar-img"
                  style={{ borderRadius: "50%", width: "3rem" }}
                  src={`${BASEURL}/avatars/${upload.avatar}.jpg`}
                  alt="user"
                />
                <button
                  className="btn"
                  onClick={() => {
                    dispatch(loginToken(""));
                    navigate("/");
                  }}
                  style={{ backgroundColor: "#644762", color: "#fff" }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="btn"
                style={{ backgroundColor: "#644762", color: "#fff" }}
                onClick={() => navigate("/signup")}
              >
                Login
              </button>
            )}
            {upload && (
              <button
                className="btn"
                style={{ background: "none", color: "#fff" }}
                onClick={() => {
                  navigate("/upload");
                }}
              >
                Upload
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
