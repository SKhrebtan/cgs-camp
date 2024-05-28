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
	TodoFilter,
} from '~shared/components';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export const TodoList: React.FC = () => {
	const [searchParams] = useSearchParams();
	const params = {
		search: null,
		status: null,
	};
	const queryParams = useMemo(
		() => Object.fromEntries([...searchParams]),
		[searchParams],
	);

	const { status, search } = queryParams;

	if (search) {
		params.search = search;
	} else {
		delete params.search;
	}
	if (status && status !== 'all') {
		params.status = status.toLowerCase();
	} else {
		delete params.status;
	}

	const mediaWatcher = useMediaObserver();
	const { data, isLoading, error } = useGetAllTodos(params);
	const { isOpen, openModal, closeModal } = useModal();

	return (
		<div className={wrapperStyles}>
			<TodoFilter />
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
