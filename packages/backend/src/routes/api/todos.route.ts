import { tryCatchWrapper, validateBody, isExist } from '@/middlewares';
import { Router } from 'express';
import todoController from '@/controllers/todo.controller';
import { todoSchema } from '@/schema/todo.schema';

const todosRouter: Router = Router();

todosRouter.get(
	'/all',
	tryCatchWrapper(todoController.getAllTodo.bind(todoController)),
);

todosRouter.get(
	'/:id',
	isExist(),
	tryCatchWrapper(todoController.getTodoById.bind(todoController)),
);

todosRouter.post(
	'/',
	validateBody(todoSchema),
	tryCatchWrapper(todoController.createNewTodo.bind(todoController)),
);

todosRouter.delete(
	'/:id',
	isExist(),
	tryCatchWrapper(todoController.deleteTodo.bind(todoController)),
);

todosRouter.put(
	'/:id',
	isExist(),
	validateBody(todoSchema),
	tryCatchWrapper(todoController.updateTodo.bind(todoController)),
);

export default todosRouter;
