import Joi from 'joi';

export const userSchema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().required(),
});

export const verifySchema = Joi.object({
	email: Joi.string().required(),
});

export const resetSchema = Joi.object({
	token: Joi.string().required(),
	newPassword: Joi.string().required(),
});
