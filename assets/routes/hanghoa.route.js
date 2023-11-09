const {themHangHoa, layTatCaHangHoa, layMotHangHoa, capNhatHangHoa, xoaHangHoa} = require("../controller/hanghoa.controller");
const { userAuth, } = require("../middlewares/authentication");
const router = require("express").Router();

router.route("/")
    .get(userAuth, layTatCaHangHoa)
    .post(userAuth, themHangHoa);
router.route("/:id")
    .get(userAuth, layMotHangHoa)
    .put(userAuth, capNhatHangHoa)
    .delete(userAuth, xoaHangHoa);

module.exports = router;
