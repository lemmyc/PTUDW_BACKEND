const JWTUtils = require("../utils/jwt.utils");
const NguoiDungModel = require("../models/NguoiDung.model").model;
class AuthenticationMiddleWares {
	async userAuth(req, res, next) {
		try {
			const authorization = req.headers.authorization;
			if (!authorization)
				throw new Error("Access token là bắt buộc");
			const accessToken = String(authorization).replace("Bearer ", "");
			if (!accessToken)
				throw new Error("Access token không hợp lệ");
			const decodedUser = JWTUtils.decode(accessToken);

			if (!decodedUser)
				throw new Error("Access token không hợp lệ");
			const user = await NguoiDungModel.findById(
				decodedUser._id
			);
			req.currentUser = user;
			next();
		} catch (error) {
			res.status(401).send({
				message: error.message,
			});
		}
	}
}

module.exports = new AuthenticationMiddleWares();
