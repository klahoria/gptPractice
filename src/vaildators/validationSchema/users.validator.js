import Joi from 'joi';
import { validateRequestBody } from '../validator.js';

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

    repeat_password: Joi.ref('password'),

    // access_token: [
    //     Joi.string(),
    //     Joi.number().required()
    // ],

    dob: Joi.date()
        .max(new Date(Date.now() - 10 * 365 * 24 * 60 * 60 * 1000)) // 10 years ago
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
})


let RegisterUserData = validateRequestBody(schema);

export default RegisterUserData;
