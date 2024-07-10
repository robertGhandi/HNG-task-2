const { getUser } = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const express = require("express");
const router = express.Router();

router.get("/:id", authMiddleware, getUser);

module.exports = router;
