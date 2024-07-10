const { registerUser, loginUser } = require("../controllers/auth.controllers")
const { validateLoginUser } = require("../validators/login.validator")
const { validateRegisterUser } = require("../validators/register.validator")


const express = require("express")
const router = express.Router()

router.post("/register", validateRegisterUser, registerUser)
router.post("/login", validateLoginUser, loginUser)

module.exports = router