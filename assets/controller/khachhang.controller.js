const PasswordUtils = require("../utils/password.utils");
const NguoiDungModel = require("../models/NguoiDung.model").model;
const KhachHangModel = require("../models/KhachHang.model").model;
class KhachHangController {
	async signupKhachHang(req, res) {
		try {
			const { taikhoan, matkhau, ...rest } = req.body.nguoidung;
			const availableUser = await NguoiDungModel.findOne({taikhoan});
			if (availableUser)
				throw new Error("Tài Khoản Đã Tồn Tại");
			const hashedPassword = await PasswordUtils.hash(matkhau);

			const nguoiDungTemp = await NguoiDungModel.create(
				[
					{
						taikhoan,
						matkhau: hashedPassword,
						...rest,
					},
				]
			);

			const khachHangTemp = await KhachHangModel.create(
				[
					{
						...req.body.khachhang,
						nguoidung: new NguoiDungModel(nguoiDungTemp[0])._id,
					},
				]
			);
			return res.status(200).json(khachHangTemp[0]);
		} catch (error) {
			res.status(400).send({
				msg: error.message,
			});
		}
	}
	
	async layMotKhachHang(req, res) {
		try {
			const id = req.params.id;
			const khachhang = await KhachHangModel.findById(id).sort([]);
			if (khachhang){
				const dondathang = khachhang.dondathang.sort((prev, next) => {
					return (
						new Date(next.ngaydh) - new Date(prev.ngaydh)
					);
				});
				const result = {
					...khachhang.toJSON(),
					dondathang
				};
				return res.status(200).json(result);
			}else{
				return res.status(404).json({msg: "Khách hàng không tồn tại hoặc đã bị xóa"});
			}
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
	async layTatCaKhachHang(req, res) {
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
			const DSKhachHang = await KhachHangModel.find(
				filter,
				"",
				{
					skip: offset,
					limit: pageSize,
				}
			);
			const totalRows = DSKhachHang.length;
			return res.status(200).json({
				totalRows,
				data: DSKhachHang,
			});
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
	async xoaKhachHang(req, res) {
		try {
			const id = req.params.id;
			const result = await KhachHangModel.updateOne(
				{
					_id: id,
				},
				{
					isDeleted: true,
				}
			);
			return res.status(200).json(result);
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
	async capNhatKhachHang(req, res) {
		try {
			const id = req.params.id;
			const result = await KhachHangModel.updateOne(
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

module.exports = new KhachHangController();
