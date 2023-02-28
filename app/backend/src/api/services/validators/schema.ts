import * as Joi from 'joi';

const id = Joi.number().integer().required();

const idSchema = id.label('Id');

export const loginSchema = Joi.object({
  email: Joi.string().email().min(1).required()
    .label('email'),
  password: Joi.string().min(6).required().label('password'),
});

export default idSchema;
