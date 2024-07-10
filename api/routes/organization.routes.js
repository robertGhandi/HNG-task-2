const {
	getOrganisations,
	addUserToOrganisation,
    createOrganisation,
    getOrganisationById
} = require("../controllers/organization.controllers");

const { validateOrganization } = require("../validators/organization.validator")
const authMiddleware = require("../middleware/auth.middleware");
const express = require("express");
const router = express.Router();

router.get("/", authMiddleware, getOrganisations);
router.get("/:orgId", authMiddleware, getOrganisationById);
router.post("/", authMiddleware, validateOrganization, createOrganisation)
router.post("/:orgId/users", authMiddleware, addUserToOrganisation)

module.exports = router;
