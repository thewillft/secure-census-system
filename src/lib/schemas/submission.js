import Joi from 'joi';

const household = Joi.object({
    address: Joi.string(),
    size: Joi.number().min(1).max(20),
    type: Joi.string().valid('apartment', 'house', 'other'),
    owner: Joi.boolean(),
});

const demographic = Joi.object({
    age: Joi.number().min(0).max(100),
    gender: Joi.string().valid('male', 'female', 'other'),
    ethnicity: Joi.string().valid('white', 'black', 'hispanic', 'asian', 'other'),
    education: Joi.string().valid('none', 'high school', 'bachelors', 'masters', 'phd'),
    employment: Joi.string().valid('unemployed', 'student', 'employed')
});

export default Joi.object({
    household: household,
    demographic: demographic
})
