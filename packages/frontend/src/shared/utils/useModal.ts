import { useState } from 'react';

type UseModalReturnType = {
	isOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
	toggleModal: () => void;
};

export const useModal = (): UseModalReturnType => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = (): void => {
		setIsOpen(true);
	};
	const closeModal = (): void => {
		setIsOpen(false);
	};
	const toggleModal = (): void => {
		setIsOpen(!isOpen);
	};
	return {
		isOpen,
		openModal,
		closeModal,
		toggleModal,
	};
};
