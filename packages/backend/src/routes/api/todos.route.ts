import {
	tryCatchWrapper,
	validateBody,
	isExist,
	authenticate,
	isAuthor,
} from '@/middlewares';
import { Router } from 'express';
import todoController from '@/controllers/todo.controller';
import { todoSchema } from '@/schema/todo.schema';
import { PrismaModels } from '@/types/models.enum';

const todosRouter: Router = Router();

todosRouter.get(
	'/all',
	authenticate,
	tryCatchWrapper(todoController.getAllTodo.bind(todoController)),
);

todosRouter.get(
	'/:id',
	isExist(PrismaModels.todo),
	authenticate,
	isAuthor,
	tryCatchWrapper(todoController.getTodoById.bind(todoController)),
);

todosRouter.post(
	'/',
	validateBody(todoSchema),
	authenticate,
	tryCatchWrapper(todoController.createNewTodo.bind(todoController)),
);

todosRouter.delete(
	'/:id',
	isExist(PrismaModels.todo),
	authenticate,
	isAuthor,
	tryCatchWrapper(todoController.deleteTodo.bind(todoController)),
);

todosRouter.put(
	'/:id',
	isExist(PrismaModels.todo),
	authenticate,
	isAuthor,
	validateBody(todoSchema),
	tryCatchWrapper(todoController.updateTodo.bind(todoController)),
);

export default todosRouter;
