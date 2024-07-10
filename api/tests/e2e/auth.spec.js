const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.json());

jest.mock("../../models/user.model", () => ({
	create: jest.fn(),
}));

jest.mock("../../models/organization.model", () => ({
	create: jest.fn(),
}));

jest.mock("../../controllers/auth.controllers", () => jest.fn());

describe("POST /auth/register", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should register a new user successfully", async () => {
		const mockUser = {
			userId: "1",
			firstName: "ghandi",
			lastName: "robert",
			email: "robert@gmail.com",
			phone: "1234567890",
		};

		const mockOrganisation = {
			id: "1",
			name: "ghandi's Organization",
		};

		require("../../models/user.model").create.mockResolvedValue(mockUser);
		require("../../models/organization.model").create.mockResolvedValue(
			mockOrganisation
		);
		mockUser.addOrganisation = jest.fn().mockResolvedValue();
		require("../../controllers/auth.controllers").mockReturnValue(
			"mockAccessToken"
		);

		const response = await request(app).post("/auth/register").send({
			firstName: "ghandi",
			lastName: "robert",
			email: "robert@gmail.com",
			password: "password",
			phone: "1234567890",
		});

		expect(response.status).toBe(201);
		expect(response.body).toEqual({
			status: "success",
			message: "Registration successful",
			data: {
				accessToken: "mockAccessToken",
				user: {
					userId: "1",
					firstName: "ghandi",
					lastName: "robert",
					email: "robert@gmail.com",
					phone: "1234567890",
				},
			},
		});
	});

	it("should return validation error for missing fields", async () => {
		const response = await request(app).post("/auth/register").send({
			firstName: "ghandi",
			email: "robert@gmail.com",
			password: "password",
		});

		expect(response.status).toBe(400);
		expect(response.body).toEqual({
			status: "Bad request",
			message: "Registration unsuccessful",
			statusCode: 400,
		});
	});

	it("should handle database constraint errors (e.g., duplicate email)", async () => {
		require("../../models/user.model").create.mockRejectedValue(
			new Error("Email already exists")
		);

		const response = await request(app).post("/auth/register").send({
			firstName: "ghandi",
			lastName: "robert",
			email: "robert@gmail.com",
			password: "password",
			phone: "1234567890",
		});

		expect(response.status).toBe(400);
		expect(response.body).toEqual({
			status: "Bad request",
			message: "Registration unsuccessful",
			statusCode: 400,
		});
	});
});
