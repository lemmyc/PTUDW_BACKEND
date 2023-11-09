const {auth, signup, signin} = require("../controller/auth.controller");

const router = require("express").Router();

router.route("/").post(auth);
router.route("/signup").post(signup);
router.route("/signin").post(signin);

module.exports = router;
