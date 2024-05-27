import { PrismaClient } from '@prisma/client';
import { TodoType } from '@/types/todos.type';
import { UserType } from '@/types/users.type';
import { HttpError } from '@/helpers/http-error';

export const prisma = new PrismaClient();

export default class TodoService {
	async findAll(userId: number): Promise<TodoType[]> {
		const todos = await prisma.todo.findMany({
			where: { authorId: userId },
		});
		return todos;
	}

	async getOneById(id: number): Promise<TodoType> {
		const res = await prisma.todo.findUnique({ where: { id } });
		if (!res) {
			throw new Error(`Todo with id ${id} not found`);
		}
		return res;
	}

	async createTodo(body: TodoType, user: UserType): Promise<TodoType> {
		const { title, description } = body;
		const { id } = user;
		if (id === undefined) {
			throw HttpError(404, 'authorId is required');
		}
		const newTodo = {
			data: {
				title,
				description,
				authorId: id,
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
