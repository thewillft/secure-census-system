import Joi from 'joi';

const household = Joi.object({
    address: Joi.string(),
    size: Joi.number().min(1).max(20),
    type: Joi.string().valid('apartment', 'house'),
    owner: Joi.boolean(),
});

const demographic = Joi.object({
    age: Joi.number().min(0).max(100),
    gender: Joi.string().valid('male', 'female', 'other'),
    ethnicity: Joi.string().valid('white', 'black', 'hispanic', 'asian', 'native'),
    education: Joi.string().valid('ged', 'bachelors', 'masters', 'phd'),
    employment: Joi.string().valid('student', 'part-time', 'full-time')
});

export default Joi.object({
    household: household,
    demographic: demographic
})
