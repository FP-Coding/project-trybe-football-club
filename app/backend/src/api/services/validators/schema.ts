import * as Joi from 'joi';

const id = Joi.number().integer().required();
const scoreSchema = Joi.number().integer().required();

const idSchema = id.label('Id');

const scoreTeamHome = scoreSchema.label('homeTeamGoals');
const scoreAwayHome = scoreSchema.label('awayTeamGoals');

export const loginSchema = Joi.object({
  email: Joi.string().email().min(1).required()
    .label('email'),
  password: Joi.string().min(6).required().label('password'),
});

export const matchScoreSchema = Joi.object({
  homeTeamGoals: scoreTeamHome,
  awayTeamGoals: scoreAwayHome,
});

export default idSchema;
