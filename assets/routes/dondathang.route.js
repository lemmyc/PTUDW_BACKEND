const {
	themDonDatHang,
    tiepNhanDonDatHang,
	layTatCaDonDatHang,
	layMotDonDatHang,
	capNhatDonDatHang,
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
	.put(userAuth, capNhatDonDatHang)
	.delete(userAuth, xoaDonDatHang);

module.exports = router;
