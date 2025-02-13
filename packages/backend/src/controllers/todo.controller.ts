import { Response, Request } from 'express';
import TodoService from '@/services/todo.service';

export class TodoController {
	constructor(private todoService: TodoService) {}

	async getAllTodo(req: Request, res: Response): Promise<void> {
		const { id } = req.user;
		const { query } = req;
		const todos = await this.todoService.findAll(Number(id), query);
		res.send(todos);
	}

	async getTodoById(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const todos = await this.todoService.getOneById(Number(id));
		res.send(todos);
	}

	async createNewTodo(req: Request, res: Response): Promise<void> {
		const todo = await this.todoService.createTodo(req.body, req.user);
		res.send(todo);
	}

	async deleteTodo(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const todos = await this.todoService.deleteById(Number(id));
		res.send(todos);
	}

	async updateTodo(req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const todo = await this.todoService.updateById(Number(id), req.body);
		res.send(todo);
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
