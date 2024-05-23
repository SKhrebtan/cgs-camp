import React, { ReactNode, useEffect } from 'react';
import { wrapperStyles, modalStyles, crossStyles } from './modal.styles';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ReactLogo from '~/assets/cross.svg?react';
type ModalProps = {
	children: ReactNode;
	closeModal: () => void;
	isOpen: boolean;
};
const modal = document.getElementById('modal');

export const Modal: React.FC<ModalProps> = ({
	children,
	closeModal,
	isOpen,
}) => {
	useEffect(() => {
		const handleEscClick = (e: KeyboardEvent): void => {
			if (e.code !== 'Escape') return;
			closeModal();
		};
		document.body.addEventListener('keydown', handleEscClick);

		return () =>
			document.body.removeEventListener('keydown', handleEscClick);
	});

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
		if (e.target !== e.currentTarget) return;
		closeModal();
	};

	return createPortal(
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={handleBackdropClick}
					className={wrapperStyles}
				>
					<motion.div
						initial={{ y: -50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -50, opacity: 0 }}
						className={modalStyles}
					>
						<ReactLogo
							onClick={closeModal}
							className={crossStyles}
						/>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>,
		modal,
	);
};
