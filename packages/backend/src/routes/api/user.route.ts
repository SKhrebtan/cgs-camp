import { Router } from 'express';
import { tryCatchWrapper, validateBody, authenticate } from '@/middlewares';
import { userSchema, verifySchema } from '@/schema/user.scema';
import userController from '@/controllers/user.controller';
const router: Router = Router();

router.post(
	'/register',
	validateBody(userSchema),
	tryCatchWrapper(userController.register.bind(userController)),
);

router.post(
	'/login',
	validateBody(userSchema),
	tryCatchWrapper(userController.login.bind(userController)),
);

router.get(
	'/verify/:verificationToken',
	tryCatchWrapper(userController.verify.bind(userController)),
);

router.post(
	'/verify',
	validateBody(verifySchema),
	tryCatchWrapper(userController.resendVerification.bind(userController)),
);

router.post(
	'/change-password',
	validateBody(verifySchema),
	tryCatchWrapper(userController.changePassword.bind(userController)),
);

router.post(
	'/reset-password',
	validateBody(verifySchema),
	tryCatchWrapper(userController.resetPassword.bind(userController)),
);

router.get(
	'/current',
	authenticate,
	tryCatchWrapper(userController.current.bind(userController)),
);

router.post(
	'/logout',
	authenticate,
	tryCatchWrapper(userController.logout.bind(userController)),
);

export default router;
