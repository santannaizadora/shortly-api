import joi from 'joi';

const registerSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required(),
});

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});

const shortenUrlSchema = joi.object({
    url: joi.string().uri().required()
});


export const validateRegister = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(422).json({
            message: error.details[0].message
        });
    }
    next();
};