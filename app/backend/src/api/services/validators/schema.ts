import * as Joi from 'joi';

const id = Joi.number().integer().required();

const idSchema = id.label('Id');

export default idSchema;
