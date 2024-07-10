require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.status(401).json({
			status: "fail",
			message: "Unauthorized",
		});
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		req.user = decoded;

		next();
	} catch (err) {
		return res.status(401).json({
			status: "fail",
			message: "Unauthorized",
		});
	}
};

module.exports = authMiddleware;
