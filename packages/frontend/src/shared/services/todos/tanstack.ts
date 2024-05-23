import {
	useQuery,
	useMutation,
	useQueryClient,
	UseQueryResult,
	UseMutationResult,
} from '@tanstack/react-query';
import {
	getAllTodos,
	getTodoById,
	updateTodo,
	addTodo,
	deleteTodo,
} from './api';
import { Todo } from '~/types/todo.type';

function useGetAllTodos(): UseQueryResult<Todo[], Error> {
	return useQuery<Todo[]>({
		queryKey: ['todos'],
		queryFn: getAllTodos,
	});
}

function useGetTodoById(id: string): UseQueryResult<Todo, Error> {
	return useQuery<Todo>({
		queryKey: ['todo', id],
		queryFn: () => getTodoById(id),
	});
}

function useAddNewTodo(): UseMutationResult<Todo, Error, Partial<Todo>> {
	const queryClient = useQueryClient();
	return useMutation<Todo, Error, Partial<Todo>>({
		mutationFn: (body) => addTodo(body),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
	});
}

function useDeleteTodo(): UseMutationResult<void, Error, string> {
	const queryClient = useQueryClient();
	return useMutation<void, Error, string>({
		mutationFn: (id) => deleteTodo(id),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['todos'] });
		},
	});
}

function useUpdateTodo(): UseMutationResult<
	Todo,
	Error,
	{ id: string; body: Partial<Todo> }
> {
	const queryClient = useQueryClient();
	return useMutation<Todo, Error, { id: string; body: Partial<Todo> }>({
		mutationFn: (params) => updateTodo(params.id, params.body),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['todos'],
			});
			await queryClient.invalidateQueries({
				queryKey: ['todo'],
			});
		},
	});
}

export {
	useGetAllTodos,
	useGetTodoById,
	useUpdateTodo,
	useAddNewTodo,
	useDeleteTodo,
};
