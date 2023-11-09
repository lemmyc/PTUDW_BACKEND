const {
    signupNhanVien,
    layTatCaNhanVien,
    layMotNhanVien,
    xoaNhanVien,
    capNhatNhanVien
} = require("../controller/nhanvien.controller");
const { userAuth } = require("../middlewares/authentication");
const router = require("express").Router();

router.route("/")
    .get(userAuth, layTatCaNhanVien)
    .post(signupNhanVien);
router.route("/:id")
    .get(userAuth, layMotNhanVien)
    .delete(userAuth, xoaNhanVien)
    .put(userAuth, capNhatNhanVien);

module.exports = router;
