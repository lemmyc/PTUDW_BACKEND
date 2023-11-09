const express = require("express");
const router = express.Router();

// const {
// 	userAuth,
// } = require("../middlewares/authentication");


router.use("/auth", require("./auth.route"));
router.use("/khachhang", require("./khachhang.route"));
router.use("/nhanvien", require("./nhanvien.route"));
// router.use("/nhanvien", userAuth, require("~/routes/pt.route"));
// router.use("/hanghoa", userAuth, require("~/routes/goitap.route"));
// router.use("/dathang", userAuth, require("~/routes/goipt.route"));
// router.use("/chitietdathang", userAuth, require("~/routes/hoadon.route"));

module.exports = router;
