const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users", // collection name
    required: true,
  },
  courses: {
    type: [
      {
        cname: {
          required: true,
          type: String,
          minlength: 2,
        },
        cdesp: {
          type: String,
          required: true,
        },
        clink: {
          type: String,
          required: true,
        },
        cplatform: {
          type: String,
          required: true,
        },
        clikes: {
          type: Number,
          default: 0,
        },
        cdislikes: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
});

module.exports = mongoose.model("courses", courseSchema);
