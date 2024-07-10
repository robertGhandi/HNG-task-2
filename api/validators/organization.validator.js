const joi = require("joi");

const organizationSchema = joi.object({
    
    name: joi.string().empty('').required(),
    description: joi.string()
    
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
	validateOrganization: validator(organizationSchema)
}