const mongoose = require("mongoose");
const HangHoa = new mongoose.Schema(
    {
        tenhanghoa:{
            type: String,
            required: true
        },
        loaihanghoa:{
            type: String,
            required: true
        },
        urlhinh:{
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
        giamgia:{
            type: Number,
            required: false,
            default: 0
        },
        ghichu:{
            type: String,
            required: false
        }
    },
	{
		timestamps: true,
	},
);

module.exports = {
	schema: HangHoa,
	model: mongoose.model("HangHoa", HangHoa, "HangHoa"),
};