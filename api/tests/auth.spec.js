require("dotenv").config();
const jwt = require("jsonwebtoken");

const {
	generateToken,
	registerUser,
} = require("../controllers/auth.controllers");

describe("generateToken", () => {
	const userId = "robert";
	const secret = process.env.ACCESS_TOKEN_SECRET;
	const expiresIn = "30m";

	beforeAll(() => {
		process.env.ACCESS_TOKEN_SECRET = secret;
	});

	it("should generate a token with correct user details", () => {
		const token = generateToken(userId);
		const decoded = jwt.verify(token, secret);

		expect(decoded).toHaveProperty("id", userId);
	});

	it("should set the token to expire in 30 minutes", () => {
		const token = generateToken(userId);
		const decoded = jwt.verify(token, secret);

		const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
		const expectedExpiryTime = currentTime + 2 * 60; //  in seconds

		expect(decoded.exp).toBeGreaterThanOrEqual(currentTime);
		expect(decoded.exp).toBeLessThanOrEqual(expectedExpiryTime);
	});
});
