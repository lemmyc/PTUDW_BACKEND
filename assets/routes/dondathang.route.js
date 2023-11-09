const {
	themDonDatHang,
    tiepNhanDonDatHang,
	layTatCaDonDatHang,
	layMotDonDatHang,
	xoaDonDatHang,
} = require("../controller/dondathang.controller");
const {
	userAuth,
} = require("../middlewares/authentication");
const router = require("express").Router();

router
	.route("/")
	.get(userAuth, layTatCaDonDatHang)
	.post(userAuth, themDonDatHang)
	.put(userAuth, tiepNhanDonDatHang);
router
	.route("/:id")
	.get(userAuth, layMotDonDatHang)
	.delete(userAuth, xoaDonDatHang);

module.exports = router;
