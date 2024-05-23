import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CustomButton, CompleteSwitcher } from '~shared/components';
import { linkStyles } from '../todo-element/todo-element.styles';
import {
	tableStyles,
	actionColumnStyles,
	actionTHStyles,
} from './table-desktop.styles';
import { useDeleteTodo } from '../../services/todos/tanstack.js';
import { Todo } from '~/types/todo.type';

interface TableDesktopComponentProps {
	todos: Todo[];
}

export const TableDesktop: React.FC<TableDesktopComponentProps> = ({
	todos,
}): React.ReactNode => {
	const { mutate } = useDeleteTodo();
	const location = useLocation();
	return (
		<table className={tableStyles}>
			<thead>
				<tr>
					<th>Title</th>
					<th>Description</th>
					<th className={actionTHStyles}>Actions</th>
				</tr>
			</thead>
			<tbody>
				{todos.map(({ id, title, description, isCompleted }) => (
					<tr key={id}>
						<td>{title}</td>
						<td>{description}</td>
						<td className={actionColumnStyles}>
							<Link
								className={linkStyles}
								to={`/todos/${id}`}
								state={{ from: location }}
							>
								<CustomButton text="View" isViewButton={true} />
							</Link>

							<CustomButton
								text="Delete"
								onClick={() => mutate(id)}
							/>

							<CompleteSwitcher
								id={id}
								isCompleted={isCompleted}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
