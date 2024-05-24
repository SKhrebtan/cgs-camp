import {
	useQuery,
	useMutation,
	useQueryClient,
	UseQueryResult,
	UseMutationResult,
} from '@tanstack/react-query';
import { QUERY_KEYS } from '~/common/constants/queries';
import { Todo } from '~/types/todo.type';
import { todoService } from '../todo-service';

function useGetAllTodos(): UseQueryResult<Todo[], Error> {
	return useQuery<Todo[]>({
		queryKey: [`${QUERY_KEYS.TODOS}`],
		queryFn: todoService.getAllTodos.bind(todoService),
	});
}

function useGetTodoById(id: string): UseQueryResult<Todo, Error> {
	return useQuery<Todo>({
		queryKey: [`${QUERY_KEYS.TODO}`, id],
		queryFn: () => todoService.getTodoById(id),
	});
}

function useAddNewTodo(): UseMutationResult<Todo, Error, Partial<Todo>> {
	const queryClient = useQueryClient();
	return useMutation<Todo, Error, Partial<Todo>>({
		mutationFn: (body) => todoService.addTodo(body),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [`${QUERY_KEYS.TODOS}`],
			});
		},
	});
}

function useDeleteTodo(): UseMutationResult<Todo, Error, string> {
	const queryClient = useQueryClient();
	return useMutation<Todo, Error, string>({
		mutationFn: (id) => todoService.deleteTodo(id),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [`${QUERY_KEYS.TODOS}`],
			});
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
		mutationFn: (params) => todoService.updateTodo(params.id, params.body),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [`${QUERY_KEYS.TODOS}`],
			});
			await queryClient.invalidateQueries({
				queryKey: [`${QUERY_KEYS.TODO}`],
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
