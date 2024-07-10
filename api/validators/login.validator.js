const joi = require("joi");

const loginUserSchema = joi.object({
    
    email: joi.string().email().empty('').required(),
    password: joi.string().empty('').required(),
    
}).options({ abortEarly: false })


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
	validateLoginUser: validator(loginUserSchema)
}