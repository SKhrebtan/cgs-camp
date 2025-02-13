import { Response, Request } from 'express';
import UserService from '@/services/user.service';

export class UserController {
	constructor(private userService: UserService) {}

	async register(req: Request, res: Response): Promise<void> {
		const newUser = await this.userService.register(req.body);
		res.send(newUser);
	}

	async login(req: Request, res: Response): Promise<void> {
		const user = await this.userService.login(req.body);
		res.send(user);
	}

	async verify(req: Request, res: Response): Promise<void> {
		const { verificationToken } = req.params;
		const message = await this.userService.verify(verificationToken);
		res.json(message);
	}

	async resendVerification(req: Request, res: Response): Promise<void> {
		const { email } = req.body;
		const user = await this.userService.resendVerify(email);
		res.send(user);
	}

	async forgotPassword(req: Request, res: Response): Promise<void> {
		const { email } = req.body;
		const user = await this.userService.forgotPassword(email);
		res.send(user);
	}

	async changePassword(req: Request, res: Response): Promise<void> {
		const user = await this.userService.changePassword(req.body);
		res.send(user);
	}

	async current(req: Request, res: Response): Promise<void> {
		const user = await this.userService.current(req.user);
		res.send(user);
	}
	async logout(req: Request, res: Response): Promise<void> {
		const { id } = req.user;
		const user = await this.userService.logout(id);
		res.send(user);
	}
}

const userController = new UserController(new UserService());
export default userController;
