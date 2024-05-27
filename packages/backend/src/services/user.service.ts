import { PrismaClient } from '@prisma/client';
import { UserType } from '@/types/users.type';
import { HttpError } from '@/helpers/http-error';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail } from '@/helpers/mail-service';
import { nanoid } from 'nanoid';
import { AuthType } from '@/types/auth.type';

const { SECRET_KEY, BASE_URL } = process.env;

if (!SECRET_KEY) {
	throw new Error('SECRET_KEY is not defined');
}

export const prisma = new PrismaClient();

export default class UserService {
	async register({ email, password }: AuthType): Promise<UserType> {
		const user = await prisma.user.findFirst({ where: { email } });
		if (user) {
			throw HttpError(409, 'Email already exists');
		}
		const verificationToken = nanoid();
		const verifyEmail = {
			to: email,
			subject: 'Verify email',
			html: `<a target="_blank" href="${BASE_URL}/api/user/verify/${verificationToken}">Click to verify email</a>`,
		};

		await sendMail(verifyEmail);

		const hashPassword = await bcrypt.hash(password, 10);
		await prisma.user.create({
			data: { email, password: hashPassword, verificationToken },
		});
		return { email };
	}

	async login({ email, password }: AuthType): Promise<UserType> {
		const user = await prisma.user.findFirst({ where: { email } });
		if (!user) {
			throw HttpError(401, 'Email or password is wrong');
		}

		if (!user.verified) {
			throw HttpError(404, 'User not verified');
		}
		const passwordCompare = await bcrypt.compare(password, user.password);
		if (!passwordCompare) {
			throw HttpError(401, 'Email or password is wrong');
		}

		const payload = {
			id: user.id,
		};
		const token = jwt.sign(payload, SECRET_KEY as string, {
			expiresIn: '23h',
		});
		await prisma.user.update({ where: { id: user.id }, data: { token } });
		return {
			token,
			email,
		};
	}

	async verify(verificationToken: string): Promise<{ message: string }> {
		const user = await prisma.user.findFirst({
			where: { verificationToken },
		});
		if (!user) {
			throw HttpError(404, 'User not found');
		}

		await prisma.user.update({
			where: { id: user?.id },
			data: {
				verified: true,
				verificationToken: null,
			},
		});
		return {
			message: 'Verification successful',
		};
	}

	async resendVerify(email: string): Promise<{ message: string }> {
		const user = await prisma.user.findFirst({ where: { email } });

		if (!user) {
			throw HttpError(401, 'Email not found');
		}

		if (user && user.verified) {
			throw HttpError(400, 'Verification has already been passed');
		}

		const verifyEmail = {
			to: email,
			subject: 'Verify email',
			html: `<a target="_blank" href="${BASE_URL}/api/user/verify/${user?.verificationToken}">Click to verify email</a>`,
		};

		await sendMail(verifyEmail);
		return {
			message: 'Verification successful',
		};
	}

	async forgotPassword(email: string): Promise<{ message: string }> {
		const user = await prisma.user.findFirst({ where: { email } });

		if (!user) {
			throw HttpError(401, 'Email not found');
		}

		const token = jwt.sign({ email }, SECRET_KEY as string, {
			expiresIn: '1h',
		});
		const link = `${BASE_URL}/api/user/reset-password/${token}`;
		const verifyEmail = {
			to: email,
			subject: 'Reset password',
			html: `<a target="_blank" href="${link}">Click to reset password</a>`,
		};

		await sendMail(verifyEmail);
		return {
			message: 'Change password link sent successfully',
		};
	}

	async changePassword(
		token: string,
		newPassword: string,
	): Promise<{ message: string }> {
		const decoded = jwt.verify(token, SECRET_KEY as string);

		if (typeof decoded === 'string' || !('email' in decoded)) {
			throw HttpError(401, 'Invalid token');
		}

		const { email } = decoded;
		const user = await prisma.user.findFirst({ where: { email } });

		if (!user) {
			throw HttpError(401, 'Invalid token');
		}

		const hashPassword = await bcrypt.hash(newPassword, 10);
		await prisma.user.update({
			where: { email },
			data: { password: hashPassword },
		});

		return {
			message: 'Password reset successful',
		};
	}

	async current(body: UserType): Promise<{ email: string }> {
		const { email } = body;
		return {
			email,
		};
	}

	async logout(id: number): Promise<{ message: string }> {
		await prisma.user.update({ where: { id }, data: { token: '' } });

		return {
			message: 'Logout success',
		};
	}
}
