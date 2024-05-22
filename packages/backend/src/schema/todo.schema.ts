import Joi from 'joi';

export const todoSchema = Joi.object({
	title: Joi.string(),
	description: Joi.string().allow(null, '').optional(),
	isCompleted: Joi.boolean().optional(),
});
