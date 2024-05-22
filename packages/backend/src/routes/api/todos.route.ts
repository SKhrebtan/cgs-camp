import { tryCatchWrapper, validateBody, isExist } from '@/middlewares';
import { Router } from 'express';
import todoController from '@/controllers/todo.controller';
import { todoSchema } from '@/schema/todo.schema';
import { PrismaModels } from '@/types/models.enum';

const todosRouter: Router = Router();

todosRouter.get(
	'/all',
	tryCatchWrapper(todoController.getAllTodo.bind(todoController)),
);

todosRouter.get(
	'/:id',
	isExist(PrismaModels.todo),
	tryCatchWrapper(todoController.getTodoById.bind(todoController)),
);

todosRouter.post(
	'/',
	validateBody(todoSchema),
	tryCatchWrapper(todoController.createNewTodo.bind(todoController)),
);

todosRouter.delete(
	'/:id',
	isExist(PrismaModels.todo),
	tryCatchWrapper(todoController.deleteTodo.bind(todoController)),
);

todosRouter.put(
	'/:id',
	isExist(PrismaModels.todo),
	validateBody(todoSchema),
	tryCatchWrapper(todoController.updateTodo.bind(todoController)),
);

export default todosRouter;
