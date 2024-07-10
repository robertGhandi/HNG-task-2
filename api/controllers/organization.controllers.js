const { v4: uuidv4 } = require("uuid");
const {
	createOrganisation,
	getOrganisationsByUserId,
	getOrganisationById,
} = require("../models/organization.model");
const { addUserToOrganisation } = require("../models/userOrganization");

exports.createOrganisation = async (req, res) => {
	try {
		const { name, description } = req.body;
		const orgId = uuidv4();
		const userId = req.user.id;

		const newOrganisation = await createOrganisation({
			orgId,
			name,
			description,
		});

		await addUserToOrganisation(userId, orgId);

		res.status(201).json({
			status: "success",
			message: "Organisation created successfully",
			data: newOrganisation,
		});
	} catch (error) {
		console.error("Error creating organisation:", error);
		res.status(400).json({
			status: "Bad request",
			message: "Client error",
			statusCode: 400,
		});
	}
};

exports.getOrganisations = async (req, res) => {
	try {
		const userId = req.user.id;
		const organisations = await getOrganisationsByUserId(userId);
        console.log(userId)

		res.status(200).json({
			status: "success",
			message: "Organisations retrieved successfully",
			data: {
				organisations,
			},
		});
	} catch (error) {
		console.error("Error fetching organisations:", error);
		res.status(400).json({
			status: "Bad request",
			message: "Unable to fetch organisations",
			statusCode: 400,
		});
	}
};

exports.getOrganisationById = async (req, res) => {
	try {
		const orgId = req.params.orgId;
		const organisation = await getOrganisationById(orgId);

		if (!organisation) {
			return res.status(404).json({
				status: "fail",
				message: "Organisation not found",
			});
		}

		res.status(200).json({
			status: "success",
			message: "Organisation retrieved successfully",
			data: organisation,
		});
	} catch (error) {
		console.error("Error fetching organisation:", error);
		res.status(400).json({
			status: "Bad request",
			message: "Unable to fetch organisation",
			statusCode: 400,
		});
	}
};

exports.addUserToOrganisation = async (req, res) => {
	try {
		const { userId } = req.body;
		const orgId = req.params.orgId;

		await addUserToOrganisation(userId, orgId);

		res.status(200).json({
			status: "success",
			message: "User added to organisation successfully",
		});
	} catch (error) {
		console.error("Error adding user to organisation:", error);
		res.status(400).json({
			status: "Bad request",
			message: "Unable to add user to organisation",
			statusCode: 400,
		});
	}
};
