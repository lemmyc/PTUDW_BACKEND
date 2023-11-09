const mongoose = require("mongoose");
const HinhAnhHHSchema = require("./HinhAnhHH.model").schema
const HangHoa = new mongoose.Schema(
    {
        tenhanghoa:{
            type: String,
            required: true
        },
        motahanghoa:{
            type: String,
            required: true
        },
        soluong:{
            type: Number,
            required: true
        },
        gia:{
            type: Number,
            required: true
        },
        ghichu:{
            type: String,
            required: true
        },
        hinhanhhh:[HinhAnhHHSchema]
    },
	{
		timestamps: true,
	},
);

module.exports = {
	schema: HangHoa,
	model: mongoose.model("HangHoa", HangHoa, "HangHoa"),
};