import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { avatarData } from "../../utils/data/data";
import { BASEURL } from "../../utils/config";
import "./signup.css";
import { useDispatch, useSelector } from "react-redux";
import { loginToken } from "../../redux/actions";

function SignUp() {
  const [loginStatus, setLoginStatus] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const token = useSelector((state) => state.loginTokenData);

  console.log(email, password, "PRESSS");

  const dispatch = useDispatch();
  // const token = useSelector(state => state.loginTokenData);

  const handleLogin = () => {
    // e.preventDefault();
    console.log(email, password);

    axios
      .get("/loginuser", {
        params: { email: email, password: password },
      })
      .then((res) => {
        setToggle(false);
        setEmail("");
        setPassword("");
        console.log(res.data.data.token);
        dispatch(loginToken(res.data.data.token));
        toast.success("Logged Successfully", {
          position: "top-center",
          autoClose: 30000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err, "NJIOHOIGB");
        toast.error(
          `${
            err.response.status === 400
              ? "Invalid credentials!"
              : "Something went wrong!"
          }`,
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      });
  };
  console.log(toggle, "Toggle", loginStatus, "LoginStatus");

  const handleRegister = () => {
    axios({
      method: "post",
      url: "/",
      data: {
        name: name,
        email: email,
        password: password,
        avatar: avatar,
      },
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    })
      .then((res) => {
        console.log(res, "CREATED SUCCESSFULLY");
        toast.success("Registered Successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        console.log(err.response.status, "ERROR OCCURED");

        toast.error(
          `${
            err.response.status === 400
              ? "Already registered!"
              : "Something went wrong!"
          }`,
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      });
  };

  return (
    <div className="signup-comp">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {loginStatus ? (
        // <form className="signup-form" onSubmit={()=>handleLogin()}>
        <div className="inner-signup">
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary signup-btn"
            onClick={() => {
              handleLogin();
            }}
          >
            Login
          </button>

          <button className="btn" onClick={() => setLoginStatus(!loginStatus)}>
            Don't have an account?
          </button>
        </div>
      ) : (
        // </form>
        // <form className="signup-form">
        <div className="inner-signup">
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Name</label>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="name"
              id="exampleFormControlInput1"
              className="form-control"
              aria-describedby="nameHelp"
              placeholder="Enter Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>

          <div className="avatar-div">
            {console.log(avatar)}
            {avatarData.map((x) => {
              return (
                <button
                  key={x.name}
                  type="button"
                  className={avatar === x.name ? `selected` : `avatar-btn`}
                  onClick={() => {
                    setAvatar(x.name);
                  }}
                >
                  <img
                    className="avatar-img"
                    src={`${BASEURL}/avatars/${x.src}`}
                    // src={`${BASEURL}/avatars/${upload.avatar}.jpg`}

                    alt="user"
                  />
                </button>
              );
            })}
          </div>
          <button
            type="submit"
            className="btn btn-primary signup-btn m-2"
            onClick={() => {
              handleRegister();
              setLoginStatus(!loginStatus);
            }}
          >
            Register
          </button>
          <button className="btn" onClick={() => setLoginStatus(!loginStatus)}>
            Already have an account?
          </button>
        </div>
        // </form>
      )}
    </div>
  );
}

export default SignUp;
