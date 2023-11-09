const {signupKhachHang, layTatCaKhachHang, layMotKhachHang, capNhatKhachHang, xoaKhachHang} = require("../controller/khachhang.controller");
const { userAuth, } = require("../middlewares/authentication");
const router = require("express").Router();

router.route("/")
    .get(userAuth, layTatCaKhachHang)
    .post(signupKhachHang);
router.route("/:id")
    .get(userAuth, layMotKhachHang)
    .put(userAuth, capNhatKhachHang)
    .delete(userAuth, xoaKhachHang);

module.exports = router;
