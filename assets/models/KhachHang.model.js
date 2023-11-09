const mongoose = require("mongoose");
const MongoDB = require("../utils/mongodb.utils");
const DonDatHangSchema = require("./DonDatHang.model").schema
const KhachHang = new mongoose.Schema(
    {
        hoten:{
            type: String,
            required: true
        },
        diachi:{
            type: String,
            required: true
        },
        dondathang:[DonDatHangSchema],
        sodienthoai:{
            type: String,
            required: true
        },
        nguoidung: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "NguoiDung",
		},
        isDeleted: {
			type: Boolean,
			require: true,
			default: false,
		},
    },
	{
		timestamps: true,
	},
);
MongoDB.setupSoftDelete(KhachHang);
module.exports = {
	schema: KhachHang,
	model: mongoose.model("KhachHang", KhachHang, "KhachHang"),
};