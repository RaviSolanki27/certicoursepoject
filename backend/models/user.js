const validator = require("validator");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: "String",
    minlength: 2,
  },
  email: {
    type: "String",
    required: true,
    unique: [true, "Email already present!!"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email!!");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log("Hiii from inside");
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// We are generating token
userSchema.methods.generateAuthToken = async function () {
  try {
    let mytoken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRE_TIME,
    });
    return mytoken;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoose.model("User", userSchema);
