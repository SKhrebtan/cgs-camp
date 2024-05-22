import { HttpError } from '@/helpers/http-error';
import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validateBody = (
	schema: ObjectSchema,
): ((req: Request, res: Response, next: NextFunction) => void) => {
	const func = (req: Request, res: Response, next: NextFunction): void => {
		const { error } = schema.validate(req.body);
		if (error) {
			next(HttpError(400, error.message));
		}
		next();
	};

	return func;
};
