const express = require("express");
const middleware = require("../middleware/auth");
const router = express.Router();
const controller = require("../controller");

// router.get("/", middleware, (req, res, next) => {
//   User
//     .find({})
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => console.log(err));
//   next();
// });

// router.post("/", (req, resp) => {
//   user
//     .create(req.body)
//     .then((resp) => {
//       console.log(resp, "CREATED");
//     })
//     .catch((err) => {
//       console.log(err, "Database Error");
//     });
//   // next();
// });

router.post("/", controller.user.registerUser);
router.get("/loginuser", controller.user.loginUser);
router.get("/courses", controller.course.courses);
router.get("/getuser", middleware, controller.user.getUser);
router.get("/getspecificuser/:id",  controller.user.getSpecificuser);
router.patch("/updatecourse", middleware, controller.course.updateCourse);

module.exports = router;
