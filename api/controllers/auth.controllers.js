require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { createUser, getUserByEmail } = require("../models/user.model");
const { createOrganisation } = require("../models/organization.model");
const { addUserToOrganisation } = require("../models/userOrganization");

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "30m",
	});
};

const registerUser = async (req, res) => {
	try {
		const { firstName, lastName, email, password, phone } = req.body;
		const userExists = await getUserByEmail(email);

		if (userExists) {
			return res.status(409).json({
				status: "duplicate error",
				message: "user already exists",
			});
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const userId = uuidv4();

		const newUser = await createUser({
			userId,
			firstName,
			lastName,
			email,
			password: hashedPassword,
			phone,
		});

		const orgName = `${firstName}'s Organisation`;
		const orgId = uuidv4();

		const newOrganisation = await createOrganisation({
			orgId,
			name: orgName,
		});

		const userOrganization = await addUserToOrganisation(
			newUser.userid,
			newOrganisation.orgid
		);
		console.log(userOrganization);
		const accessToken = generateToken(newUser.userid);

		

		res.status(201).json({
			status: "success",
			message: "Registration successful",
			data: {
				accessToken,
				user: {
					userId: newUser.userid,
					firstName: newUser.firstname,
					lastName: newUser.lastname,
					email: newUser.email,
					phone: newUser.phone,
				},
			},
		});
	} catch (error) {
		console.error("Error during registration:", error);
		res.status(400).json({
			status: "Bad request",
			message: "Registration unsuccessful",
			statusCode: 400,
		});
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await getUserByEmail(email);

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({
				status: "fail",
				message: "Invalid email or password",
			});
		}

		const accessToken = generateToken(user.userid);
		res.status(200).json({
			status: "success",
			message: "Login successful",
			data: {
				accessToken,
				user: {
					userId: user.userid,
					firstName: user.firstname,
					lastName: user.lastname,
					email: user.email,
					phone: user.phone,
				},
			},
		});
	} catch (error) {
		console.error("Error during login:", error);
		res.status(400).json({
			status: "Bad request",
			message: "Authentication failed",
			statusCode: 401,
		});
	}
};

module.exports = { registerUser, loginUser, generateToken};