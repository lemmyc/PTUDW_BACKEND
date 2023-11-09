const HangHoaModel = require("../models/HangHoa.model").model;
class HangHoaController {
	async themHangHoa(req, res) {
		try {
			const { tenhanghoa, ...rest } = req.body;
			const availableItem = await HangHoaModel.findOne({tenhanghoa});
			if (availableItem)
				throw new Error("Hàng hóa đã tồn tại");

			const hangHoaTemp = await HangHoaModel.create(
				[
					{
						tenhanghoa,
						...rest,
					},
				]
			);
			return res.status(200).json(hangHoaTemp[0]);
		} catch (error) {
			res.status(400).send({
				msg: error.message,
			});
		}
	}
	
	async layMotHangHoa(req, res) {
		try {
			const id = req.params.id;
			const hanghoa = await HangHoaModel.findById(id).sort([]);
			if (hanghoa){
				const result = {
					hanghoa
				};
				return res.status(200).json(result);
			}else{
				return res.status(404).json({msg: "Hàng hóa không tồn tại hoặc đã bị xóa"});
			}
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
	async layTatCaHangHoa(req, res) {
		try {
			const offset = req.query.offset || 0;
			const pageSize = req.query.pageSize || null;
			const term = req.query.term || null;
			const searchBy = req.query.searchBy || null;
			const filter = {};
			if (term) {
				filter[searchBy] = {
					$regex: term,
					$options: "i",
				};
			}
			const DSHangHoa = await HangHoaModel.find(
				filter,
				"",
				{
					skip: offset,
					limit: pageSize,
				}
			);
			const totalRows = DSHangHoa.length;
			return res.status(200).json({
				totalRows,
				data: DSHangHoa,
			});
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
	async xoaHangHoa(req, res) {
		try {
			const id = req.params.id;
			const result = await HangHoaModel.deleteOne(
				{
					_id: id,
				}
			);
			return res.status(200).json(result);
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
	async capNhatHangHoa(req, res) {
		try {
			const id = req.params.id;
			const result = await HangHoaModel.updateOne(
				{
					_id: id,
				},
				req.body
			);
			return res.status(200).json(result);
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
}

module.exports = new HangHoaController();
