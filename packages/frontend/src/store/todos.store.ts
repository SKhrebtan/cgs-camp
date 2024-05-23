import { create } from 'zustand';
import { Todo } from '~/types/todo.type';
import {
	getAllTodos,
	getTodoById,
	addTodo,
	updateTodo,
	deleteTodo,
} from '../shared/services/todos/api.js';

interface TodoStore {
	todos: Todo[];
	todo: Todo;
	fetchTodos: () => Promise<void>;
	fetchTodoById: (id: number) => Promise<void>;
	addNewTodo: (todo: Todo) => Promise<void>;
	updateTodoById: (id: number, todo: Todo) => Promise<void>;
	deleteTodo: (id: number) => Promise<void>;
}

export const useTodoStore = create<TodoStore>((set) => {
	return {
		todos: [],
		todo: null,
		fetchTodos: async (): Promise<void> => {
			try {
				const { data } = await getAllTodos();
				set({ todos: data });
			} catch (error) {
				console.error('Failed to fetch todos', error);
			}
		},
		fetchTodoById: async (id: number): Promise<void> => {
			try {
				const { data } = await getTodoById(id);
				set({ todo: data });
			} catch (error) {
				console.error(`Failed to fetch todo with id ${id}`, error);
			}
		},
		addNewTodo: async (todo: Todo): Promise<void> => {
			try {
				const { data } = await addTodo(todo);
				set((state) => ({ todos: [...state.todos, data] }));
			} catch (error) {
				console.error('Failed to add todo', error);
			}
		},
		updateTodoById: async (id: number, todo: Todo): Promise<void> => {
			try {
				const { data } = await updateTodo(id, todo);

				set((state) => ({
					todos: state.todos.map((t) =>
						t.id === data.id ? data : t,
					),
				}));
			} catch (error) {
				console.error('Failed to update todo', error);
			}
		},
		deleteTodo: async (id: number): Promise<void> => {
			try {
				const { data } = await deleteTodo(id);
				set((state) => ({
					todos: state.todos.filter((todo) => todo.id !== data.id),
				}));
			} catch (error) {
				console.error(`Failed to delete todo with id ${id}`, error);
			}
		},
	};
});
