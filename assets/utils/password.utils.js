const bcrypt = require("bcrypt");
const PasswordUtil = {
	hash(data) {
		const saltRounds = 8;
		return bcrypt.hash(data, saltRounds);
	},
	compare(password, hash) {
		return bcrypt.compare(password, hash);
	},
};

module.exports = PasswordUtil;
