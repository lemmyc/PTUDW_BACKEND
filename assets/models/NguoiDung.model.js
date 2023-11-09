const mongoose = require("mongoose");
const NguoiDung = new mongoose.Schema(
    {
        taikhoan:{
            type: String,
            required: true
        },
        matkhau:{
            type: String,
            required: true
        },
        lakhachhang:{
            type: Boolean,
            default: true
        },
        lanhanvien:{
            type: Boolean,
            default: false
        },
    },
	{
		timestamps: true,
	},
);

module.exports = {
	schema: NguoiDung,
	model: mongoose.model("NguoiDung", NguoiDung, "NguoiDung"),
};