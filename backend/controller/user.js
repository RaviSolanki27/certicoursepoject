const responseData = require("../helper/response");
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  DATA_INSERT_MESSAGE,
  DATA_INSERT_FAILD,
  INVALID_LOGIN,
  LOGIN_SUCCESS,
  INVALID_LOGIN_CREDENTIAL,
  DATA_FETCH_MESSAGE,
} = require("../config/responsemessage");
const {
  CREATED,
  BAD_REQUEST,
  SUCCESS,
  NOT_FOUND,
} = require("../config/statuscode");

exports.registerUser = async (req, res, next) => {
  await user
    .create(req.body)
    .then((result) =>
      responseData({
        res,
        status: CREATED,
        message: DATA_INSERT_MESSAGE,
        result,
      })
    )
    .catch((err) => {
      responseData({
        res,
        status: BAD_REQUEST,
        message: DATA_INSERT_FAILD,
        result: err,
      });
    });
};

//login user
exports.loginUser = async (req, res, next) => {
  const email = req.query.email;
  const password = req.query.password;
  const newuser = await user.findOne({ email });
  if (newuser) {
    const isMatch = await bcrypt.compare(password, newuser.password);
    if (isMatch) {
      const token = jwt.sign({ _id: newuser._id }, process.env.SECRET_KEY, {
        expiresIn: process.env.EXPIRE_TIME,
      });
      responseData({
        res,
        status: SUCCESS,
        message: LOGIN_SUCCESS,
        result: { token },
      });
    } else {
      console.log("OOPS-----");
      responseData({
        res,
        status: BAD_REQUEST,
        message: INVALID_LOGIN,
      });
    }
  } else {
    responseData({
      res,
      status: NOT_FOUND,
      message: INVALID_LOGIN_CREDENTIAL,
    });
  }
};

exports.getUser = async (req, res, next) => {
  console.log(req.userId, "MJJJ");
  await user
    .findById(req.userId)
    .then((result) =>
      responseData({
        res,
        status: SUCCESS,
        message: DATA_FETCH_MESSAGE,
        result,
      })
    )
    .catch((err) =>
      responseData({
        res,
        status: NOT_FOUND,
        message: err.message,
      })
    );
};
exports.getSpecificuser = async (req, res, next) => {
  console.log(req.params,"JJIJIJ");
  await user
    .findById(req.params.id)
    .then((result) =>
      responseData({
        res,
        status: SUCCESS,
        message: DATA_FETCH_MESSAGE,
        result,
      })
    )
    .catch((err) =>
      responseData({
        res,
        status: NOT_FOUND,
        message: err.message,
      })
    );
};
