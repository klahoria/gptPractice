import Joi from 'joi'
import { validateRequestBody } from '../validator.js';

const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required()
});

const LoginUserSchema = validateRequestBody(schema);

export default LoginUserSchema;