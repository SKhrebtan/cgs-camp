import { HttpError } from '@/helpers/http-error';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { prisma } from '@/services/todo.service';
import { PrismaModels } from '@/types/models.enum';
export const isExist = (modelName: PrismaModels): RequestHandler => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			if (isNaN(Number(id))) {
				next(HttpError(400, `Invalid id format: ${id}`));
				return;
			}

			let model;

			switch (modelName) {
				case PrismaModels.TODO:
					model = await prisma.todo.findUnique({
						where: { id: Number(id) },
					});
					break;
				case PrismaModels.USER:
					model = await prisma.user.findUnique({
						where: { id: Number(id) },
					});
					break;
				default:
					return res
						.status(500)
						.json({ error: 'Invalid model name' });
			}

			if (!model) {
				next(HttpError(404, `Todo with id ${id} not found`));
				return;
			}

			next();
		} catch (error) {
			next(error);
		}
	};
};
