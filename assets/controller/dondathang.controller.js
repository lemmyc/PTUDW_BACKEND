const DonDatHangModel = require("../models/DonDatHang.model").model;
const KhachHangModel = require("../models/KhachHang.model").model;
const NhanVienModel = require("../models/NhanVien.model").model;
const HangHoaModel = require("../models/HangHoa.model").model;
class DonDatHangController {
	async themDonDatHang(req, res) {
		try {
			const { makhachhang, danhsachhanghoa, ...rest } = req.body;
			// console.log(makhachhang)
			const khachhang = await KhachHangModel.findById(makhachhang);
			if (!khachhang)
				throw new Error("Không thể tìm thấy khách hàng với mã" + makhachhang);
			for(const hangHoa of danhsachhanghoa){
				const {mahanghoa, ...thongTinHangHoa} = hangHoa;
				// console.log(thongTinHangHoa)
				const hangHoaKho = await HangHoaModel.findById(mahanghoa);
				if (!hangHoaKho)
					throw new Error("Không thể tìm thấy hàng hóa với mã" + mahanghoa);
				if(hangHoaKho.soluong < thongTinHangHoa.soluong)
					throw new Error(`Số lượng hàng của ${hangHoaKho.tenhanghoa} trong kho ít hơn số hàng cần đặt`);	
			}
			// console.log("checkpoint")
			for(const hangHoa of danhsachhanghoa){
				const {mahanghoa, soluong, ...thongTinHangHoa} = hangHoa;
				await HangHoaModel.findOneAndUpdate(
					{ _id: mahanghoa },
					{ $inc: { soluong: -soluong } },
					{ new: true }
				);	
			}
			const DonDatHang = await DonDatHangModel.create(
				[
					{
						makhachhang,
						danhsachhanghoa,
						...rest,
					},
				]
			);
			return res.status(200).json(DonDatHang[0]);
		} catch (error) {
			res.status(400).send({
				msg: error.message,
			});
		}
	}
	async tiepNhanDonDatHang(req, res) {
		try {
			const { madondathang, manhanvien } = req.body;
			// console.log(makhachhang)
			const dondathang = await DonDatHangModel.findById(madondathang);
			if (!dondathang)
				throw new Error("Không thể tìm thấy đơn đặt hàng với mã" + madondathang);
			const nhanvien = await NhanVienModel.findById(manhanvien);
			if (!nhanvien)
				throw new Error("Không thể tìm thấy nhân viên với mã" + manhanvien);
			const result = await DonDatHangModel.findOneAndUpdate(
				{ _id: madondathang },
				{ manhanvien },
				{ new: true }
			);
			return res.status(200).json(result);
		} catch (error) {
			res.status(400).send({
				msg: error.message,
			});
		}
	}
	async layMotDonDatHang(req, res) {
		try {
			const id = req.params.id;
			const dondathang = await DonDatHangModel.findById(id).sort([]);
			if (dondathang){
				const result = {
					dondathang
				};
				return res.status(200).json(result);
			}else{
				return res.status(404).json({msg: "Đơn đặt hàng không tồn tại hoặc đã bị xóa"});
			}
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
	async layTatCaDonDatHang(req, res) {
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
			const DSDonDatHang = await DonDatHangModel.find(
				filter,
				"",
				{
					skip: offset,
					limit: pageSize,
				}
			);
			const totalRows = DSDonDatHang.length;
			return res.status(200).json({
				totalRows,
				data: DSDonDatHang,
			});
		} catch (error) {
			res.send({
				msg: error.message,
			});
		}
	}
	async xoaDonDatHang(req, res) {
		try {
			const id = req.params.id;
			const dondathang = await DonDatHangModel.findById(id);
			
			// const { makhachhang, danhsachhanghoa, ...rest } = req.body;
			// console.log(makhachhang)
			if (!dondathang)
				throw new Error("Không thể tìm thấy Đơn đặt hàng với mã " + dondathang);
			const { danhsachhanghoa, ...rest } = dondathang;
			for(const hangHoa of danhsachhanghoa){
				const {mahanghoa, ...thongTinHangHoa} = hangHoa;
				// console.log(thongTinHangHoa)
				const hangHoaKho = await HangHoaModel.findById(mahanghoa);
				if (!hangHoaKho)
					throw new Error("Không thể tìm thấy hàng hóa với mã" + mahanghoa);	
			}
			// console.log("checkpoint")
			for(const hangHoa of danhsachhanghoa){
				const {mahanghoa, soluong, ...thongTinHangHoa} = hangHoa;
				await HangHoaModel.findOneAndUpdate(
					{ _id: mahanghoa },
					{ $inc: { soluong: +soluong } },
					{ new: true }
				);	
			}
			const result = await DonDatHangModel.updateOne(
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
}

module.exports = new DonDatHangController();
