import { HttpError } from '@/helpers/http-error';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { PrismaModels } from '@/types/models.enum';
import { prisma } from '@/services/todo.service';

export const isExist = (prismaModel: PrismaModels): RequestHandler => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			if (isNaN(Number(id))) {
				next(HttpError(400, `Invalid id format: ${id}`));
				return;
			}

			const item = await prisma[prismaModel].findFirst({
				where: { id: Number(id) },
			});

			if (!item) {
				next(HttpError(404, `Instance with id ${id} not found`));
				return;
			}
			next();
		} catch (error) {
			next(error);
		}
	};
};
