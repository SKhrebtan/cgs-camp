import { HttpService } from './http-service';
import { Todo } from '~/types/todo.type';

class TodoService extends HttpService {
	constructor() {
		super();
	}

	async getAllTodos(): Promise<Todo[]> {
		const { data } = await this.get({ url: 'todos/all' });
		return data;
	}

	async getTodoById(id: string): Promise<Todo> {
		const { data } = await this.get({ url: `todos/${id}` });
		return data;
	}

	async addTodo(body: Partial<Todo>): Promise<Todo> {
		const { data } = await this.post({
			url: 'todos',
			data: body,
		});
		return data;
	}

	async updateTodo(id: string, body: Partial<Todo>): Promise<Todo> {
		const { data } = await this.put({
			url: `todos/${id}`,
			data: body,
		});
		return data;
	}

	async deleteTodo(id: string): Promise<Todo> {
		const { data } = await this.delete({ url: `todos/${id}` });
		return data;
	}
}

export const todoService = new TodoService();
