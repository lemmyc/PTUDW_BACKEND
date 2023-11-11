const mongoose = require("mongoose");
const MongoDB = require("../utils/mongodb.utils");

// const autoIncrement = require("mongoose-auto-increment");
// const ChiTietDatHangSchema = require("./ChiTietDatHang.model").schema
const DonDatHang = new mongoose.Schema(
    {
        makhachhang:{
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
            required: false,
        },
        danhsachhanghoa:[
            {
                mahanghoa: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "HangHoa",
                    required: true
                },
                soluong: {
                    type: Number,
                    required: true
                },
                giagoc: {
                    type: Number,
                    required: false,
                    default: 0
                },
                phantramgiam: {
                    type: Number,
                    required: false,
                    default: 0
                },
                giadagiam: {
                    type: Number,
                    required: false,
                    default: 0
                },
                thanhtien: {
                    type: Number,
                    required: false,
                    default: 0
                }
            }
        ],
        tongtien:{
            type: Number,
            required: true,
            default: 0
        },
        trangthaigh:{
            type: Boolean,
			default: false,
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