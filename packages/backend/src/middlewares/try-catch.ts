import { Request, Response, NextFunction } from 'express';

export const tryCatchWrapper = (
	ctrl: (req: Request, res: Response, next: NextFunction) => Promise<void>,
): ((req: Request, res: Response, next: NextFunction) => Promise<void>) => {
	const wrapperFunc = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			await ctrl(req, res, next);
		} catch (error) {
			next(error);
		}
	};
	return wrapperFunc;
};
