import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { HttpError } from '@/helpers/http-error';

export const prisma = new PrismaClient();

const { SECRET_KEY } = process.env;
if (!SECRET_KEY) {
	throw new Error('SECRET_KEY is not defined');
}

export const authenticate = async (
	req: Request,
	_res: Response,
	next: NextFunction,
): Promise<void> => {
	const { authorization = '' } = req.headers;
	const [bearer, token] = authorization.split(' ');
	if (bearer !== 'Bearer' && !token) {
		next(HttpError(401, 'No token'));
	}

	try {
		const payload = jwt.verify(token, SECRET_KEY);
		const { id } = payload as JwtPayload & { id: number };
		const user = await prisma.user.findFirst({ where: { id } });
		console.log(user);
		if (!user || !user.token || user.token !== token) {
			next(HttpError(401, 'Not authorized'));
		}
		req.user = user;
		next();
	} catch (error) {
		next(HttpError(401));
	}
};
