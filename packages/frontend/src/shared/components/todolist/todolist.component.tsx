import React from 'react';
import { listStyles, wrapperStyles } from './todolist.styles';
import { useGetAllTodos } from '../../services/todos/tanstack.js';
import { useModal, useMediaObserver } from '~shared/utils';
import {
	Form,
	Loader,
	Modal,
	MySwiperComponent,
	TableDesktop,
	TodoElement,
} from '~shared/components';

export const TodoList: React.FC = () => {
	const mediaWatcher = useMediaObserver();
	const { data, isLoading, error } = useGetAllTodos();
	const { isOpen, openModal, closeModal } = useModal();

	return (
		<div className={wrapperStyles}>
			<button
				type="button"
				className="bp5-button bp5-intent-primary"
				onClick={openModal}
			>
				Add Task
			</button>
			{!mediaWatcher.isTabletScreen && !mediaWatcher.isDesktopScreen && (
				<ul className={listStyles}>
					{error && 'Something went wrong... Try Later'}
					{isLoading ? (
						<Loader />
					) : (
						data &&
						data.length > 0 &&
						data.map((todo) => (
							<li key={todo.id}>
								<TodoElement todo={todo} />
							</li>
						))
					)}
				</ul>
			)}
			<Modal isOpen={isOpen} closeModal={closeModal}>
				<Form closeModal={closeModal} />
			</Modal>
			{mediaWatcher.isTabletScreen && data && (
				<MySwiperComponent todos={data} />
			)}
			{mediaWatcher.isDesktopScreen && data && (
				<TableDesktop todos={data} />
			)}
		</div>
	);
};

export default TodoList;

// import { useTodoStore } from '~/store/todos.store';
// import { Todo } from '~/types/todo.type';
// const fetchTodos = useTodoStore((state) => state.fetchTodos);
// const todos: Todo[] = useTodoStore((state) => state.todos);
// const addNewTodo = useTodoStore((state) => state.addNewTodo);
// useEffect(() => {
// 	fetchTodos();
// }, [fetchTodos]);
