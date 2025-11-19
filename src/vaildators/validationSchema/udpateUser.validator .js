import Joi from 'joi';
import { validateRequestBody, validateRequestParams } from '../validator.js';

const schema = Joi.object({
    userId: Joi.string().required()
})


let UpdateUserSchema = validateRequestParams(schema);



const schemaBody = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    dob: Joi.date()
        .max(new Date(Date.now() - 10 * 365 * 24 * 60 * 60 * 1000)) // 10 years ago
})


let UpdateUserSchemaBody = validateRequestBody(schemaBody);


export default { params: UpdateUserSchema, body: UpdateUserSchemaBody };
