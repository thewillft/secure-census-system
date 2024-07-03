import Joi from 'joi';

export default Joi.object({
    name: Joi.string().min(2).max(32),
    email: Joi.string().min(1).max(32),
    password: Joi.string().min(6).max(16)
})
