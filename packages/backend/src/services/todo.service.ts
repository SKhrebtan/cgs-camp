import { PrismaClient } from '@prisma/client';
import { TodoType } from '@/types/todos.type';

export const prisma = new PrismaClient();

export default class TodoService {
	async findAll(): Promise<TodoType[]> {
		const todos = await prisma.todo.findMany();
		return todos;
	}

	async getOneById(id: number): Promise<TodoType> {
		const res = await prisma.todo.findUnique({ where: { id } });
		if (!res) {
			throw new Error(`Todo with id ${id} not found`);
		}
		return res;
	}

	async createTodo(body: TodoType): Promise<TodoType> {
		const { title, description } = body;
		const newTodo = {
			data: {
				title,
				description,
			},
		};
		const res = await prisma.todo.create(newTodo);
		return res;
	}

	async deleteById(id: number): Promise<TodoType> {
		const res = await prisma.todo.delete({ where: { id } });
		return res;
	}

	async updateById(id: number, body: TodoType): Promise<TodoType> {
		const res = await prisma.todo.update({
			where: { id },
			data: body,
		});
		return res;
	}
}
