const mongoose = require("mongoose");
const MongoDB = require("../utils/mongodb.utils");

const DonDatHangSchema = require("./DonDatHang.model").schema
const NhanVien = new mongoose.Schema(
    {
        hoten:{
            type: String,
            required: true
        },
        chucvu:{
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
MongoDB.setupSoftDelete(NhanVien);
module.exports = {
	schema: NhanVien,
	model: mongoose.model("NhanVien", NhanVien, "NhanVien"),
    
};