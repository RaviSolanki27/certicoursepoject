const {
  DATA_INSERT_MESSAGE,
  DATA_INSERT_FAILD,
} = require("../config/responsemessage");
const { CREATED, BAD_REQUEST } = require("../config/statuscode");
const responseData = require("../helper/response");
const course = require("../models/course");

exports.updateCourse = async (req, res) => {
  const update = await course.findOneAndUpdate(
    { user_id: req.userId },
    {
      $push: {
        courses: req.body,
      },
    }
  );
  if (!update) {
    await course
      .create({
        user_id: req.userId,
        courses: [req.body],
      })
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
  }
};

exports.courses = async (req, res) => {
  await course
    .find({})
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
