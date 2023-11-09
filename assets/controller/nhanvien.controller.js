const PasswordUtils = require("../utils/password.utils");
const NguoiDungModel = require("../models/NguoiDung.model").model;
const NhanVienModel = require("../models/NhanVien.model").model;
class NhanVienController {
	async signupNhanVien(req, res) {
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

			const nhanVienTemp = await NhanVienModel.create(
				[
					{
						...req.body.nhanvien,
						nguoidung: new NguoiDungModel(nguoiDungTemp[0])._id,
					},
				]
			);
			return res.status(200).json(nhanVienTemp[0]);
		} catch (error) {
			res.status(400).send({
				msg: error.message,
			});
		}
	}
	
	async layMotNhanVien(req, res) {
		try {
			const id = req.params.id;
			const nhanvien = await NhanVienModel.findById(id).sort([]);
			if (nhanvien){
				const dondathang = nhanvien.dondathang.sort((prev, next) => {
					return (
						new Date(next.ngaydh) - new Date(prev.ngaydh)
					);
				});
				const result = {
					...nhanvien.toJSON(),
					dondathang
				};
				return res.status(200).json(result);
			}else{
				return res.status(404).json({msg: "Nhân viên không tồn tại hoặc đã bị xóa"});
			}
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
	async layTatCaNhanVien(req, res) {
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
			const DSNhanVien = await NhanVienModel.find(
				filter,
				"",
				{
					skip: offset,
					limit: pageSize,
				}
			);
			const totalRows = DSNhanVien.length;
			return res.status(200).json({
				totalRows,
				data: DSNhanVien,
			});
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
	async xoaNhanVien(req, res) {
		try {
			const id = req.params.id;
			const result = await NhanVienModel.updateOne(
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
	async capNhatNhanVien(req, res) {
		try {
			const id = req.params.id;
			const result = await NhanVienModel.updateOne(
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

module.exports = new NhanVienController();
