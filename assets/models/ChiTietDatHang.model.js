const mongoose = require("mongoose");
const ChiTietDatHang = new mongoose.Schema(
    {
        madonhang:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "DonHang",
        },
        mahanghoa:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "HangHoa",
        },
        soluong:{
            type: Number,
            required: true
        }
    },
	{
		timestamps: true,
	},
);
module.exports = {
	schema: ChiTietDatHang,
	model: mongoose.model("ChiTietDatHang", ChiTietDatHang, "ChiTietDatHang"),
};