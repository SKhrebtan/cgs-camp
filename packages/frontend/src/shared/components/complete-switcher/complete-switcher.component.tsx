import React from 'react';
import { motion } from 'framer-motion';
import { buttonStyles, switcherStyles } from './complete-switcher.styles';
import { useUpdateTodo } from '../../services/todos/tanstack.js';

interface CompleteWitcherProps {
	isCompleted?: boolean;
	isPrivate?: boolean;
	id: string;
	status?: 'completed' | 'private';
}

export const CompleteSwitcher: React.FC<CompleteWitcherProps> = ({
	id,
	isCompleted,
	isPrivate,
	status,
}) => {
	const { mutate } = useUpdateTodo();
	const handleUpdate = (id, isCompleted, isPrivate): void => {
		status === 'completed'
			? mutate({ id: String(id), body: { isCompleted: !isCompleted } })
			: mutate({ id: String(id), body: { isPrivate: !isPrivate } });
	};
	return (
		<button
			className={buttonStyles}
			type="button"
			onClick={() => handleUpdate(id, isCompleted, isPrivate)}
		>
			{(status === 'completed' ? isCompleted : isPrivate) ? (
				<motion.div
					key="moon"
					initial={{ x: '0', opacity: 0 }}
					animate={{ x: '44px', opacity: 1 }}
					exit={{ x: '0', opacity: 0 }}
					transition={{ duration: 0.5 }}
					className={switcherStyles(
						Boolean(
							status === 'completed' ? isCompleted : isPrivate,
						),
					)}
				></motion.div>
			) : (
				<motion.div
					key="sun"
					initial={{ x: '40px', opacity: 0 }}
					animate={{ x: '2px', opacity: 1 }}
					exit={{ x: '40px', opacity: 0 }}
					transition={{ duration: 0.5 }}
					className={switcherStyles(
						Boolean(
							status === 'completed' ? isCompleted : isPrivate,
						),
					)}
				></motion.div>
			)}
		</button>
	);
};
