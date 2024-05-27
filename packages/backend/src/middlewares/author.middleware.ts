import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { HttpError } from '@/helpers/http-error';

export const prisma = new PrismaClient();

const { SECRET_KEY } = process.env;
if (!SECRET_KEY) {
	throw new Error('SECRET_KEY is not defined');
}

export const isAuthor = async (
	req: Request,
	_res: Response,
	next: NextFunction,
): Promise<void> => {
	const { id } = req.params;
	const { user } = req;
	try {
		const res = await prisma.todo.findFirst({
			where: {
				id: Number(id),
				authorId: user.id,
			},
		});
		if (!res) {
			next(
				HttpError(
					404,
					`Todo with id ${id} not found or does not belong to the user`,
				),
			);
		}
		next();
	} catch (error) {
		next(HttpError(401));
	}
};
