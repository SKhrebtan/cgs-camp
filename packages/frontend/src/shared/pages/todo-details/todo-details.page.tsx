import React, { useRef } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useGetTodoById } from '../../services/todos/tanstack.js';
import { useModal } from '~shared/utils';
import {
	wrapperStyles,
	btnWrapperStyles,
	titleStyles,
	descriptionBlockStyles,
	descriptionTitleStyles,
	descriptionTextStyles,
	statusBlockStyles,
	statusTextStyles,
} from './todo-details.styles.js';
import { Loader, Form, Modal, CompleteSwitcher } from '~shared/components';

const TodoDetailsPage: React.FC = () => {
	const { todoId } = useParams();
	const { data, isPending } = useGetTodoById(todoId);
	const { isOpen, openModal, closeModal } = useModal();
	const location = useLocation();
	const backLinkLocationRef = useRef(location.state?.from ?? '/todos');
	return isPending ? (
		<Loader />
	) : (
		data && (
			<div className={wrapperStyles}>
				<h2 className={titleStyles}>{data.title}</h2>
				<div className={descriptionBlockStyles}>
					<p className={descriptionTitleStyles}>Description:</p>
					<p className={descriptionTextStyles}>{data.description}</p>
				</div>
				<div className={statusBlockStyles}>
					<p className={statusTextStyles}>Completed:</p>
					<CompleteSwitcher
						id={todoId}
						isCompleted={data.isCompleted}
						status="completed"
					/>
				</div>
				<div className={statusBlockStyles}>
					<p className={statusTextStyles}>Private:</p>
					<CompleteSwitcher
						id={todoId}
						isPrivate={data.isPrivate}
						status="private"
					/>
				</div>
				<div className={btnWrapperStyles}>
					<Link
						role="button"
						className="bp5-button"
						to={backLinkLocationRef.current}
					>
						Back
					</Link>
					<button
						onClick={openModal}
						type="button"
						className="bp5-button bp5-intent-warning"
					>
						Edit
					</button>
				</div>
				<Modal isOpen={isOpen} closeModal={closeModal}>
					<Form
						type="edit"
						todo={data}
						closeModal={closeModal}
						id={todoId}
					/>
				</Modal>
			</div>
		)
	);
};

export default TodoDetailsPage;
