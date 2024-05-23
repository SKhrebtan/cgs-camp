import React from 'react';
import { Todo } from '~/types/todo.type';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
	liStyles,
	infoBlockStyles,
	buttonBlockStyles,
	linkStyles,
	textStyles,
} from './todo-element.styles';
import { useDeleteTodo } from '../../services/todos/tanstack.js';
import { CompleteSwitcher, CustomButton } from '~shared/components';

interface TodoElementProps {
	todo: Todo;
	details?: boolean;
}

export const TodoElement: React.FC<TodoElementProps> = ({ details, todo }) => {
	const { id, title, description, isCompleted } = todo;
	const navigate = useNavigate();
	const { mutate, isPending } = useDeleteTodo();
	const location = useLocation();

	return (
		<div className={liStyles}>
			<div className={infoBlockStyles}>
				<p className={textStyles}>{title}</p>
				<p className={textStyles}>{description}</p>
			</div>
			<div className={buttonBlockStyles}>
				{!details && (
					<Link
						className={linkStyles}
						to={`/todos/${id}`}
						state={{ from: location }}
					>
						<CustomButton text="View" isViewButton={true} />
					</Link>
				)}

				<CustomButton
					text={isPending ? 'Deleting...' : 'Delete'}
					onClick={() => {
						navigate('/todos');
						mutate(String(id));
					}}
				/>

				<CompleteSwitcher id={id} isCompleted={isCompleted} />
			</div>
		</div>
	);
};

// import { useTodoStore } from '~/store/todos.store';
// const deleteTodo = useTodoStore((state) => state.deleteTodo);
