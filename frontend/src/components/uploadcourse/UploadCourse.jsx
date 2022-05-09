import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./upload.css";

function UploadCourse() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cname: "",
    cdesp: "",
    clink: "",
    cplatform: "",
  });

  const token = useSelector((state) => state.loginTokenData);
  const handleUpload = async () => {
    await axios
      .patch(
        "/updateCourse",
        {
          cname: formData.cname,
          cdesp: formData.cdesp,
          clink: formData.clink,
          cplatform: formData.cplatform,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      )
      .then((res) => {
        navigate("/");
        setFormData({})
      })
      .catch((err) => console.log("error: ", err));
  };

  const handleLogin = () => {
    axios
      .get("/getuser", {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      })
      .then((res) => {})
      .catch((err) => {
        if (err.response.status === 401) {
          toast.error("Please Login", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/");
        } else {
          // Toast({ msg: err.message });
        }
      });
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <div className="container upload-form d-flex justify-content-center">
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

      {/* <form className="width-100"> */}
      <div className="form-row width-100">
        <div className="col-md-8 mb-3">
          <label className="form-label">Course Name</label>
          <input
            onChange={(e) => {
              setFormData({ ...formData, cname: e.target.value });
            }}
            type="text"
            className="form-control"
            name=""
            id=""
            aria-describedby="helpId"
            placeholder="React js"
          />
        </div>

        <div className="col-md-8 mb-3">
          <label className="form-label">Course details</label>
          <textarea
            onChange={(e) => {
              setFormData({ ...formData, cdesp: e.target.value });
            }}
            className="form-control"
            name=""
            id=""
            rows="3"
          ></textarea>
        </div>

        <div className="col-md-8 mb-3">
          <label className="form-label">Course link</label>
          <input
            onChange={(e) => {
              setFormData({ ...formData, clink: e.target.value });
            }}
            type="url"
            className="form-control"
            name=""
            id=""
            aria-describedby="helpId"
            placeholder="Please remove https:// "
          />
        </div>

        <div className="col-md-8 mb-3">
          <label className="form-label">Platform</label>
          <input
            onChange={(e) => {
              setFormData({ ...formData, cplatform: e.target.value });
            }}
            type="text"
            className="form-control"
            name=""
            id=""
            aria-describedby="helpId"
            placeholder="Udemy"
          />
        </div>

        <div className="col-md-8 mb-3">
          <button
            // type="submit"
            className="btn btn-primary signup-btn mt-2"
            onClick={() => {
              handleUpload();
              navigate("/")
            }}
          >
            Upload
          </button>
        </div>
      </div>
      {/* </form> */}
    </div>
  );
}

export default UploadCourse;
