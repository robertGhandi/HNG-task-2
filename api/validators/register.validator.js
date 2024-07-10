const joi = require("joi");

const registerUserSchema = joi
	.object({
		firstName: joi.string().empty('').required().trim(),
        lastName: joi.string().empty('').required().trim(),
		email: joi.string().email().empty('').required(),
		password: joi.string().empty('').required(),
		phone: joi.string(),
		
	})
	.options({ abortEarly: false });

const validator = (validationSchema) => (req, res, next) => {
	try {
		const result = validationSchema.validate(req.body);
		if (result.error) {
			return res.status(422).json({
				errors: [
                    {
                        field: result.error.details[0].path,
                        message: result.error.details[0].message
                    }
                ]
			});
		}

		req.body = result.value;

		next();
	} catch (error) {
		res.status(400).json({
			status: "error",
			message: "Validation error",
			data: error,
		});
	}
};

module.exports = {
	validateRegisterUser: validator(registerUserSchema),
};
