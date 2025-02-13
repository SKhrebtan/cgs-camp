import { PrismaClient } from '@prisma/client';
import { TodoType, UserType, FilterType, StatusEnum } from '@/types';
import { HttpError } from '@/helpers/http-error';

export const prisma = new PrismaClient();

export default class TodoService {
	async findAll(userId: number, req: FilterType): Promise<TodoType[]> {
		const { search, status } = req;
		const todos = await prisma.todo.findMany({
			where: {
				authorId: userId,
				AND: [
					search
						? { title: { contains: search, mode: 'insensitive' } }
						: {},
					status === StatusEnum.Completed
						? { isCompleted: true }
						: {},
					status === StatusEnum.Private ? { isPrivate: true } : {},
					status === StatusEnum.Public ? { isPrivate: false } : {},
				],
			},
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
