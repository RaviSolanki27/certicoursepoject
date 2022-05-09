const mongoose = require("mongoose");
const { DATABASE } = require("../config/connection");
mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected successfully..."))
  .catch((err) => console.log("database connection faild due to Error: ", err));
