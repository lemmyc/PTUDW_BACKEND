const PasswordUtils = require("../utils/password.utils");
const JWTUtils = require("../utils/jwt.utils");
const NguoiDungModel = require("../models/NguoiDung.model").model;
const KhachHangModel = require("../models/KhachHang.model").model;
const NhanVienModel = require("../models/NhanVien.model").model;
class AuthController {
	async signup(req, res) {
		try {
			const { taikhoan, matkhau, ...rest } = req.body;
			const availableUser = await NguoiDungModel.findOne({
				taikhoan
			});
			if (availableUser)
				throw new Error("Tài Khoản Đã Tồn Tại");
			const hashedPassword = await PasswordUtils.hash(matkhau);
			const newUser = new NguoiDungModel({
				...rest,
				taikhoan,
				matkhau: hashedPassword,
			});
			await newUser.save();
			return res.status(200).json(newUser);
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
	async signin(req, res) {
		try {
			const { taikhoan, matkhau, ...rest  } = req.body;

			const user = await NguoiDungModel.findOne({taikhoan});
			if (!user)
				throw new Error(`Không tìm thấy tài khoản với tên ${taikhoan}`);
			const isValidPassword =
				await PasswordUtils.compare(matkhau, user.matkhau);
			if (!isValidPassword)
				throw new Error("Mật khẩu không đúng");
			// Mật khẩu và tài khoản đúng
			const accessToken = JWTUtils.sign(
				user.toJSON()
			);
			return res.status(200).json(accessToken);
		} catch (error) {
			res.status(500).send({
				msg: error.message,
			});
		}
	}
	async auth(req, res) {
		try {
			const authorization = req.headers.authorization;
			const currentUser = JWTUtils.decode(authorization.replace("Bearer ", ""));
			const { matkhau, ...rest } = currentUser;
			// console.log(currentUser)

			if (rest.lakhachhang) {
				const khachHang = await KhachHangModel.findOne({
					nguoidung: currentUser._id,
				});
				if (!khachHang)
					throw new Error(
						"Không tìm thấy thông tin Khách hàng với tên tài khoản " + currentUser.taikhoan
					);
				return res.status(200).json({
					...rest,
					info: khachHang,
				});
			}

			const nhanVien = await NhanVienModel.findOne({
				nguoidung: currentUser._id,
			});
			if (!nhanVien)
				throw new Error(
					"Không tìm thấy thông tin Nhân viên với tên tài khoản " + currentUser.taikhoan
				);
			return res.status(200).json({
				...rest,
				info: nhanVien,
			});
		} catch (error) {
			res.status(401).send({
				msg: error.message,
			});
		}
	}
}

module.exports = new AuthController();
