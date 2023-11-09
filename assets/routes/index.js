const express = require("express");
const router = express.Router();

const {
	userAuth,
} = require("../middlewares/authentication");


router.use("/auth", require("./auth.route"));
router.use("/khachhang", require("./khachhang.route"));
router.use("/nhanvien", require("./nhanvien.route"));
router.use("/hanghoa", userAuth, require("./hanghoa.route"));
router.use("/dondathang", userAuth, require("./dondathang.route"));

module.exports = router;
