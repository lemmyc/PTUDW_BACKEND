const mongoose = require("mongoose");
const MongoDB = require("../utils/mongodb.utils");

// const autoIncrement = require("mongoose-auto-increment");
const ChiTietDatHangSchema = require("./ChiTietDatHang.model").schema
const DonDatHang = new mongoose.Schema(
    {
        makhach:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "KhachHang",
        },
        manhanvien:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "NhanVien",
        },
        ngaydh:{
            type: Date,
            required: true
        },
        ngaygh:{
            type: Date,
            required: true
        },
        chitietdathang:[ChiTietDatHangSchema],
        trangthaigh:{
            type: Boolean,
			default: false,
			require: true,
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

// autoIncrement.initialize(mongoose.connection);
// DonDatHang.plugin(autoIncrement.plugin, {
// 	model: "DonDatHang",
// 	field: "id",
// 	startAt: 100,
// });
MongoDB.setupSoftDelete(DonDatHang);
module.exports = {
	schema: DonDatHang,
	model: mongoose.model("DonDatHang", DonDatHang, "DonDathang"),
};