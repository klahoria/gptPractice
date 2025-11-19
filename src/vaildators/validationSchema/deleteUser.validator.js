import Joi from 'joi';
import { validateRequestParams } from '../validator.js';

const schema = Joi.object({
    userId: Joi.string().required()
})


let DeleteuserSchema = validateRequestParams(schema);

export default DeleteuserSchema;
