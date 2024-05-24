import { cwdFetch } from '../axios';
import { Todo } from '~/types/todo.type';

const BASE_TODOS_URL = process.env.BASE_TODOS_URL;

export const getAllTodos = async (): Promise<Todo[]> => {
	const { data } = await cwdFetch.get<Todo[]>(`/${BASE_TODOS_URL}/all`);
	return data;
};

export const getTodoById = async (id: string): Promise<Todo> => {
	const { data } = await cwdFetch.get<Todo>(`/${BASE_TODOS_URL}/${id}`);
	return data;
};

export const addTodo = async (body: Partial<Todo>): Promise<Todo> => {
	const { data } = await cwdFetch.post<Todo>(BASE_TODOS_URL, body);
	return data;
};

export const updateTodo = async (
	id: string,
	body: Partial<Todo>,
): Promise<Todo> => {
	const { data } = await cwdFetch.put<Todo>(`/${BASE_TODOS_URL}/${id}`, body);
	return data;
};

export const deleteTodo = async (id: string): Promise<void> => {
	const { data } = await cwdFetch.delete<void>(`/${BASE_TODOS_URL}/${id}`);
	return data;
};
