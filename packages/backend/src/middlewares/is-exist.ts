import { HttpError } from '@/helpers/http-error';
import { Request, Response, NextFunction } from 'express';
import { prisma } from '@/services/todo.service';

export const isExist = (): ((
	req: Request,
	res: Response,
	next: NextFunction,
) => Promise<void>) => {
	return async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;

			if (isNaN(Number(id))) {
				next(HttpError(400, `Invalid id format: ${id}`));
				return;
			}

			const isTodoExist = await prisma.todo.findUnique({
				where: { id: Number(id) },
			});
			if (!isTodoExist) {
				next(HttpError(404, `Todo with id ${id} not found`));
				return;
			}

			next();
		} catch (error) {
			next(error);
		}
	};
};
