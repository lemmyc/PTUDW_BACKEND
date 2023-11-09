const mongoose = require("mongoose");
const HinhAnhHH = new mongoose.Schema(
    {
        tenhinh:{
            type: String,
            required: true
        },
        urlhinh:{
            type: String,
            required: true
        },
        hanghoa:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "HangHoa",
        },
    },
	{
		timestamps: true,
	},
);
module.exports = {
	schema: HinhAnhHH,
	model: mongoose.model("HinhAnhHH", HinhAnhHH, "HinhAnhHH"),
};