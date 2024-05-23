import React from 'react';
import { motion } from 'framer-motion';
import { buttonStyles, switcherStyles } from './complete-switcher.styles';
import { useUpdateTodo } from '../../services/todos/tanstack.js';

interface CompleteWitcherProps {
	isCompleted: boolean;
	id: number;
}

export const CompleteSwitcher: React.FC<CompleteWitcherProps> = ({
	id,
	isCompleted,
}) => {
	const { mutate } = useUpdateTodo();

	return (
		<button
			className={buttonStyles}
			type="button"
			onClick={() =>
				mutate({ id: String(id), body: { isCompleted: !isCompleted } })
			}
		>
			{isCompleted ? (
				<motion.div
					key="moon"
					initial={{ x: '0', opacity: 0 }}
					animate={{ x: '44px', opacity: 1 }}
					exit={{ x: '0', opacity: 0 }}
					transition={{ duration: 0.5 }}
					className={switcherStyles(Boolean(isCompleted))}
				></motion.div>
			) : (
				<motion.div
					key="sun"
					initial={{ x: '40px', opacity: 0 }}
					animate={{ x: '2px', opacity: 1 }}
					exit={{ x: '40px', opacity: 0 }}
					transition={{ duration: 0.5 }}
					className={switcherStyles(Boolean(isCompleted))}
				></motion.div>
			)}
		</button>
	);
};

// import { useTodoStore } from '~/store/todos.store';
// const updateTodoById = useTodoStore((state) => state.updateTodoById);
